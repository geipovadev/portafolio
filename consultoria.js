/**
 * Home de consultoría (geinerporras.com).
 *
 * El contenido va escrito en el HTML, no renderizado desde datos como en el
 * portafolio: esta página es solo español, así que no hay un segundo idioma
 * que justifique el diccionario. Aquí queda lo único que necesita JavaScript:
 * el cambio de tema y el menú móvil, con el mismo comportamiento y las mismas
 * llaves de localStorage que app.js para que las dos páginas se sientan iguales.
 */

(function () {
  const $ = (s) => document.querySelector(s);

  /* ---------- tema ---------- */

  const THEME_COLOR = { dark: "#0B0D0C", light: "#F4F4EE" };

  const themeStore = {
    get() { try { return localStorage.getItem("gpv-theme"); } catch { return null; } },
    set(v) { try { localStorage.setItem("gpv-theme", v); } catch { /* modo privado */ } }
  };

  /* El script en <head> ya puso data-theme antes del primer pintado: se lee de
     ahí en vez de recalcularlo, así los dos nunca pueden discrepar. */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
    const btn = $("#theme-toggle");
    if (btn) btn.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  $("#theme-toggle")?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    themeStore.set(next);
    applyTheme(next);
  });

  /* Mientras el visitante no elija tema, se sigue al sistema si cambia. */
  const osLight = window.matchMedia("(prefers-color-scheme: light)");
  const onOsChange = (e) => { if (!themeStore.get()) applyTheme(e.matches ? "light" : "dark"); };
  if (osLight.addEventListener) osLight.addEventListener("change", onOsChange);
  else if (osLight.addListener) osLight.addListener(onOsChange);

  applyTheme(currentTheme());

  /* ---------- menú móvil ---------- */

  (function wireMenu() {
    const header = document.querySelector(".site-header");
    const btn = $("#menu-toggle");
    const panel = $("#menu-panel");
    if (!header || !btn || !panel) return;

    const setOpen = (open) => {
      header.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };

    btn.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));

    /* Saltar a una sección no debería dejar el panel tapándola. */
    panel.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !header.classList.contains("is-open")) return;
      setOpen(false);
      btn.focus();
    });

    document.addEventListener("click", (e) => {
      if (header.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });

    /* Al pasar a la disposición de escritorio el panel se oculta con
       display:none. Sin esto, aria-expanded seguiría anunciando un panel al
       que nadie puede llegar. La consulta va a la par de la de styles.css. */
    const inlineNav = window.matchMedia("(min-width:1024px) and (pointer:fine)");
    const onLayoutChange = (e) => { if (e.matches) setOpen(false); };
    if (inlineNav.addEventListener) inlineNav.addEventListener("change", onLayoutChange);
    else if (inlineNav.addListener) inlineNav.addListener(onLayoutChange);
  })();
})();
