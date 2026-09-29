/* Geiner Porras Vargas — portfolio
   Bilingual (ES/EN) one-pager. Content mirrors the Claude Design source. */

(() => {
  "use strict";

  /* ---------- data ---------- */

  const PROJECTS = [
    { name: "Abdi IA", slug: "abdi-ia", url: "https://app.abdismart.com/", shot: true,
      descEs: "Sitio de producto del CRM. Next.js 16 con React 19 y Tailwind v4, renderizado estático y despliegue continuo en Vercel.",
      descEn: "Product site for the CRM. Next.js 16 with React 19 and Tailwind v4, statically rendered with continuous deployment on Vercel.",
      tags: ["Next.js 16", "React 19", "Tailwind v4", "Vercel"] },

    { name: "Abdi IA CRM", slug: "abdi-ia-crm", url: "", shot: true,
      descEs: "El producto principal: agente con function calling y 9 herramientas que agenda, reprograma, cancela y escala a humano por WhatsApp, Messenger e Instagram. Arquitectura multi-cliente con datos aislados por clínica y guardrails contra bucles agénticos.",
      descEn: "The core product: an agent with function calling and 9 tools that books, reschedules, cancels and hands off to a human over WhatsApp, Messenger and Instagram. Multi-tenant, with per-clinic data isolation and guardrails against agentic loops.",
      tags: ["Agentes IA", "WhatsApp API", "Supabase", "Prisma", "Cloudflare"] },

    { name: "Abdismart", slug: "abdismart", url: "https://abdismart.com/", shot: true,
      descEs: "Landing de la empresa. Next.js sobre Vercel, con la estructura de contenido y el SEO técnico resueltos a mano.",
      descEn: "Company landing page. Next.js on Vercel, with content structure and technical SEO handled by hand.",
      tags: ["Landing page", "Next.js", "Vercel"] },

    { name: "Abdismart CRM", slug: "abdismart-crm", url: "", shot: true,
      descEs: "Panel interno de operación: pipeline comercial, entregables por cliente y seguimiento del servicio, sobre Postgres con autenticación y políticas de acceso en Supabase.",
      descEn: "Internal operations panel: sales pipeline, per-client deliverables and service tracking, on Postgres with Supabase auth and access policies.",
      tags: ["CRM", "Supabase", "Postgres", "Auth"] },

    { name: "Badboysgym", slug: "badboysgym", url: "https://badboysgym.com/", shot: true,
      descEs: "Landing de un gimnasio: planes, horarios e información de contacto. Estática, servida desde Netlify con Cloudflare por delante.",
      descEn: "Gym landing page: plans, schedules and contact details. Static, served from Netlify behind Cloudflare.",
      tags: ["Landing page", "Netlify", "Cloudflare"] },

    { name: "Badboysgym CRM", slug: "badboysgym-crm", url: "", shot: true,
      descEs: "Panel administrativo con roles y permisos diferenciados para dueños y personal: gestión de planes, clientes y servicios sobre Supabase.",
      descEn: "Admin panel with separate roles and permissions for owners and staff: plans, clients and services on Supabase.",
      tags: ["CRM", "Roles y permisos", "Supabase"] },

    { name: "ElticoFX", slug: "elticofx", url: "https://elticofx.com/", shot: true,
      descEs: "Landing de captación para una comunidad de forex e inversión. Estructura de embudo, medición de conversión y despliegue en Vercel.",
      descEn: "Acquisition landing for a forex and investing community. Funnel structure, conversion tracking and deployment on Vercel.",
      tags: ["Landing page", "Conversión", "Vercel"] },

    { name: "Comunidad de IA", slug: "comunidad-ia", url: "https://comunidad.abdismart.com/", shot: true,
      descEs: "Espacio público con agentes, guías y repositorios para la comunidad. Contenido versionado en GitHub.",
      descEn: "Public space with agents, guides and repositories for the community. Content versioned on GitHub.",
      tags: ["Agentes IA", "Contenido", "GitHub"] }
  ];

  const TAG_EN = {
    "Agentes IA": "AI agents",
    "Roles y permisos": "Roles & permissions",
    "Conversión": "Conversion",
    "Contenido": "Content",
    "Landing page": "Landing page"
  };

  const STACK = [
    { name: "Claude",       slug: "claude",      roleEs: "Agentes · Código",    roleEn: "Agents · Code" },
    { name: "Codex",        slug: "",            roleEs: "Agentes · Código",    roleEn: "Agents · Code" },
    { name: "Next.js",      slug: "nextdotjs",   roleEs: "Frontend",            roleEn: "Frontend" },
    { name: "React",        slug: "react",       roleEs: "Frontend",            roleEn: "Frontend" },
    { name: "Supabase",     slug: "supabase",    roleEs: "Base de datos · Auth", roleEn: "Database · Auth" },
    { name: "Postgres",     slug: "postgresql",  roleEs: "Base de datos",       roleEn: "Database" },
    { name: "Prisma",       slug: "prisma",      roleEs: "ORM",                 roleEn: "ORM" },
    { name: "Vercel",       slug: "vercel",      roleEs: "Despliegue",          roleEn: "Deployment" },
    { name: "Cloudflare",   slug: "cloudflare",  roleEs: "Edge · Workers",      roleEn: "Edge · Workers" },
    { name: "Netlify",      slug: "netlify",     roleEs: "Despliegue",          roleEn: "Deployment" },
    { name: "WhatsApp API", slug: "whatsapp",    roleEs: "Mensajería",          roleEn: "Messaging" },
    { name: "Higgsfield",   slug: "",            roleEs: "Generación visual",   roleEn: "Visual generation" },
    { name: "GitHub",       slug: "github",      roleEs: "Versionado · CI",     roleEn: "Versioning · CI" },
    { name: "Tailwind",     slug: "tailwindcss", roleEs: "Estilos",             roleEn: "Styling" },
    { name: "WordPress",    slug: "wordpress",   roleEs: "CMS · Sitios",        roleEn: "CMS · Sites" },
    { name: "Elementor",    slug: "elementor",   roleEs: "Constructor web",     roleEn: "Web builder" }
  ];

  /* Career history, taken verbatim from the CV PDFs (ES/EN) that the download
     buttons in the hero point at, so the page and the CV never disagree. */
  const CAREER = [
    { company: "Abdismart (Abdi CRM)", current: true,
      roleEs: "Founder, CEO & Lead Tech", roleEn: "Founder, CEO & Lead Tech",
      periodEs: "Ago. 2025 — Actualidad", periodEn: "Aug 2025 — Present",
      placeEs: "Costa Rica · Remoto", placeEn: "Costa Rica · Remote",
      leadEs: "Fundé Abdismart, Meta Business Partner, para construir un CRM con agente de IA que automatiza la agenda de consultorios, laboratorios y redes de clínicas. Dueño del producto de punta a punta: arquitectura, backend, panel en React, integraciones con Meta y onboarding de clientes.",
      leadEn: "I founded Abdismart, a Meta Business Partner, to build an AI-agent CRM that automates scheduling for practices, laboratories and clinic networks. I own the product end to end: architecture, backend, React panel, Meta integrations and client onboarding.",
      pointsEs: [
        "Construí un agente conversacional con function calling de OpenAI y 9 herramientas —disponibilidad, registro de pacientes, agendamiento, reprogramación, cancelación, lista de espera y escalamiento a humano— que atiende el 100% de los mensajes entrantes por WhatsApp Business API, Messenger e Instagram.",
        "Lancé un piloto con 2 clínicas dentales que gestiona ~170 citas al mes: los recordatorios automáticos logran 93% de confirmación y la lista de espera, 78% de reagendamiento, con seguimiento en un panel de métricas dentro del CRM.",
        "Diseñé una arquitectura multi-cliente sobre Cloudflare Workers y Supabase con los datos aislados por clínica y un onboarding que configura el sistema según el tipo de cliente: profesional independiente o red de consultorios.",
        "Implementé controles de producción contra bucles agénticos: tope de 5 llamadas consecutivas al modelo sin respuesta final, límite de 30 mensajes por conversación, respuestas restringidas a los datos del consultorio y escalamiento a humano."
      ],
      pointsEn: [
        "Built a conversational agent with OpenAI function calling and 9 tools — availability, patient registration, booking, rescheduling, cancellation, waitlist and human handoff — that handles 100% of inbound messages over WhatsApp Business API, Messenger and Instagram.",
        "Launched a pilot with 2 dental clinics handling ~170 appointments a month: automated reminders reach 93% confirmation and the waitlist 78% rebooking, tracked in a metrics panel inside the CRM.",
        "Designed a multi-tenant architecture on Cloudflare Workers and Supabase with per-clinic data isolation and an onboarding flow that configures the system by client type: solo professional or clinic network.",
        "Shipped production guardrails against agentic loops: a cap of 5 consecutive model calls without a final answer, a 30-message limit per conversation, answers restricted to the practice's own data, and human handoff."
      ],
      stack: ["OpenAI", "Function calling", "Cloudflare Workers", "Supabase", "React", "TypeScript", "WhatsApp Business API", "Meta", "Claude Code", "Codex"] },

    { company: "Multibank Group", current: false,
      roleEs: "Business Development Manager (BDM)", roleEn: "Business Development Manager (BDM)",
      periodEs: "Dic. 2023 — Jul. 2025", periodEn: "Dec 2023 — Jul 2025",
      placeEs: "Monterrey, México · Presencial", placeEn: "Monterrey, Mexico · On-site",
      leadEs: "Gestioné una cartera de clientes de trading en un bróker de CFDs, desde la captación hasta la activación de cuentas.",
      leadEn: "Managed a trading client portfolio at a CFD broker, from acquisition through account activation.",
      pointsEs: ["Rediseñé con IA mi landing de captación como un embudo que resuelve objeciones y cierra con un bono de bienvenida: los leads calificados pasaron de 10 a 50 diarios en el primer mes."],
      pointsEn: ["Rebuilt my acquisition landing page with AI as a funnel that answers objections and closes with a welcome bonus: qualified leads went from 10 to 50 a day within the first month."],
      stack: ["WordPress", "Elementor", "n8n", "ChatGPT"] },

    { company: "Cosvic", current: false,
      roleEs: "Gerente de Ventas", roleEn: "Sales Manager",
      periodEs: "Mar. 2021 — Oct. 2023", periodEn: "Mar 2021 — Oct 2023",
      placeEs: "Costa Rica · Presencial", placeEn: "Costa Rica · On-site",
      leadEs: "Dirigí el área comercial de un instituto de cursos, con un equipo de 10 asesores en contratación constante.",
      leadEn: "Led the commercial team of a training institute: 10 sales advisors under continuous hiring.",
      pointsEs: [
        "Diseñé el proceso de ventas y el programa de capacitación del equipo, inexistentes hasta entonces: las ventas subieron 30% en dos trimestres frente al Q1 2021.",
        "Construí el sitio web y la presencia en redes sociales del instituto."
      ],
      pointsEn: [
        "Designed the sales process and the team's training program, neither of which existed before: sales rose 30% over two quarters against Q1 2021.",
        "Built the institute's website and social media presence."
      ],
      stack: ["WordPress", "Elementor"] },

    { company: "Almacén Mozel S.A. (Artelec)", current: false,
      roleEs: "Asesor de Ventas", roleEn: "Sales Advisor",
      periodEs: "2015 — 2021", periodEn: "2015 — 2021",
      placeEs: "Costa Rica · Presencial", placeEn: "Costa Rica · On-site",
      leadEs: "Venta de electrodomésticos y atención directa a cliente final.",
      leadEn: "Home appliance sales and direct customer service.",
      pointsEs: [], pointsEn: [], stack: [] }
  ];

  /* Certifications, newest first. `sort` is YYYYMM so the order does not
     depend on parsing the localised date strings. `issuer` is left empty where
     it is not on record rather than guessed; the line is skipped when blank. */
  const CERTS = [
    { cat: "ia", sort: 202609, issuer: "Anthropic",
      nameEs: "Claude Code in Action", nameEn: "Claude Code in Action",
      dateEs: "Sep 2026", dateEn: "Sep 2026", stack: [] },

    { cat: "ia", sort: 202609, issuer: "AWS",
      nameEs: "Essentials of Prompt Engineering", nameEn: "Essentials of Prompt Engineering",
      dateEs: "Sep 2026", dateEn: "Sep 2026", stack: [] },

    { cat: "ia", sort: 202608, issuer: "Big School",
      nameEs: "Curso de IA: de 0 a agentes", nameEn: "AI course: from zero to agents",
      dateEs: "Ago 2026", dateEn: "Aug 2026", stack: [] },

    { cat: "web", sort: 202209, issuer: "Udemy",
      nameEs: "Desarrollo de temas y plugins de WordPress",
      nameEn: "WordPress theme and plugin development",
      dateEs: "Sep 2022", dateEn: "Sep 2022", stack: ["WordPress"] },

    { cat: "web", sort: 202104, issuer: "Udemy",
      nameEs: "Desarrollo web completo", nameEn: "Complete web development",
      dateEs: "Abr 2021", dateEn: "Apr 2021", stack: [] },

    { cat: "web", sort: 201908, issuer: "Udemy",
      nameEs: "Tiendas virtuales con WordPress y WooCommerce",
      nameEn: "Online stores with WordPress and WooCommerce",
      dateEs: "Ago 2019", dateEn: "Aug 2019", stack: ["WordPress", "WooCommerce"] }
  ].sort((a, b) => b.sort - a.sort);

  /* One glyph per category, so a card is readable before its tag is. */
  const CERT_ICON = {
    web: '<path d="M8.6 8.2 4.4 12l4.2 3.8"></path><path d="M15.4 8.2 19.6 12l-4.2 3.8"></path><path d="M13.4 6.2 10.6 17.8"></path>',
    ia: '<path d="M12 3.6l1.7 4.5 4.5 1.7-4.5 1.7L12 16l-1.7-4.5L5.8 9.8l4.5-1.7L12 3.6Z"></path><path d="M17.8 15.2l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z"></path>'
  };

  /* Inline icons for the timeline meta rows. */
  const ICON = {
    company: '<path d="M4 20.5h16"></path><path d="M6 20.5V5.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15"></path><path d="M14 20.5V10h3a1 1 0 0 1 1 1v9.5"></path><path d="M8.5 8h3"></path><path d="M8.5 11.5h3"></path><path d="M8.5 15h3"></path>',
    period: '<rect x="3.75" y="5.25" width="16.5" height="15" rx="1.6"></rect><path d="M3.75 10h16.5"></path><path d="M8 3.5v3.5"></path><path d="M16 3.5v3.5"></path>',
    place: '<path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"></path><circle cx="12" cy="10.2" r="2.6"></circle>'
  };

  const COPY = {
    es: {
      skip: "Ir al contenido",
      nav1: "Capacidades", nav2: "Proyectos", nav3: "Sobre mí", nav4: "Recorrido", nav5: "Certificaciones", navCta: "Contacto",
      availLabel: "Abierto a oportunidades",
      heroTitle1: "Ingeniero de", heroTitle2: "Software e IA",
      heroSub: "Construyo agentes LLM que llegan a producción. Abdi CRM atiende el 100% de los mensajes entrantes de WhatsApp, Messenger e Instagram, y gestiona ~170 citas al mes con 93% de confirmación. Antes, 10 años en ventas y desarrollo de negocio.",
      heroCta1: "Ver proyectos", heroCta2: "Escríbeme",
      cvLabel: "Descargar CV",
      cvAriaEs: "Descargar CV en español", cvAriaEn: "Descargar CV en inglés",
      metrics: [
        { value: "170", label: "Citas gestionadas al mes" },
        { value: "93%", label: "Confirmación con recordatorios" },
        { value: "100%", label: "Mensajes atendidos por el agente" },
        { value: "09", label: "Herramientas del agente" }
      ],
      h2servicios: "Capacidades",
      services: [
        { num: "C1", title: "Agentes LLM en producción",
          body: "Agentes con function calling y herramientas propias que agendan, reprograman, cancelan y escalan a humano. Con guardrails contra bucles agénticos y respuestas restringidas a los datos del cliente.",
          meta: "OpenAI · Function calling · Guardrails" },
        { num: "C2", title: "Backend e infraestructura",
          body: "Arquitectura multi-cliente con los datos aislados por cliente, sobre cómputo en el edge y Postgres administrado. APIs REST y despliegue continuo.",
          meta: "Cloudflare Workers · Supabase · Vercel" },
        { num: "C3", title: "Integraciones conversacionales",
          body: "Canales de Meta conectados de punta a punta: WhatsApp Business API, Messenger e Instagram, con webhooks, reintentos y trazabilidad de cada conversación.",
          meta: "Meta · WhatsApp Business API · n8n" }
      ],
      h2proyectos: "Proyectos",
      projectsQuip: '<b>200 tazas de café</b>, unos millones de tokens y <b>esto fue lo que sobrevivió</b>.',
      visitLabel: "Visitar sitio",
      internal: "Interno",
      shotHint: (n) => "Captura de " + n,
      h2sobre: "Sobre mí",
      aboutQ: "¿Quién es",
      about1: "Ingeniero de Software e IA. Construyo el producto completo de punta a punta —arquitectura, backend, frontend y despliegue— y agentes LLM que llegan a producción, no solo a una demo.",
      about2: "Fundé Abdismart, donde construí Abdi CRM: un agente con function calling que atiende el 100% de los mensajes entrantes de WhatsApp, Messenger e Instagram y gestiona ~170 citas al mes con 93% de confirmación, sobre una arquitectura multi-cliente en Cloudflare Workers y Supabase. Antes pasé 10 años en ventas y desarrollo de negocio —trading, educación y retail, en Costa Rica y México—; esa mitad comercial es la que me hace diseñar pensando en la conversión y en el costo de cada mensaje, no solo en que el modelo responda. Busco un rol de AI Software Engineer en un equipo de producto.",
      aboutCta: "Hablemos",
      portraitHint: "Suelta tu foto aquí",
      skills: ["Agentes LLM", "Function calling", "Guardrails", "Cloudflare Workers", "Supabase", "React", "TypeScript", "WhatsApp Business API"],
      aboutEduLabel: "Formación",
      aboutEdu: "Ingeniería en Sistemas — Universidad Autónoma de Centroamérica (UACA). 95% de créditos aprobados, sin concluir.",
      h2career: "Recorrido profesional",
      careerStack: "Stack",
      h2certs: "Certificaciones",
      certAll: "Todas",
      certWeb: "Desarrollo web",
      certIa: "IA",
      certFilterLabel: "Filtrar certificaciones",
      certEmpty: "Nada en esta categoría.",
      h2stack: "Stack y herramientas",
      h2contacto: "Contacto",
      ctaHead: "¿Buscás a alguien que lleve agentes a producción?",
      tzLabel: "Zona horaria",
      footerRights: "© 2026 Geiner Porras Vargas · Todos los derechos reservados",
      footerNote: "Abierto a oportunidades como AI Engineer",
      themeToLight: "Cambiar a tema claro",
      themeToDark: "Cambiar a tema oscuro",
      menuOpen: "Abrir menú", menuClose: "Cerrar menú", menuNav: "Secciones",
      menuRoot: "proyecto/"
    },
    en: {
      skip: "Skip to content",
      nav1: "Capabilities", nav2: "Work", nav3: "About", nav4: "Journey", nav5: "Certifications", navCta: "Contact",
      availLabel: "Open to opportunities",
      heroTitle1: "AI & Software", heroTitle2: "Engineer",
      heroSub: "I build LLM agents that make it to production. Abdi CRM handles 100% of inbound messages on WhatsApp, Messenger and Instagram, and manages ~170 appointments a month at 93% confirmation. Before this, 10 years in sales and business development.",
      heroCta1: "View work", heroCta2: "Get in touch",
      cvLabel: "Download CV",
      cvAriaEs: "Download CV in Spanish", cvAriaEn: "Download CV in English",
      metrics: [
        { value: "170", label: "Appointments handled monthly" },
        { value: "93%", label: "Confirmation via reminders" },
        { value: "100%", label: "Inbound messages handled" },
        { value: "09", label: "Agent tools" }
      ],
      h2servicios: "Capabilities",
      services: [
        { num: "C1", title: "LLM agents in production",
          body: "Agents with function calling and purpose-built tools that book, reschedule, cancel and hand off to a human. With guardrails against agentic loops and answers restricted to the client's own data.",
          meta: "OpenAI · Function calling · Guardrails" },
        { num: "C2", title: "Backend & infrastructure",
          body: "Multi-tenant architecture with per-client data isolation, on edge compute and managed Postgres. REST APIs and continuous deployment.",
          meta: "Cloudflare Workers · Supabase · Vercel" },
        { num: "C3", title: "Conversational integrations",
          body: "Meta channels wired end to end: WhatsApp Business API, Messenger and Instagram, with webhooks, retries and a trace of every conversation.",
          meta: "Meta · WhatsApp Business API · n8n" }
      ],
      h2proyectos: "Selected work",
      projectsQuip: '<b>200 cups of coffee</b>, a few million tokens and <b>this is what survived</b>.',
      visitLabel: "Visit site",
      internal: "Internal",
      shotHint: (n) => n + " screenshot",
      h2sobre: "About",
      aboutQ: "Who is",
      about1: "AI & Software Engineer. I build the whole product end to end — architecture, backend, frontend and deployment — and LLM agents that make it to production, not just to a demo.",
      about2: "I founded Abdismart, where I built Abdi CRM: an agent with function calling that handles 100% of inbound messages on WhatsApp, Messenger and Instagram and manages ~170 appointments a month at 93% confirmation, on a multi-tenant architecture running on Cloudflare Workers and Supabase. Before that I spent 10 years in sales and business development — trading, education and retail, across Costa Rica and Mexico; that commercial half is why I design around conversion and the cost of each message, not just around getting the model to answer. I am looking for an AI Software Engineer role on a product team.",
      aboutCta: "Let's talk",
      portraitHint: "Drop your photo here",
      skills: ["LLM agents", "Function calling", "Guardrails", "Cloudflare Workers", "Supabase", "React", "TypeScript", "WhatsApp Business API"],
      aboutEduLabel: "Education",
      aboutEdu: "Systems Engineering — Universidad Autónoma de Centroamérica (UACA). 95% of credits completed, unfinished.",
      h2career: "Career journey",
      careerStack: "Stack",
      h2certs: "Certifications",
      certAll: "All",
      certWeb: "Web development",
      certIa: "AI",
      certFilterLabel: "Filter certifications",
      certEmpty: "Nothing in this category.",
      h2stack: "Stack & tools",
      h2contacto: "Contact",
      ctaHead: "Looking for someone to take agents to production?",
      tzLabel: "Time zone",
      footerRights: "© 2026 Geiner Porras Vargas · All rights reserved",
      footerNote: "Open to opportunities as an AI Engineer",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
      menuOpen: "Open menu", menuClose: "Close menu", menuNav: "Sections",
      menuRoot: "project/"
    }
  };

  /* ---------- helpers ---------- */

  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  /* Image paths go through here. build.sh renames every asset to
     name.<hash>.webp so it can be cached immutably, and injects the mapping
     as window.__ASSETS. Served straight from the project folder there is no
     mapping, so the plain path is used and nothing needs rebuilding to work. */
  const asset = (base) => (window.__ASSETS && window.__ASSETS[base]) || base;
  const pad2 = (i) => String(i + 1).padStart(2, "0");

  /* Whether scroll-driven motion should run at all. Read once: everything
     that animates checks this, so "no observer" and "reduce motion" both
     land on the same finished, un-animated page. */
  const ANIMATE = "IntersectionObserver" in window
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const store = {
    get() { try { return localStorage.getItem("gpv-lang"); } catch { return null; } },
    set(v) { try { localStorage.setItem("gpv-lang", v); } catch { /* private mode */ } }
  };

  const themeStore = {
    get() { try { return localStorage.getItem("gpv-theme"); } catch { return null; } },
    set(v) { try { localStorage.setItem("gpv-theme", v); } catch { /* private mode */ } }
  };

  /* ---------- theme ---------- */

  const THEME_COLOR = { dark: "#0B0D0C", light: "#F4F4EE" };

  /* The inline script in <head> already set data-theme before first paint;
     read it back rather than recomputing, so the two can never disagree. */
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[theme]);
    labelThemeButton();
  }

  function labelThemeButton() {
    const btn = $("#theme-toggle");
    if (!btn) return;
    const t = COPY[lang];
    btn.setAttribute("aria-label", currentTheme() === "dark" ? t.themeToLight : t.themeToDark);
  }

  /* ---------- render ---------- */

  let certFilter = "all";

  const saved = store.get();
  const browserPrefersEn = (navigator.language || "es").toLowerCase().startsWith("en");
  let lang = saved === "es" || saved === "en" ? saved : (browserPrefersEn ? "en" : "es");

  function render() {
    const t = COPY[lang];
    const es = lang === "es";

    document.documentElement.lang = lang;
    $("#lang-toggle").textContent = es ? "EN" : "ES";
    $("#lang-toggle").setAttribute("aria-label", es ? "Switch to English" : "Cambiar a español");
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

    $("#metrics").innerHTML = t.metrics.map((m) => `
      <div class="metric">
        <div class="metric-val">${esc(m.value)}</div>
        <div class="metric-label">${esc(m.label)}</div>
      </div>`).join("");

    $("#services").innerHTML = t.services.map((s) => `
      <article class="service">
        <span class="service-num">${esc(s.num)}</span>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.body)}</p>
        <div class="service-meta">${esc(s.meta)}</div>
      </article>`).join("");

    /* Author-written constant markup (see COPY.*.projectsQuip), not user input. */
    $("#projects-quip").innerHTML = t.projectsQuip;

    $("#projects").innerHTML = PROJECTS.map((p, i) => {
      const tags = p.tags.map((x) => es ? x : (TAG_EN[x] || x));
      const hint = t.shotHint(p.name);
      const shot = asset("assets/shot-" + p.slug);
      const media = p.shot
        ? `<div class="shot">
             <img src="${shot}.webp" alt="${esc(hint)}" loading="lazy" decoding="async"
                  data-base="${shot}" data-fallback="${esc(hint)}">
             <span class="shot-num">${pad2(i)}</span>
           </div>`
        : `<div class="shot"><div class="shot-empty">${esc(hint)}</div><span class="shot-num">${pad2(i)}</span></div>`;

      return `<article class="project" style="--i:${i}">
        ${media}
        <div class="project-body">
          <div class="project-top">
            <h3>${esc(p.name)}</h3>
            <span class="project-host">${esc(p.url ? host(p.url) : t.internal)}</span>
          </div>
          <p class="project-desc">${esc(es ? p.descEs : p.descEn)}</p>
          <div class="tags">${tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
          ${p.url ? `<a class="project-link" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(t.visitLabel)} <span>→</span></a>` : ""}
        </div>
      </article>`;
    }).join("");

    $("#skills").innerHTML = t.skills.map((label, i) =>
      `<span class="pill ${i % 2 === 0 ? "pill--lime" : "pill--dark"}">${esc(label)}</span>`).join("");

    /* One <details> per role: the disclosure is native, so it stays keyboard
       accessible and works with JS disabled once rendered. */
    $("#career").innerHTML = CAREER.map((job, i) => {
      const meta = (kind, text) => `
        <span class="job-meta">
          <svg class="job-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON[kind]}</svg>
          <span>${esc(text)}</span>
        </span>`;
      const points = es ? job.pointsEs : job.pointsEn;

      return `<li class="job${job.current ? " job--current" : ""}">
        <span class="job-dot" aria-hidden="true"></span>
        <details class="job-card"${i === 0 ? " open" : ""}>
          <summary class="job-head">
            <div class="job-intro">
              <h3 class="job-role">${esc(es ? job.roleEs : job.roleEn)}</h3>
              <span class="job-company">
                <svg class="job-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON.company}</svg>
                <span>${esc(job.company)}</span>
              </span>
              <span class="job-metas">
                ${meta("period", es ? job.periodEs : job.periodEn)}
                ${meta("place", es ? job.placeEs : job.placeEn)}
              </span>
              <p class="job-lead">${esc(es ? job.leadEs : job.leadEn)}</p>
            </div>
            <svg class="job-chev" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M6 9.5 12 15.5 18 9.5"></path>
            </svg>
          </summary>
          <div class="job-body">
            ${points.length ? `<ul class="job-points">${points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
            ${job.stack.length ? `<div class="job-stack">
              <span class="job-stack-label mono">${esc(t.careerStack)}</span>
              <div class="tags">${job.stack.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
            </div>` : ""}
          </div>
        </details>
      </li>`;
    }).join("");

    /* The list is rebuilt on every language switch, so the initial state and
       the observer have to be re-applied to the new nodes each time. */
    $("#career").classList.toggle("timeline--anim", ANIMATE);
    if (ANIMATE) observeJobs();
    fillRail();

    const catName = { all: t.certAll, web: t.certWeb, ia: t.certIa };

    $("#cert-filters").innerHTML = ["all", "web", "ia"].map((c) => `
      <button type="button" class="cert-filter${c === certFilter ? " is-on" : ""}"
              data-cat="${c}" aria-pressed="${c === certFilter}">
        ${esc(catName[c])}
      </button>`).join("");

    $("#certs").innerHTML = CERTS.map((c) => `
      <article class="cert" data-cat="${c.cat}"${c.cat === certFilter || certFilter === "all" ? "" : " hidden"}>
        <div class="cert-top">
          <span class="cert-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">${CERT_ICON[c.cat]}</svg>
          </span>
          <div class="cert-id">
            <h3>${esc(es ? c.nameEs : c.nameEn)}</h3>
            ${c.issuer ? `<p class="cert-issuer">${esc(c.issuer)}</p>` : ""}
          </div>
        </div>
        <div class="cert-foot">
          <span class="cert-date">
            <svg class="job-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON.period}</svg>
            <span>${esc(es ? c.dateEs : c.dateEn)}</span>
          </span>
          <span class="cert-tag">${esc(catName[c.cat])}</span>
        </div>
        ${c.stack.length ? `<div class="tags">${c.stack.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>` : ""}
      </article>`).join("");

    $("#stack-grid").innerHTML = STACK.map((tool) => {
      const icon = tool.slug
        ? `<img src="https://cdn.simpleicons.org/${tool.slug}/EDEDE8" alt="" loading="lazy" decoding="async">`
        : `<span class="mono">${esc(tool.name.slice(0, 1))}</span>`;
      return `<div class="tool">
        <div class="tool-icon">${icon}</div>
        <span class="tool-name">${esc(tool.name)}</span>
        <span class="tool-role">${esc(es ? tool.roleEs : tool.roleEn)}</span>
      </div>`;
    }).join("");

    const hintEl = document.querySelector(".portrait-hint");
    if (hintEl) hintEl.textContent = t.portraitHint;

    wireImageFallbacks();
  }

  /* Screenshots may be dropped in as .webp, .png or .jpg — try each in turn,
     then fall back to a labelled empty frame like the design's image-slot. */
  const EXTS = ["webp", "png", "jpg"];

  function wireFallback(img, onExhausted) {
    let i = 0;
    const next = () => {
      i += 1;
      if (i < EXTS.length) { img.src = img.dataset.base + "." + EXTS[i]; return; }
      img.removeEventListener("error", next);
      onExhausted();
    };
    img.addEventListener("error", next);
    if (img.complete && img.naturalWidth === 0) next();
  }

  function wireImageFallbacks() {
    document.querySelectorAll("#projects img[data-base]").forEach((img) => {
      wireFallback(img, () => {
        const frame = document.createElement("div");
        frame.className = "shot-empty";
        frame.textContent = img.dataset.fallback;
        img.replaceWith(frame);
      });
    });

    const portrait = document.getElementById("portrait");
    if (portrait && !portrait.dataset.wired) {
      portrait.dataset.wired = "1";
      wireFallback(portrait, () => {
        portrait.closest(".portrait-ring")?.classList.add("is-empty");
        portrait.style.display = "none";
      });
    }
  }

  /* ---------- reveal on scroll ---------- */

  function observeReveal() {
    if (!ANIMATE) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("rise"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    /* #recorrido is left out: its cards reveal one by one instead, and fading
       the whole section at once would run on top of that. */
    document.querySelectorAll(".section:not(#recorrido), .metrics").forEach((el) => io.observe(el));
  }

  /* Each role reveals as it enters. Cards that come into view together are
     staggered so a batch reads as a sequence, not one simultaneous jump. */
  let jobObserver = null;

  function observeJobs() {
    if (jobObserver) jobObserver.disconnect();
    jobObserver = new IntersectionObserver((entries, obs) => {
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e, n) => {
          e.target.style.setProperty("--d", (n * 80) + "ms");
          e.target.classList.add("is-in");
          obs.unobserve(e.target);
        });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.2 });
    document.querySelectorAll("#career .job").forEach((el) => jobObserver.observe(el));
  }

  /* The rail's lime fill follows the scroll. The reading line sits at 62% of
     the viewport, so the lime reaches a role at about the moment that role is
     the one being read, and the rail is full once the last card clears it.
     The rail's height changes when a card expands or the language switches,
     so it is measured every frame rather than cached. */
  /* The deck pins relative to the sticky header, whose height changes with the
     viewport (the nav wraps on narrow screens). Publish it as --header-h so
     the CSS can do the arithmetic. */
  function measureHeader() {
    /* The BAR, not the whole header: the open menu panel must not shove the
       sticky project deck down. */
    const bar = document.querySelector(".header-inner");
    if (!bar) return;
    document.documentElement.style.setProperty(
      "--header-h", Math.ceil(bar.getBoundingClientRect().height) + 1 + "px");
  }

  let fillRail = () => {};

  function trackRail() {
    const rail = $("#career");
    if (!rail) return;

    if (!ANIMATE) { rail.style.setProperty("--fill", "1"); return; }

    let queued = false;
    const measure = () => {
      queued = false;
      const box = rail.getBoundingClientRect();
      if (!box.height) return;
      const read = window.innerHeight * 0.62;
      const p = (read - box.top) / box.height;
      rail.style.setProperty("--fill", Math.min(1, Math.max(0, p)).toFixed(4));
    };

    fillRail = () => { if (!queued) { queued = true; requestAnimationFrame(measure); } };

    addEventListener("scroll", fillRail, { passive: true });
    addEventListener("resize", fillRail, { passive: true });
    /* toggle does not bubble, so catch the disclosures on the way down. */
    rail.addEventListener("toggle", fillRail, true);
    measure();
  }

  /* ---------- certification filter ---------- */

  function applyCertFilter() {
    document.querySelectorAll("#certs .cert").forEach((el) => {
      el.hidden = certFilter !== "all" && el.dataset.cat !== certFilter;
    });
    document.querySelectorAll("#cert-filters .cert-filter").forEach((b) => {
      const on = b.dataset.cat === certFilter;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }

  function wireCertFilter() {
    const bar = $("#cert-filters");
    if (!bar) return;
    /* Delegated: render() replaces these buttons on every language switch. */
    bar.addEventListener("click", (e) => {
      const btn = e.target.closest(".cert-filter");
      if (!btn) return;
      certFilter = btn.dataset.cat;
      applyCertFilter();
    });
  }

  /* ---------- hamburger menu ---------- */

  function labelMenuButton() {
    const btn = $("#menu-toggle");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-label", open ? COPY[lang].menuClose : COPY[lang].menuOpen);
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

    /* Jumping to a section should not leave the panel covering it. */
    panel.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !header.classList.contains("is-open")) return;
      setOpen(false);
      btn.focus();
    });

    document.addEventListener("click", (e) => {
      if (header.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
    });

    /* Crossing into the desktop layout hides the panel with display:none. Left
       alone, aria-expanded would keep claiming a panel nobody can reach, so
       reset the state when the inline nav takes over. Query kept in step with
       the one in styles.css. */
    const inlineNav = window.matchMedia("(min-width:1024px) and (pointer:fine)");
    const onLayoutChange = (e) => { if (e.matches) setOpen(false); };
    if (inlineNav.addEventListener) inlineNav.addEventListener("change", onLayoutChange);
    else if (inlineNav.addListener) inlineNav.addListener(onLayoutChange);
  }

  /* ---------- init ---------- */

  render();
  observeReveal();
  trackRail();
  wireMenu();
  wireCertFilter();
  measureHeader();
  addEventListener("resize", measureHeader, { passive: true });

  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "es" ? "en" : "es";
    store.set(lang);
    render();
    measureHeader();
  });

  $("#theme-toggle")?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    themeStore.set(next);
    applyTheme(next);
  });

  /* Until the visitor picks a theme, follow the OS if it changes mid-visit. */
  const osLight = window.matchMedia("(prefers-color-scheme: light)");
  const onOsChange = (e) => {
    if (themeStore.get()) return;
    applyTheme(e.matches ? "light" : "dark");
  };
  if (osLight.addEventListener) osLight.addEventListener("change", onOsChange);
  else if (osLight.addListener) osLight.addListener(onOsChange);

  applyTheme(currentTheme());
})();
