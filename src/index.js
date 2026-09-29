/**
 * El sitio vive en geinerporras.com. Este Worker solo se ocupa del hostname y
 * del esquema: los alias conocidos —www y el dominio viejo— se van con un 301
 * al canónico, y lo que llegue por http se manda a https. Ruta y query string
 * se conservan, y las dos correcciones ocurren en un mismo salto.
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
 * la redirección nunca ocurriría para "/".
 */

const CANONICAL_HOST = "geinerporras.com";

const REDIRECT_HOSTS = new Set([
  "www.geinerporras.com",
  "portafolio.abdismart.com",
]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const fixHost = REDIRECT_HOSTS.has(url.hostname);
    const fixTls = (request.headers.get("cf-visitor") || "").includes('"scheme":"http"');

    if (fixHost || fixTls) {
      if (fixHost) url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
