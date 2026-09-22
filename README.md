# Portafolio — Geiner Porras Vargas

One-pager bilingüe (ES/EN) con tema claro/oscuro. HTML, CSS y JS a mano, sin
frameworks ni dependencias en tiempo de ejecución. Sí hay un paso de build:
`build.sh` arma `dist/` y le pone hash de contenido a las imágenes.

En producción: **https://portafolio.abdismart.com**

## Estructura

```
index.html    Estructura y textos estáticos (data-i18n)
styles.css    Tokens de diseño + layout (ink / acid lime)
app.js        Datos + render + idioma + tema + interacciones
build.sh      Arma dist/ y renombra las imágenes con hash
serve.py      Servidor de desarrollo (opcional)
assets/       Imágenes .webp que sí se publican
  _originales/  PNG sin comprimir. Ignorados por git y por el build.
```

Secciones: hero, 01 Servicios, 02 Proyectos, 03 Sobre mí, 04 Recorrido
profesional, 05 Certificaciones, 06 Stack, 07 Contacto.

## Correr en local

```bash
python3 -m http.server 4173
```

Luego abrir http://localhost:4173

Sirve la carpeta del proyecto, sin build. Las rutas de imagen salen sin hash y
todo funciona igual (ver «Hashing de imágenes»).

## Desplegar

```bash
./build.sh && npx wrangler deploy
```

Cloudflare Workers con assets estáticos, cuenta geiner.porras.mb@gmail.com.

`build.sh` arma `dist/` con lo único que debe ser público: `index.html`,
`styles.css`, `app.js`, `assets/*.webp` y `_headers`. El resto del repo
—`serve.py`, este README, `assets/_originales/`— se queda fuera.

`wrangler.jsonc` fija `assets.directory` a `./dist` y declara el dominio con
`custom_domain: true`, así que Cloudflare mantiene el registro DNS.

Ojo: si corrés `wrangler deploy` sin `build.sh` antes, se publica el `dist/`
anterior. El contenido nuevo no sale hasta reconstruirlo.

## Hashing de imágenes

`_headers` cachea `/assets/*` por un año con `immutable`. Con nombres fijos eso
significa que reemplazar una imagen no le llega a quien ya visitó el sitio.

Por eso `build.sh` renombra cada `.webp` a `nombre.<hash10>.webp`, con hash
SHA-256 del contenido:

- misma imagen → mismo nombre → la caché de un año se aprovecha
- imagen distinta → nombre distinto → el visitante la baja, sin purgar nada

`app.js` arma las rutas en runtime desde el slug del proyecto, así que no se
pueden reescribir por texto. El build inyecta el mapa como `window.__ASSETS` en
el `index.html` de `dist/`, y `app.js` lo consulta con el helper `asset()`. Sin
build no hay mapa y se usa la ruta sin hash, que es lo que hace que servir la
carpeta del proyecto directo siga funcionando.

Al reescribir el HTML el reemplazo va **en una sola pasada, claves más largas
primero**. En dos pasadas `assets/shot-abdi-ia` volvería a hacer match dentro de
`assets/shot-abdi-ia-crm.<hash>` recién escrito y rompería esa ruta.

## Imágenes

`app.js` busca estos archivos en `assets/`. Prueba `.webp`, `.png` y `.jpg` en
ese orden; si ninguno existe la tarjeta muestra un marco con etiqueta en vez de
romperse. **`build.sh` solo copia `assets/*.webp`**, así que un `.png` o `.jpg`
sirve para probar en local pero no llega al sitio publicado.

| Archivo | Dónde aparece |
| --- | --- |
| `about-portrait.webp` | Retrato circular en «Sobre mí» |
| `shot-abdi-ia.webp` | Proyecto 01 — Abdi IA |
| `shot-abdi-ia-crm.webp` | Proyecto 02 — Abdi IA CRM |
| `shot-abdismart.webp` | Proyecto 03 — Abdismart |
| `shot-abdismart-crm.webp` | Proyecto 04 — Abdismart CRM |
| `shot-badboysgym.webp` | Proyecto 05 — Badboysgym |
| `shot-badboysgym-crm.webp` | Proyecto 06 — Badboysgym CRM |
| `shot-elticofx.webp` | Proyecto 07 — ElticoFX |
| `shot-comunidad-ia.webp` | Proyecto 08 — Comunidad de IA |

Las capturas se recortan a 16:10 con `object-fit:cover`; el retrato, a círculo.
Van a ~1200px de ancho.

### Datos tapados

Las capturas 04 y 06 salen de paneles con datos reales y llevan **pixelado
destructivo** encima de información personal de terceros:

- **04** — nombres de leads en «Solicitudes recientes» y «Prioridades», y el
  usuario con sesión abierta en la barra lateral.
- **06** — nombre y WhatsApp del miembro en «Últimos registros».

No se revierte desde el `.webp` publicado. Si regenerás esas capturas, usá datos
de prueba o volvé a tapar esas zonas antes de reemplazar el archivo.

## Layout

Probado sin desbordamiento horizontal en 320, 375, 414, 640, 768, 834, 1024 y
escritorio.

