/**
 * Worker de consultoria.geinerporras.com.
 *
 * Sirve los estáticos de ./public y atiende POST /api/interes.
 * No redirige otros hostnames: este Worker no comparte rutas con
 * geinerporras.com. `run_worker_first` solo cubre /api/* para que el resto
 * lo sirva la capa de assets.
 */

import { createLeadHandler } from "./lead-handler.js";

const handleLead = createLeadHandler();

export default {
  /**
   * @param {Request} request
   * @param {{ DB?: D1Database, ASSETS: { fetch: (request: Request) => Promise<Response> } }} env
   */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/interes") return handleLead(request, env);
    return env.ASSETS.fetch(request);
  },
};
