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

  /* ---------- animaciones del método ---------- */

  /* Cada diagrama arranca cuando su tarjeta entra en pantalla, y una sola vez:
     volver a subir no las reinicia. La clase .is-in es lo único que enciende
     las animaciones en styles.css, así que sin JavaScript —o sin
     IntersectionObserver— el SVG se queda dibujado en su estado final, que ya
     es el diagrama completo. */
  (function animarPasos() {
    const anims = document.querySelectorAll(".paso-anim");
    if (!anims.length) return;

    const cards = [...anims].map((a) => a.closest(".service")).filter(Boolean);

    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver((entries, obs) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        obs.unobserve(e.target);
      }
    }, { threshold: 0.3 });

    cards.forEach((c) => io.observe(c));
  })();

  /* ---------- píxel de Meta ---------- */

  /* El ID del píxel. Vacío = no se carga nada, que es lo que debe pasar en
     local y en cualquier copia del repo que no sea el sitio de Geiner. */
  const PIXEL_ID = "1191798346749858";

  /* Solo lo llevan las páginas que lo declaran con <body data-pixel>: la home
     y el diagnóstico. Privacidad y términos quedan fuera a propósito. Un
     píxel publicitario en la página que explica que no lo hay, o siguiendo a
     quien entra a pedir que le borren los datos, no se defiende, y esas
     visitas tampoco sirven para optimizar una campaña. */
  (function metaPixel() {
    if (!PIXEL_ID || !document.body.hasAttribute("data-pixel")) return;

    let started = false;

    /* El snippet oficial de Meta, con una sola diferencia: el <script> no se
       inserta al cargar la página sino cuando esto se llama. Son ~70 KB de
       terceros; metidos en el camino crítico se los come el primer pintado. */
    function start() {
      if (started) return;
      started = true;
      off();

      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      window.fbq("init", PIXEL_ID);
      window.fbq("track", "PageView");
    }

    /* fbq encola lo que le llegue antes de que el script baje, así que un
       evento disparado en el mismo clic que arranca el píxel no se pierde. */
    function track(name) {
      start();
      window.fbq("track", name);
    }

    const triggers = ["pointerdown", "keydown", "touchstart", "scroll"];
    const off = () => triggers.forEach((e) => window.removeEventListener(e, start));
    triggers.forEach((e) => window.addEventListener(e, start, { passive: true }));

    /* Quien no toca nada igual cuenta como visita: al terminar de cargar, en
       el primer hueco libre del navegador. Sin esto se perderían los rebotes,
       que son justo los que la campaña necesita medir. */
    const idle = () => (window.requestIdleCallback || ((f) => setTimeout(f, 1200)))(start);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });

    /* Este sitio no tiene formularios: la conversión es el clic que se lleva
       a la persona a WhatsApp o al correo. Se escucha en document para que
       siga funcionando si mañana se agrega otro CTA. */
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      if (a.dataset.agenda !== undefined) track("Lead");
      else if (a.href.startsWith("mailto:") || a.href.includes("wa.me/")) track("Contact");
    });
  })();

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
