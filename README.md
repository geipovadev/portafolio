# Portafolio — Geiner Porras Vargas

One-pager bilingüe (ES/EN) implementado desde el proyecto de Claude Design
`Portafolio Geiner Porras.dc.html`. HTML/CSS/JS sin dependencias ni build step.

## Estructura

```
index.html    Estructura y textos estáticos (data-i18n)
styles.css    Tokens de diseño + layout (ink / acid lime)
app.js        Datos (proyectos, stack, copy ES/EN) + render + switch de idioma
assets/       Capturas de proyecto y retrato (.webp)
```

## Correr en local

```bash
python3 -m http.server 4173
```

Luego abrir http://localhost:4173

## Desplegar

En producción: **https://portafolio.abdismart.com**
(Cloudflare Workers con assets estáticos, cuenta geiner.porras.mb@gmail.com)

Para publicar cambios:

```bash
./build.sh && npx wrangler deploy
```

`build.sh` arma `dist/` con lo único que debe ser público: `index.html`,
`styles.css`, `app.js`, `assets/*.webp` y `_headers`. El resto del repo
—`serve.py`, este README, `assets/_originales/`— se queda fuera.

`wrangler.jsonc` fija `assets.directory` a `./dist` y declara el dominio
con `custom_domain: true`, así que Cloudflare mantiene el registro DNS.

Ojo: si corrés `wrangler deploy` sin `build.sh` antes, se publica el `dist/`
anterior. El contenido nuevo no sale hasta reconstruirlo.

## Imágenes

`app.js` busca estos archivos en `assets/`. Si alguno falta, la tarjeta
muestra un marco con etiqueta en vez de romperse.

| Archivo | Dónde aparece |
| --- | --- |
| `about-portrait.webp` | Retrato circular en «Sobre mí» |
| `shot-abdi-ia.webp` | Proyecto 01 — Abdi IA |
| `shot-abdi-ia-crm.webp` | Proyecto 02 — Abdi IA CRM |
| `shot-abdismart.webp` | Proyecto 03 — Abdismart |
| `shot-badboysgym.webp` | Proyecto 05 — Badboysgym |
| `shot-elticofx.webp` | Proyecto 07 — ElticoFX |
| `shot-comunidad-ia.webp` | Proyecto 08 — Comunidad de IA |

Abdismart CRM (04) y Badboysgym CRM (06) no tienen captura en el diseño
original; si querés agregarlas, poné `shot-abdismart-crm.webp` /
`shot-badboysgym-crm.webp` en `assets/` y cambiá `shot: false` a `true`
en el array `PROJECTS` de `app.js`.

## Responsive

Probado sin desbordamiento horizontal en 320, 375, 414, 640, 768, 834, 1024 y
escritorio. Nada de scroll lateral en ninguno.

| Ancho | Métricas | Servicios | Proyectos | Sobre mí |
| --- | --- | --- | --- | --- |
| ≥ 901px | 4 col | 3 col | 2–3 col | 2 col |
| 561–900px | 2 col | 2 col + 3ª ancha | 1–2 col | 1–2 col |
| ≤ 560px | 1 col | 1 col | 1 col | 1 col |

Detalles que importan:

- **Métricas y Servicios usan columnas explícitas**, no `auto-fit`. Sus separadores
  salen del fondo del contenedor asomando por un `gap` de 1px (Servicios) y de
  bordes por celda (Métricas), así que una última fila a medias dejaría un bloque
  gris o una línea colgando. Con 3 y 4 ítems las columnas se declaran a mano.
- **Proyectos y Stack** usan `minmax(min(320px,100%),1fr)`. Sin el `min()`, en un
  viewport de 320px la pista de 320px es más ancha que el espacio disponible y
  fuerza scroll horizontal.
- **En pantallas táctiles** (`@media (pointer:coarse)`) los botones del header
  crecen a ~42px y los enlaces de contacto ganan alto, sin alterar el diseño en
  escritorio.
- No se usa `100vh` en ningún lado — en móvil la barra del navegador lo rompe.

## Tema claro / oscuro

El botón sol/luna de la barra superior alterna el tema.

- En la primera visita sigue la preferencia del sistema (`prefers-color-scheme`)
- La elección se guarda en `localStorage` (`gpv-theme`)
- Mientras el visitante no elija, la página sigue los cambios del sistema en vivo
- Un script inline en el `<head>` fija el tema antes del primer pintado, así que
  no hay parpadeo al cargar

Los colores viven como tokens en `:root` (oscuro) y `:root[data-theme="light"]`
(claro) al inicio de `styles.css`. Para ajustar cualquiera de los dos temas se
tocan solo esos dos bloques.

El lima `#E6FF55` se mantiene idéntico en ambos temas cuando es **relleno**
(botones, pills). Cuando el acento es **texto** usa `--accent-text`, que en claro
pasa a oliva `#4F5D00` para conservar el contraste (6.5:1 sobre el fondo claro,
cumple WCAG AA).

## Editar contenido

Todo el contenido vive en `app.js`:

- `PROJECTS` — proyectos, tags, URLs, descripciones ES/EN
- `STACK` — herramientas (los iconos vienen de cdn.simpleicons.org por slug)
- `COPY.es` / `COPY.en` — el resto de los textos, incluidas las métricas

Las métricas actuales (5 años, 9 proyectos IA, 3 CRMs, 5 landings) son de
trayectoria. Si tenés datos reales por proyecto (citas agendadas, no-shows,
leads), cambiarlos en `COPY.*.metrics` le da bastante más peso a la sección.
