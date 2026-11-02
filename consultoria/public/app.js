/* Consultoría de IA — Geiner Porras
   Español primero. El inglés usa el mismo patrón data-i18n del portafolio. */

(() => {
  "use strict";

  /* Número de ejemplo. Solo dígitos, con código de país, sin +.
     Reemplazar antes de publicar. También está en los href de reserva
     del HTML; esta constante los pisa al cargar. */
  const WHATSAPP_NUMBER = "50600000000";

  /* Analítica apagada. Ver README.
     META_PIXEL_ID: id numérico del pixel de Meta. Vacío = no se carga.
     ANALYTICS_ID: vacío = no se carga. Si empieza con "G-" se carga GA4.
     Si parece un dominio (tiene un punto) se carga Plausible. */
  const META_PIXEL_ID = "";
  const ANALYTICS_ID = "";

  const COPY = {
    es: {
      docTitle: "Consultoría de IA para pymes y clínicas — Geiner Porras",
      docDesc: "Acompañamiento para pymes y clínicas de Costa Rica que todavía no implementaron IA: diagnóstico, plan e implementación. Consultoría de Geiner Porras.",
      skip: "Ir al contenido",
      navProblema: "Problema", navIncluye: "Incluye", navProceso: "Proceso",
      navQuien: "Para quién", navSobre: "Sobre mí", navFaq: "FAQ", navCta: "Diagnóstico",
      menuRoot: "consultoria/", menuOpen: "Abrir menú", menuClose: "Cerrar menú", menuNav: "Secciones",
      avail: "Consultoría de IA",
      heroTitle1: "La IA en tu negocio,", heroTitle2: "con guía",
      heroSub: "Acompaño a pymes y clínicas de Costa Rica que todavía no metieron la inteligencia artificial en sus procesos. Diagnosticamos qué automatizar, armamos un plan y lo implementamos juntos.",
      heroCta1: "Quiero el diagnóstico", heroCta2: "WhatsApp",
      heroStep1: "Diagnóstico", heroStep2: "Plan", heroStep3: "Implementación",
      hProblema: "El problema",
      quipProblema: "La mayoría no necesita otro chatbot. Necesita que alguien mire el proceso y diga por dónde empezar.",
      p1t: "El WhatsApp lo contesta quien pueda",
      p1b: "Citas, precios y seguimientos viven en el chat de una persona. Si esa persona se satura, el negocio deja de responder.",
      p2t: "ChatGPT suelto no es un proceso",
      p2b: "Copiar y pegar en un chat no queda conectado a la agenda, al equipo ni a la forma en que ya trabajan.",
      p3t: "Hay demasiadas herramientas",
      p3b: "Cada semana sale una. Elegir sin mirar el negocio termina en una suscripción que nadie abre.",
      p4t: "Lo que no se entiende, no se usa",
      p4b: "Si la solución se impone sin acompañar al equipo, a las dos semanas vuelve el proceso manual.",
      hIncluye: "Qué incluye",
      quipIncluye: "No es un curso ni un software enlatado. Es criterio sobre tu operación, y luego el trabajo de ponerlo a andar.",
      i1t: "Diagnóstico de procesos",
      i1b: "Una lectura de cómo trabaja el negocio hoy: qué sí conviene automatizar, qué no, y por dónde empezar.",
      i1m: "Llamada · mapa del proceso",
      i2t: "Plan de implementación",
      i2b: "Orden, herramientas que encajan con el equipo que ya tenés, y una lista explícita de lo que se deja quieto.",
      i2m: "Alcance · prioridades · fuera de alcance",
      i3t: "Implementación y acompañamiento",
      i3b: "Lo ponemos a andar con tu gente. Ajustes incluidos, y el criterio para sostenerlo cuando yo no esté en el chat.",
      i3m: "Hecho con el equipo · no un PDF",
      priceTag: "Marcador",
      priceNote: "No hay tarifa publicada. Reemplazá este marcador cuando el precio esté definido, o quitá el bloque.",
      hProceso: "Cómo trabajamos",
      quipProceso: "Tres pasos. El primero no obliga a contratar los otros dos.",
      s1t: "Llamada de diagnóstico",
      s1b: "Una conversación para entender el negocio, los procesos que siguen a mano y si esta consultoría tiene sentido. Si no encaja, te lo digo ahí.",
      s2t: "Plan",
      s2b: "Qué automatizar primero, qué no tocar, qué herramienta vale la pena y en qué orden. El alcance queda escrito antes de construir nada.",
      s3t: "Implementación y acompañamiento",
      s3b: "Lo implementamos con el equipo, capacitamos para el día a día y ajustamos. No te dejo con una demo y un acceso.",
      hQuien: "Para quién es",
      quipQuien: "Negocios de Costa Rica que todavía no metieron la IA en la operación, y quieren a alguien que los guíe.",
      w1t: "Clínicas y salud",
      w1b: "Consultorios, clínicas, laboratorios y negocios de salud que coordinan pacientes por WhatsApp, agenda y seguimiento a mano.",
      w2t: "Pymes de servicios",
      w2b: "Comercios, educación, oficios y servicios con procesos repetitivos y poco tiempo para probar herramientas por su cuenta.",
      w3t: "Quien decide",
      w3b: "Dueños o gerentes que quieren entender la decisión. No solo que alguien les ponga un bot y desaparezca.",
      quienNota: "Si ya tenés un equipo de ingeniería de IA adentro, el portafolio describe mejor ese tipo de trabajo que esta consultoría.",
      hMarcadores: "Prueba social",
      quipMarcadores: "Estos bloques están vacíos a propósito. No hay clientes, logos ni cifras inventadas. Reemplazalos con datos reales o borralos antes de publicar.",
      noteTestimonio: "Cita de un cliente real, con permiso. No inventar.",
      noteCliente: "Nombre del negocio, con permiso para publicarlo.",
      noteLogo: "Logo del cliente. No usar marcas ajenas sin autorización.",
      noteMetrica: "Un resultado medido de un acompañamiento. No estimados.",
      hSobre: "Sobre Geiner",
      aboutQ: "Quién guía",
      about1: "Geiner Porras Vargas es ingeniero de software e IA en Costa Rica. Fundó Abdismart, donde construyó Abdi CRM: un agente para consultorios y clínicas que atiende WhatsApp, Messenger e Instagram.",
      about2: "Antes trabajó 10 años en ventas y desarrollo de negocio, entre Costa Rica y México. Esta consultoría sale de esa mezcla: producto que llega a producción, y trato directo con quien opera el negocio. El detalle del trabajo está en el portafolio.",
      aboutEduLabel: "Formación",
      aboutEdu: "Ingeniería en Sistemas — Universidad Autónoma de Centroamérica (UACA). 95% de créditos aprobados, sin concluir.",
      aboutCta: "Ver portafolio",
      pillClinicas: "Clínicas", pillPymes: "Pymes",
      hFaq: "Preguntas frecuentes",
      q1: "¿Esto es un curso o una herramienta?",
      a1: "Ninguno de los dos. Es un acompañamiento: diagnóstico, plan e implementación sobre los procesos que ya tenés.",
      q2: "¿Tengo que saber de tecnología?",
      a2: "No. La llamada se habla en el idioma del negocio: citas, mensajes, seguimiento y tiempo del equipo.",
      q3: "¿Solo trabajás con clínicas?",
      a3: "Clínicas, consultorios y laboratorios son donde más construí producto. La consultoría también es para otras pymes de Costa Rica con procesos repetitivos.",
      q4: "¿Cuánto cuesta?",
      a4: "[PRECIO]. No hay tarifa publicada. En el diagnóstico se define el alcance antes de hablar de inversión. Reemplazá este marcador cuando el precio esté decidido.",
      q5: "¿En cuánto tiempo se ve algo?",
      a5: "Depende del proceso. El plan deja escrito qué se hace primero y qué queda fuera. No prometo un plazo genérico.",
      q6: "¿Qué pasa con los datos del formulario?",
      a6: "Los uso solo para responderte sobre la consultoría: nombre, empresa, rol, correo, WhatsApp, rubro y lo que querés automatizar. No se publican en el sitio.",
      q7: "¿La llamada obliga a seguir?",
      a7: "No. Si no encaja, te lo digo en esa conversación.",
      hRegistro: "Registro",
      registroHead: "Contame qué querés automatizar.",
      registroLead: "Te escribo para coordinar la llamada de diagnóstico. No es un contrato y no hay letra chica.",
      labelName: "Nombre", labelCompany: "Empresa", labelRole: "Rol",
      labelEmail: "Correo", labelWhatsapp: "WhatsApp", labelIndustry: "Rubro",
      labelMessage: "Qué querés automatizar",
      phName: "Tu nombre", phCompany: "Nombre del negocio",
      phRole: "Dueño, gerencia, coordinación…", phEmail: "vos@negocio.com",
      phWhatsapp: "+506 8888 8888",
      phMessage: "Por ejemplo: los recordatorios de citas y el seguimiento de quienes no confirman.",
      industryEmpty: "Elegí un rubro",
      indClinica: "Clínica / salud", indOdonto: "Odontología", indLab: "Laboratorio",
      indComercio: "Comercio", indServicios: "Servicios profesionales",
      indEdu: "Educación", indHosp: "Restaurante / hospitalidad", indOtro: "Otro",
      submit: "Enviar interés", submitting: "Enviando…",
      privacy: "Solo para responderte sobre la consultoría. No se publica y no se comparte como lista.",
      successTitle: "Listo.",
      successBody: "Recibí tu interés. Te escribo para coordinar el diagnóstico.",
      footerRights: "© 2026 Geiner Porras Vargas · Todos los derechos reservados",
      footerPortfolio: "Portafolio",
      themeToLight: "Cambiar a tema claro", themeToDark: "Cambiar a tema oscuro",
      waText: "Hola Geiner, quiero el diagnóstico de consultoría de IA para mi negocio.",
      waAria: "WhatsApp",
      errors: {
        name: "Escribí tu nombre.",
        company: "Escribí el nombre del negocio.",
        role: "Escribí tu rol.",
        email: "El correo no parece válido.",
        whatsapp: "El WhatsApp necesita entre 8 y 15 dígitos.",
        industry: "Elegí un rubro.",
        message: "Contame en un párrafo corto qué querés automatizar.",
        too_fast: "Esperá un segundo y volvé a enviar.",
        form: "Revisá el formulario e intentá de nuevo.",
        network: "No se pudo enviar. Probá de nuevo o escribinos por WhatsApp."
      }
    },
    en: {
      docTitle: "AI consulting for SMBs and clinics — Geiner Porras",
      docDesc: "Hands-on help for Costa Rican SMBs and clinics that have not put AI into their operations yet: diagnostic, plan and implementation.",
      skip: "Skip to content",
      navProblema: "Problem", navIncluye: "Includes", navProceso: "Process",
      navQuien: "Who it's for", navSobre: "About", navFaq: "FAQ", navCta: "Diagnostic",
      menuRoot: "consulting/", menuOpen: "Open menu", menuClose: "Close menu", menuNav: "Sections",
      avail: "AI consulting",
      heroTitle1: "AI in your business,", heroTitle2: "with a guide",
      heroSub: "I work with Costa Rican SMBs and clinics that have not put artificial intelligence into their operations yet. We decide what to automate, write a plan, and implement it together.",
      heroCta1: "I want the diagnostic", heroCta2: "WhatsApp",
      heroStep1: "Diagnostic", heroStep2: "Plan", heroStep3: "Implementation",
      hProblema: "The problem",
      quipProblema: "Most businesses do not need another chatbot. They need someone to look at the process and say where to start.",
      p1t: "Whoever is free answers WhatsApp",
      p1b: "Appointments, prices and follow-ups live in one person's chat. When that person is swamped, the business stops answering.",
      p2t: "A loose ChatGPT tab is not a process",
      p2b: "Copying and pasting into a chat never connects to the calendar, the team, or the way you already work.",
      p3t: "There are too many tools",
      p3b: "A new one ships every week. Picking without looking at the business ends in a subscription nobody opens.",
      p4t: "What people do not understand, they will not use",
      p4b: "If the solution is dropped in without walking the team through it, the manual process is back in two weeks.",
      hIncluye: "What's included",
      quipIncluye: "Not a course and not off-the-shelf software. Judgment about your operation, then the work of putting it in place.",
      i1t: "Process diagnostic",
      i1b: "A reading of how the business works today: what is worth automating, what is not, and where to start.",
      i1m: "Call · process map",
      i2t: "Implementation plan",
      i2b: "Sequence, tools that fit the team you already have, and an explicit list of what stays as it is.",
      i2m: "Scope · priorities · out of scope",
      i3t: "Implementation and accompaniment",
      i3b: "We put it to work with your people. Adjustments included, and the judgment to keep it going when I am not in the chat.",
      i3m: "Done with the team · not a PDF",
      priceTag: "Placeholder",
      priceNote: "No fee is published. Replace this marker when the price is set, or remove the block.",
      hProceso: "How it works",
      quipProceso: "Three steps. The first one does not commit you to the other two.",
      s1t: "Diagnostic call",
      s1b: "A conversation to understand the business, the processes that are still manual, and whether this consulting is a fit. If it is not, I will say so there.",
      s2t: "Plan",
      s2b: "What to automate first, what not to touch, which tool is worth it, and in what order. Scope is written down before anything is built.",
      s3t: "Implementation and accompaniment",
      s3b: "We implement it with the team, train for the day to day, and adjust. I do not leave you with a demo and a login.",
      hQuien: "Who it's for",
      quipQuien: "Costa Rican businesses that have not put AI into the operation yet, and want someone to guide them.",
      w1t: "Clinics and health",
      w1b: "Practices, clinics, labs and health businesses that still coordinate patients by WhatsApp, a calendar and manual follow-up.",
      w2t: "Service SMBs",
      w2b: "Shops, education, trades and services with repetitive processes and little time to try tools on their own.",
      w3t: "The person who decides",
      w3b: "Owners or managers who want to understand the decision. Not just have someone install a bot and disappear.",
      quienNota: "If you already have an in-house AI engineering team, the portfolio describes that kind of work better than this consulting does.",
      hMarcadores: "Social proof",
      quipMarcadores: "These blocks are empty on purpose. There are no invented clients, logos or figures. Replace them with real data or delete them before launch.",
      noteTestimonio: "A quote from a real client, with permission. Do not invent one.",
      noteCliente: "The business name, with permission to publish it.",
      noteLogo: "The client's logo. Do not use someone else's mark without authorization.",
      noteMetrica: "A measured result from an engagement. Not an estimate.",
      hSobre: "About Geiner",
      aboutQ: "Who guides",
      about1: "Geiner Porras Vargas is an AI and software engineer in Costa Rica. He founded Abdismart, where he built Abdi CRM: an agent for practices and clinics that handles WhatsApp, Messenger and Instagram.",
      about2: "Before that he spent 10 years in sales and business development, between Costa Rica and Mexico. This consulting comes from that mix: product that reaches production, and direct work with the person who runs the business. The work itself is on the portfolio.",
      aboutEduLabel: "Education",
      aboutEdu: "Systems Engineering — Universidad Autónoma de Centroamérica (UACA). 95% of credits completed, unfinished.",
      aboutCta: "View portfolio",
      pillClinicas: "Clinics", pillPymes: "SMBs",
      hFaq: "Frequently asked questions",
      q1: "Is this a course or a tool?",
      a1: "Neither. It is accompaniment: a diagnostic, a plan and implementation on the processes you already have.",
      q2: "Do I need to know technology?",
      a2: "No. The call is in the language of the business: appointments, messages, follow-up and the team's time.",
      q3: "Do you only work with clinics?",
      a3: "Clinics, practices and labs are where I have built the most product. The consulting is also for other Costa Rican SMBs with repetitive processes.",
      q4: "How much does it cost?",
      a4: "[PRECIO]. No fee is published. The diagnostic defines the scope before we talk about the investment. Replace this marker when the price is decided.",
      q5: "How soon is something visible?",
      a5: "It depends on the process. The plan states what happens first and what stays out. I do not promise a generic timeline.",
      q6: "What happens to the form data?",
      a6: "I use it only to reply about the consulting: name, company, role, email, WhatsApp, industry and what you want to automate. It is not published on the site.",
      q7: "Does the call commit me to continue?",
      a7: "No. If it is not a fit, I will say so in that conversation.",
      hRegistro: "Register",
      registroHead: "Tell me what you want to automate.",
      registroLead: "I will write to schedule the diagnostic call. It is not a contract and there is no fine print.",
      labelName: "Name", labelCompany: "Company", labelRole: "Role",
      labelEmail: "Email", labelWhatsapp: "WhatsApp", labelIndustry: "Industry",
      labelMessage: "What you want to automate",
      phName: "Your name", phCompany: "Business name",
      phRole: "Owner, management, coordination…", phEmail: "you@business.com",
      phWhatsapp: "+506 8888 8888",
      phMessage: "For example: appointment reminders and follow-up for people who do not confirm.",
      industryEmpty: "Choose an industry",
      indClinica: "Clinic / health", indOdonto: "Dentistry", indLab: "Laboratory",
      indComercio: "Retail", indServicios: "Professional services",
      indEdu: "Education", indHosp: "Restaurant / hospitality", indOtro: "Other",
      submit: "Send interest", submitting: "Sending…",
      privacy: "Used only to reply about the consulting. It is not published and it is not shared as a list.",
      successTitle: "Done.",
      successBody: "I have your interest. I will write to schedule the diagnostic.",
      footerRights: "© 2026 Geiner Porras Vargas · All rights reserved",
      footerPortfolio: "Portfolio",
      themeToLight: "Switch to light theme", themeToDark: "Switch to dark theme",
      waText: "Hi Geiner, I want the AI consulting diagnostic for my business.",
      waAria: "WhatsApp",
      errors: {
        name: "Enter your name.",
        company: "Enter the business name.",
        role: "Enter your role.",
        email: "That email does not look valid.",
        whatsapp: "WhatsApp needs between 8 and 15 digits.",
        industry: "Choose an industry.",
        message: "Describe, briefly, what you want to automate.",
        too_fast: "Wait a second and submit again.",
        form: "Check the form and try again.",
        network: "Could not send. Try again or write on WhatsApp."
      }
    }
  };

  const $ = (sel) => document.querySelector(sel);
  const THEME_COLOR = { dark: "#0B0D0C", light: "#F4F4EE" };
  const ANIMATE = "IntersectionObserver" in window
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } }
  };

  const savedLang = store.get("gpv-lang");
  const browserPrefersEn = (navigator.language || "es").toLowerCase().startsWith("en");
  let lang = savedLang === "es" || savedLang === "en" ? savedLang : (browserPrefersEn ? "en" : "es");

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function formatWa(digits) {
    if (digits.startsWith("506") && digits.length === 11) {
      const rest = digits.slice(3);
      return "+506 " + rest.slice(0, 4) + "-" + rest.slice(4);
    }
    return "+" + digits;
  }

  function applyWhatsApp() {
    const t = COPY[lang];
    const href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(t.waText);
    const label = formatWa(WHATSAPP_NUMBER);
    document.querySelectorAll(".js-wa").forEach((a) => {
      a.href = href;
      a.setAttribute("aria-label", t.waAria + " " + label);
    });
    document.querySelectorAll(".js-wa-text").forEach((el) => { el.textContent = label; });
  }

  function labelThemeButton() {
    const btn = $("#theme-toggle");
    if (!btn) return;
    btn.setAttribute("aria-label", currentTheme() === "dark" ? COPY[lang].themeToLight : COPY[lang].themeToDark);
  }

  function labelMenuButton() {
    const btn = $("#menu-toggle");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-label", open ? COPY[lang].menuClose : COPY[lang].menuOpen);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
    labelThemeButton();
  }

  function render() {
    const t = COPY[lang];
    document.documentElement.lang = lang;
    document.title = t.docTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.docDesc);

    const langBtn = $("#lang-toggle");
    if (langBtn) {
      langBtn.textContent = lang === "es" ? "EN" : "ES";
      langBtn.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    }
    labelThemeButton();
    labelMenuButton();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = t[el.dataset.i18n];
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const v = t[el.dataset.i18nAria];
      if (typeof v === "string") el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const v = t[el.dataset.i18nPlaceholder];
      if (typeof v === "string") el.setAttribute("placeholder", v);
    });

    const langInput = document.querySelector('input[name="lang"]');
    if (langInput) langInput.value = lang;
    const submit = document.querySelector("#lead-form button[type='submit']");
    if (submit && !submit.disabled) submit.textContent = t.submit;
    applyWhatsApp();
  }

  function wireMenu() {
    const header = document.querySelector(".site-header");
    const btn = $("#menu-toggle");
    const panel = $("#menu-panel");
    if (!header || !btn || !panel) return;

    const setOpen = (open) => {
      header.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      labelMenuButton();
    };

    btn.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));
    panel.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !header.classList.contains("is-open")) return;
      setOpen(false);
      btn.focus();
    });
    document.addEventListener("click", (e) => {
      if (header.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });

    const inlineNav = window.matchMedia("(min-width:1024px) and (pointer:fine)");
    const onLayoutChange = (e) => { if (e.matches) setOpen(false); };
    if (inlineNav.addEventListener) inlineNav.addEventListener("change", onLayoutChange);
    else if (inlineNav.addListener) inlineNav.addListener(onLayoutChange);
  }

  function clearFieldErrors(form) {
    form.querySelectorAll(".field.has-error").forEach((el) => el.classList.remove("has-error"));
    form.querySelectorAll(".field-error").forEach((el) => { el.hidden = true; el.textContent = ""; });
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    const alert = $("#form-alert");
    if (alert) { alert.hidden = true; alert.textContent = ""; }
  }

  function wireForm() {
    const form = $("#lead-form");
    if (!form) return;
    const started = form.querySelector('input[name="form_started"]');
    if (started && !started.value) started.value = String(Date.now());
    const alert = $("#form-alert");
    const success = $("#form-success");
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener("input", (e) => {
      const field = e.target.closest(".field");
      if (!field) return;
      field.classList.remove("has-error");
      const err = field.querySelector(".field-error");
      if (err) { err.hidden = true; err.textContent = ""; }
      e.target.removeAttribute("aria-invalid");
    });

    form.addEventListener("submit", async (e) => {
      if (!form.checkValidity()) return;
      e.preventDefault();
      const t = COPY[lang];
      clearFieldErrors(form);
      const data = Object.fromEntries(new FormData(form));
      button.disabled = true;
      button.textContent = t.submitting;
      try {
        const res = await fetch("/api/interes", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || !body.ok) {
          const errors = body.errors || {};
          let focused = false;
          Object.entries(errors).forEach(([field, code]) => {
            if (field === "form") return;
            const input = form.querySelector('[name="' + field + '"]');
            const box = input && input.closest(".field");
            const msg = t.errors[code] || t.errors.form;
            if (!box) return;
            box.classList.add("has-error");
            const p = box.querySelector(".field-error");
            if (p) { p.hidden = false; p.textContent = msg; input.setAttribute("aria-describedby", p.id); }
            input.setAttribute("aria-invalid", "true");
            if (!focused) { input.focus(); focused = true; }
          });
          if (alert) {
            alert.hidden = false;
            alert.textContent = (errors.form && t.errors[errors.form]) || body.error || t.errors.form;
          }
          return;
        }
        form.hidden = true;
        if (success) {
          success.hidden = false;
          success.setAttribute("tabindex", "-1");
          success.focus();
        }
      } catch {
        if (alert) { alert.hidden = false; alert.textContent = t.errors.network; }
      } finally {
        button.disabled = false;
        if (!form.hidden) button.textContent = COPY[lang].submit;
      }
    });
  }

  function observeReveal() {
    if (!ANIMATE) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("rise");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    document.querySelectorAll(".section, .hero").forEach((el) => io.observe(el));
  }

  function loadMetaPixel(id) {
    if (window.fbq) return;
    const n = window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    window.fbq("init", id);
    window.fbq("track", "PageView");
  }

  function loadAnalytics() {
    if (/^\d{5,20}$/.test(META_PIXEL_ID)) loadMetaPixel(META_PIXEL_ID);
    if (!ANALYTICS_ID) return;
    if (/^G-[A-Z0-9]+$/.test(ANALYTICS_ID)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ANALYTICS_ID);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", ANALYTICS_ID);
      return;
    }
    if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(ANALYTICS_ID)) {
      const s = document.createElement("script");
      s.defer = true;
      s.dataset.domain = ANALYTICS_ID;
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    }
  }

  render();
  wireMenu();
  wireForm();
  observeReveal();
  loadAnalytics();

  $("#lang-toggle")?.addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    store.set("gpv-lang", lang);
    render();
  });

  $("#theme-toggle")?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    store.set("gpv-theme", next);
    applyTheme(next);
  });

  const osLight = window.matchMedia("(prefers-color-scheme: light)");
  const onOsChange = (e) => {
    if (store.get("gpv-theme")) return;
    applyTheme(e.matches ? "light" : "dark");
  };
  if (osLight.addEventListener) osLight.addEventListener("change", onOsChange);
  else if (osLight.addListener) osLight.addListener(onOsChange);

  applyTheme(currentTheme());
})();
