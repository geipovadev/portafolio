/**
 * Un Worker, dos sitios, repartidos por hostname:
 *
 *   geinerporras.com             → index.html       (consultoría de IA)
 *   portafolio.geinerporras.com  → portafolio.html  (el portafolio técnico)
 *
 * Son dos públicos distintos —empresas que quieren contratar, y reclutadores o
 * equipos técnicos— y por eso viven en dominios separados. Comparten el mismo
 * `dist/`, así que no hacen falta dos Workers ni dos despliegues: lo único que
 * cambia es qué documento se sirve en la raíz de cada host.
 *
 * Los alias conocidos se van con un 301 al host que les corresponde, y lo que
 * llegue por http se manda a https. Ruta y query string se conservan, y las dos
 * correcciones ocurren en un mismo salto.
 *
 * La lista de alias es explícita a propósito. Con un «todo lo que no sea el
 * canónico redirige» se romperían `wrangler dev` y los previews de
 * workers.dev, que no son alias del sitio.
 *
 * El esquema se lee de cf-visitor, no de request.url: `wrangler dev` sirve por
 * http y además reescribe el hostname al de la primera ruta, así que mirar la
 * URL haría que el desarrollo local se redirigiera a sí mismo en bucle.
 * cf-visitor solo lo pone el borde de Cloudflare; si faltara, no se redirige
 * —falla hacia el lado seguro, sin romper nada.
 *
 * Esto necesita `assets.run_worker_first: true` en wrangler.jsonc: sin eso
 * Cloudflare serviría los archivos estáticos antes de ejecutar este código y
 * ni la redirección ni el reparto por hostname ocurrirían para "/".
 */

const CANONICAL_HOST = "geinerporras.com";
const PORTFOLIO_HOST = "portafolio.geinerporras.com";

/* De dónde a dónde: cada alias conocido apunta al host que de verdad le toca.
   portafolio.abdismart.com es el dominio viejo del portafolio, así que ahora
   va al subdominio y no al apex, que pasó a ser otra cosa. */
const ALIASES = new Map([
  ["www.geinerporras.com", CANONICAL_HOST],
  ["portafolio.abdismart.com", PORTFOLIO_HOST],
]);

/* El portafolio tiene una sola URL indexable. Si alguien pide su documento en
   el apex —un enlace viejo, o el archivo por su nombre— se le manda al
   subdominio en vez de servir la misma página en dos direcciones. */
const PORTFOLIO_PATHS = new Set(["/portafolio", "/portafolio.html"]);

/* Lo mismo al revés: las páginas de consultoría son del apex. Comparten dist/,
   así que sin esto también responderían en el subdominio. */
const CONSULTING_PATHS = new Map([
  ["/diagnostico", "/diagnostico"],
  ["/diagnostico.html", "/diagnostico"],
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* Solo el borde de Cloudflare pone cf-visitor. En `wrangler dev` no está, y
       ahí conviene servir los archivos tal cual: el hostname local es siempre
       el de la primera ruta, así que cualquier reparto por host daría falsos
       positivos y dejaría medio sitio sin poder probarse. */
    const cfVisitor = request.headers.get("cf-visitor");
    const atEdge = cfVisitor !== null;

    const alias = ALIASES.get(url.hostname);
    const fixTls = (cfVisitor || "").includes('"scheme":"http"');

    if (alias || fixTls) {
      if (alias) url.hostname = alias;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    if (!atEdge) return env.ASSETS.fetch(request);

    if (url.hostname === CANONICAL_HOST && PORTFOLIO_PATHS.has(url.pathname)) {
      return Response.redirect(`https://${PORTFOLIO_HOST}/`, 301);
    }

    if (url.hostname === PORTFOLIO_HOST) {
      /* Aquí el portafolio también vive en una sola URL: la raíz. */
      if (PORTFOLIO_PATHS.has(url.pathname)) {
        return Response.redirect(`https://${PORTFOLIO_HOST}/`, 301);
      }

      const apexPath = CONSULTING_PATHS.get(url.pathname);
      if (apexPath) {
        return Response.redirect(`https://${CANONICAL_HOST}${apexPath}`, 301);
      }

      /* La raíz del subdominio sirve el portafolio. Se reescribe en vez de
         redirigir para que la URL que ve el visitante siga siendo "/".
         Sin extensión a propósito: con `html_handling: auto-trailing-slash`
         —el que viene por defecto— pedir "/portafolio.html" devuelve un 307
         hacia "/portafolio", y ese salto sí lo vería el navegador. */
      if (url.pathname === "/" || url.pathname === "/index.html") {
        url.pathname = "/portafolio";
        return env.ASSETS.fetch(new Request(url, request));
      }
    }

    return env.ASSETS.fetch(request);
  },
};