**Navegación.** Los enlaces de sección viven dos veces en el DOM: en línea en la
barra para escritorio, y dentro del panel de la hamburguesa. Solo uno de los dos
se muestra. La condición es `(min-width:1024px) and (pointer:fine)`: el ancho
solo no alcanza porque una tablet en horizontal mide más de 1024px y debe seguir
con la hamburguesa. Un dedo no es un puntero `fine`. Si el navegador no reporta
`pointer`, cae en la hamburguesa, que es el lado seguro.

Abajo de 560px el nombre pasa a su propia fila arriba y los cuatro controles
—idioma, tema, contacto y hamburguesa— se reparten en la barra de abajo.

**Proyectos** es una baraja: cada tarjeta se fija con `position:sticky` bajo el
header y la siguiente sube por encima, cada una 10px más abajo que la anterior
(6px en móvil) para que asome el borde de las de atrás. Cuando la sección se
agota, toda la baraja se suelta junta.

- El pin se calcula contra `--header-h`, que `app.js` mide sobre `.header-inner`
  —la barra, no el header completo— para que abrir el menú no corra la baraja.
- Desde 860px la tarjeta gira de lado (imagen al 44%, texto a la derecha). A
  ancho completo una imagen 16:10 haría la tarjeta más alta que la pantalla.
- `body` tiene `overflow-x:hidden`, que en otros motores rompe `position:sticky`
  al convertir al body en contenedor de scroll. Acá funciona. Si algún navegador
  falla, el arreglo es `overflow-x:clip`, que no crea contenedor de scroll.

**Métricas y Servicios usan columnas explícitas**, no `auto-fit`. Sus separadores
salen del fondo del contenedor asomando por un `gap` de 1px (Servicios) y de
bordes por celda (Métricas), así que una última fila a medias dejaría un bloque
gris o una línea colgando.

**Certificaciones** usa `auto-fit` con `minmax(min(330px,100%),1fr)`; **Stack**,
`auto-fill` con `minmax(min(132px,100%),1fr)`. El `min()` está en ambos: sin él,
en un viewport de 320px la pista mínima es más ancha que el espacio disponible y
fuerza scroll horizontal.

**En pantallas táctiles** (`@media (pointer:coarse)`) los controles crecen a
~44px, sin alterar el diseño en escritorio.

No se usa `100vh` en ningún lado — en móvil la barra del navegador lo rompe.

## Movimiento

Todo lo que anima está detrás de `ANIMATE` en `app.js`, que exige
`IntersectionObserver` y que el visitante no haya pedido menos movimiento. Sin
eso la página se renderiza terminada, no vacía. Importa: los estados iniciales
son invisibles.

- Las secciones entran con un fade corto al cruzar el viewport.
- Las tarjetas del recorrido entran **en gris y al 92%** y crecen a tamaño con
  su color; las que entran juntas se escalonan 80ms.
- El riel del recorrido **se llena de lima según bajás**. La línea de lectura
  está al 62% del viewport. Se mide cada frame porque el alto cambia al abrir
  una tarjeta, y se escucha el evento `toggle` de los `<details>` para el caso
  de abrir sin hacer scroll.

Con movimiento reducido el riel queda **lleno**, no vacío.

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

Excepción: el relleno del riel del recorrido usa `--rail-lime`, declarado una
sola vez y **no** redefinido en el bloque claro, así que se mantiene lima en los
dos temas. El halo sí es tema-dependiente, para que la línea de 1px tenga
definición sobre el fondo crema.

## Editar contenido

Todo el contenido vive en `app.js`:

| Array | Qué es |
| --- | --- |
| `PROJECTS` | Proyectos: nombre, slug, URL, descripciones ES/EN, tags, `shot` |
| `CAREER` | Recorrido profesional. Copiado literal de los PDF del CV |
| `CERTS` | Certificaciones. `cat` es `web` o `ia`, y `sort` es `YYYYMM` |
| `STACK` | Herramientas (los iconos vienen de cdn.simpleicons.org por slug) |
| `COPY.es` / `COPY.en` | El resto de los textos, incluidas las métricas |

- `PROJECTS[].slug` arma la ruta de la captura: `assets/shot-<slug>.webp`. Con
  `shot: false` la tarjeta muestra el marco con etiqueta.
- `CERTS[].sort` ordena de más reciente a más antigua sin parsear las fechas
  localizadas. El orden importa: el año de inicio sale de la última entrada.
- `CAREER` sale del CV descargable desde el propio sitio. Si cambiás uno,
  cambiá el otro o la página y el PDF se contradicen.

Los atributos también se traducen: `data-i18n` para el texto y `data-i18n-aria`
para el `aria-label`.

Las métricas actuales (5 años, 9 proyectos IA, 3 CRMs, 5 landings) son de
trayectoria. Si tenés datos reales por proyecto (citas agendadas, no-shows,
leads), cambiarlos en `COPY.*.metrics` le da bastante más peso a la sección.

## CV

Los botones del hero apuntan a dos PDF en Google Drive, por ID de archivo:

```
16L6eMFtmSinKBaxtUGJf-tCv9sBUyqS2   español
1DO-4iboiO01V1nuiUWOLL755GgxBNdzD   inglés
```

Usan `uc?export=download&id=…`, que fuerza la descarga en vez de abrir el visor.
Los archivos tienen que estar en «Cualquier persona con el enlace».

Para reemplazar un CV, usá **«Gestionar versiones»** en Drive. Si subís un
archivo nuevo, Drive le da otro ID y los botones del sitio se rompen.
