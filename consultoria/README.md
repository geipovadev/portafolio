# Consultoría — consultoria.geinerporras.com

Landing de la consultoría de IA de Geiner Porras. Worker aparte del
portafolio: no comparte script, assets ni rutas con `geinerporras.com`.

Español primero. El botón EN usa el mismo patrón `data-i18n` del portafolio.
Colores, tipografía (Instrument Sans + IBM Plex Mono) y componentes salen de
los tokens de `styles.css` de la raíz.

## Correr en local

Desde esta carpeta, no desde la raíz del repo:

```bash
cd consultoria
npx wrangler dev --port 8788
```

Abrir http://127.0.0.1:8788

El formulario funciona sin secretos. Con la configuración de este archivo el
destino es el stub de logs: cada envío se imprime en la terminal de
`wrangler dev` como una línea JSON `consultoria.lead`. No se persiste.

Pruebas del handler, sin levantar el Worker:

```bash
node --test consultoria/src/*.test.js
```

(ese comando, desde la raíz del repo).

## Vista previa, sin DNS

`wrangler.preview.jsonc` es el mismo Worker con el nombre
`consultoria-geinerporras-preview`, `workers_dev: true`, y sin `routes` ni
`custom_domain`. Publica solo una URL `*.workers.dev`. No adjunta
`consultoria.geinerporras.com` y no escribe DNS de `geinerporras.com`.

```bash
cd consultoria
npx wrangler deploy -c wrangler.preview.jsonc
```

## Desplegar el dominio

No despliega el portafolio. Hay que correrlo acá, con el config de producción:

```bash
cd consultoria
npx wrangler deploy
```

Eso hace tres cosas:

1. Publica un Worker nuevo llamado `consultoria-geinerporras` en la cuenta de
   Cloudflare con la que esté autenticado Wrangler. No modifica el Worker
   `portafolio` que sirve geinerporras.com.
2. Publica también `consultoria-geinerporras.<subdominio>.workers.dev`
   (`workers_dev` está en true). Ese hostname es de Cloudflare, no un registro
   de la zona `geinerporras.com`.
3. Por `routes[].custom_domain: true`, adjunta el hostname
   `consultoria.geinerporras.com` a este Worker.

### Qué le hace el deploy al DNS

El archivo de configuración no toca DNS. El deploy sí, y solo en un hostname:

- Cloudflare crea o actualiza el registro DNS de
  `consultoria.geinerporras.com` en la zona `geinerporras.com` para que apunte
  a este Worker (registro proxied, el que usa un custom domain de Workers) y
  emite el certificado de ese hostname.
- No modifica `geinerporras.com`, `www.geinerporras.com` ni
  `portafolio.abdismart.com`. Esos siguen en el Worker `portafolio`.
- Si `consultoria.geinerporras.com` ya tiene un registro (CNAME, A, otro
  Worker), el attach puede fallar o reemplazar ese registro. Conviene mirar
  la zona antes de desplegar.
- La zona tiene que estar en la misma cuenta de Cloudflare. Hace falta permiso
  de Workers y de DNS. El certificado puede tardar unos minutos.

Este cambio de repo no despliega ni toca DNS por su cuenta.

## A dónde van los formularios

`POST /api/interes` valida, aplica un anti-spam básico y entrega el lead por
el adaptador de `src/lead-store.js`. Gana el primer destino que esté
configurado. No hay secretos en el repo.

### 1. Log (default, sin secretos)

Si no hay `DB`, ni CRM, ni webhook, el lead se escribe en los logs del Worker
(`wrangler dev` o `wrangler tail`). No queda guardado. Sirve para probar.
No lo dejes así si van a llegar personas de verdad: los logs se rotan y
contienen datos personales.

### 2. Cloudflare D1

El binding está declarado en `wrangler.jsonc`, comentado, para que el deploy
de arriba funcione sin crear una base. Para encenderlo:

```bash
cd consultoria
npx wrangler d1 create consultoria-leads
```

Copiá el `database_id` que imprime, descomentá el bloque `d1_databases` en
`wrangler.jsonc` y pegá el UUID. Después:

