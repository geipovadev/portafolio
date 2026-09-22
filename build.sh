#!/usr/bin/env bash
# Arma dist/ con lo único que debe ser público.
set -euo pipefail
cd "$(dirname "$0")"

rm -rf dist
mkdir -p dist/assets
cp index.html styles.css app.js dist/
cp assets/*.webp dist/assets/

cat > dist/_headers <<'HEOF'
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate
HEOF

# Renombra cada imagen a  nombre.<hash>.webp  y reescribe las referencias.
# El hash es del contenido: si la imagen no cambia, el nombre tampoco, así que
# la caché de un año de /assets/* se mantiene. Si cambia, el nombre cambia y el
# visitante la vuelve a bajar sin tener que purgar nada.
python3 - <<'PY'
import hashlib, json, pathlib, re

dist = pathlib.Path("dist")
manifest = {}

for f in sorted((dist / "assets").glob("*.webp")):
    h = hashlib.sha256(f.read_bytes()).hexdigest()[:10]
    new = f.with_name(f"{f.stem}.{h}{f.suffix}")
    f.rename(new)
    # La clave es la ruta SIN extensión, porque app.js guarda esa base en
    # data-base y le va probando .webp/.png/.jpg.
    manifest[f"assets/{f.stem}"] = f"assets/{new.stem}"

if manifest:
    html = (dist / "index.html").read_text()

    # Una sola pasada con las claves más largas primero. Importa: en dos pasadas
    # "assets/shot-abdi-ia" volvería a hacer match dentro de
    # "assets/shot-abdi-ia-crm.<hash>" que acabamos de escribir.
    keys = sorted(manifest, key=len, reverse=True)
    html = re.compile("|".join(re.escape(k) for k in keys)).sub(
        lambda m: manifest[m.group(0)], html)

    # app.js arma las rutas en runtime desde el slug del proyecto, así que no
    # se puede reescribir por texto: lee este mapa.
    tag = '<script src="app.js"></script>'
    inject = ("<script>window.__ASSETS="
              + json.dumps(manifest, separators=(",", ":"), ensure_ascii=False)
              + ";</script>\n" + tag)
    if tag not in html:
        raise SystemExit("build.sh: no encontré el <script src=\"app.js\"> en index.html")
    html = html.replace(tag, inject, 1)

    (dist / "index.html").write_text(html)

print(f"  hash aplicado a {len(manifest)} imágenes")
PY

find dist -name '.DS_Store' -delete
echo "dist/ listo — $(find dist -type f | wc -l | tr -d ' ') archivos, $(du -sh dist | cut -f1)"