```bash
npx wrangler d1 execute consultoria-leads --remote --file=schema.sql
npx wrangler deploy
```

La tabla es `leads` (`schema.sql`). El Worker también corre
`CREATE TABLE IF NOT EXISTS` en el primer envío, por si la migración no se
aplicó. Los campos van como parámetros, no concatenados en el SQL.

En local, con el binding activo, Wrangler usa una D1 local. Sin el binding,
sigue el stub de logs.

### 3. Abdi IA CRM

No está cableado a una URL real. El adaptador hace `POST` JSON solo si
existen las dos variables. El cuerpo es el contrato de este sitio
(`source`, `name`, `company`, `role`, `email`, `phone`, `industry`, `notes`,
`lang`). Si el CRM espera otro formato, se cambia `storeAbdi` en
`src/lead-store.js`. El token no se commitea:

```bash
npx wrangler secret put ABDI_CRM_URL
npx wrangler secret put ABDI_CRM_TOKEN
```

D1 tiene prioridad. Para usar el CRM, el binding `DB` tiene que seguir
comentado.

### 4. Webhook de correo

Para Resend, un Worker de mail, u otro endpoint que reciba JSON. También
solo corre si no hay D1 ni CRM.

```bash
npx wrangler secret put LEAD_EMAIL_WEBHOOK
npx wrangler secret put LEAD_EMAIL_TOKEN   # opcional, se manda como Bearer
npx wrangler secret put LEAD_EMAIL_TO      # opcional, el webhook decide
```

El JSON es `{ to, subject, lead }`.

### Anti-spam

- Honeypot `fax_number`. Si viene con algo, se responde éxito y no se guarda.
- `form_started`: si el envío llega a menos de 1,5 s de haber pintado el
  formulario, se rechaza con un mensaje para que la persona reintente.
  Sin JavaScript el campo va vacío y ese filtro no aplica.
- Cuerpo máximo 20 KB.
- `Origin` y `Sec-Fetch-Site` tienen que ser el mismo host cuando el
  navegador los manda.
- 8 envíos por IP cada 10 minutos, en memoria del isolate. No es un límite
  global: otro isolate no lo ve. Alcanza para frenar un script ingenuo.

## Qué ya está definido, y qué falta

El diagnóstico es virtual, de 45 minutos, a ₡25.000 + IVA, con pago por tarjeta
vía OnvoPay. Esa frase está en «Qué incluye» y en la FAQ, en español y en
inglés. No hay link de pago: OnvoPay todavía no tiene uno.

El piloto de Abdi en 2 clínicas dentales muestra ~170 citas al mes, 93% de
confirmación y 78% de reagendamiento. En inglés: ~170 appointments per month,
93% confirmation, 78% rescheduling, fuente «Abdi pilot in 2 dental clinics».
Ese bloque es el producto Abdi, no un caso de consultoría.

El caso de consultoría es aparte: CR Trail Adventure, agencia de tours, con
problemas de servicio al cliente y de cierre de reservas. Geiner analizó
ventas y administración, aplicó el Método Abdi y dejó una landing de tours
más un CRM personalizado con agente 24/7 y un proceso de reserva. El dueño
reporta +10% de ventas en el primer mes. La cifra sale del reporte de Geiner,
no está verificada de forma independiente y no es una garantía.

WhatsApp: `wa.me/50660103635`, en pantalla `+506 6010 3635`. La constante es
`WHATSAPP_NUMBER` en `public/app.js`.

No hay cita textual, logo ni otros nombres de cliente. El comentario HTML en
la sección del piloto marca dónde irían.

Analítica, apagada:

- `META_PIXEL_ID` en `public/app.js`. Vacío = no se carga el pixel. Un id
  numérico carga el pixel de Meta (solo page view, no manda el formulario).
- `ANALYTICS_ID` en el mismo archivo. Vacío = nada. `G-…` carga GA4. Un
  dominio (`consultoria.geinerporras.com`) carga Plausible.

El correo `hporras199511@gmail.com` y el enlace al portafolio son los que ya
están publicados en geinerporras.com. El número de WhatsApp de esta landing
no copia el del portafolio: queda en el marcador de arriba hasta que lo
cambies.
