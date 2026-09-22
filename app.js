/* Geiner Porras Vargas — portfolio
   Bilingual (ES/EN) one-pager. Content mirrors the Claude Design source. */

(() => {
  "use strict";

  /* ---------- data ---------- */

  const PROJECTS = [
    { name: "Abdi IA", slug: "abdi-ia", url: "https://app.abdismart.com/", shot: true,
      descEs: "Página de producto del CRM Abdi IA: explica cómo los agentes de IA administran las agendas de citas de especialistas de la salud y convierte la visita en registro.",
      descEn: "Product page for the Abdi IA CRM: explains how AI agents run appointment schedules for healthcare specialists and turns the visit into a signup.",
      tags: ["Next.js 16", "React 19", "Tailwind v4", "Vercel"] },

    { name: "Abdi IA CRM", slug: "abdi-ia-crm", url: "", shot: true,
      descEs: "CRM que administra las agendas de citas por medio de agentes de IA: confirmaciones, recordatorios y reprogramaciones por WhatsApp, con el historial del paciente en un solo lugar.",
      descEn: "CRM that manages appointment schedules through AI agents: confirmations, reminders and rescheduling over WhatsApp, with patient history in one place.",
      tags: ["Agentes IA", "WhatsApp API", "Supabase", "Prisma", "Cloudflare"] },

    { name: "Abdismart", slug: "abdismart", url: "https://abdismart.com/", shot: true,
      descEs: "Ayudamos a especialistas de la salud a mejorar la identidad visual digital por medio de automatizaciones y agentes de IA.",
      descEn: "We help healthcare specialists improve their digital visual identity through automation and AI agents.",
      tags: ["Landing page", "Next.js", "Vercel"] },

    { name: "Abdismart CRM", slug: "abdismart-crm", url: "", shot: true,
      descEs: "Administra los clientes y toda la operación de Abdismart: pipeline comercial, entregables por cliente y seguimiento del servicio en un panel interno.",
      descEn: "Manages clients and the whole Abdismart operation: sales pipeline, per-client deliverables and service tracking in one internal panel.",
      tags: ["CRM", "Supabase", "Postgres", "Auth"] },

    { name: "Badboysgym", slug: "badboysgym", url: "https://badboysgym.com/", shot: true,
      descEs: "Landing page para un gimnasio donde brinda toda la información y planes para los clientes del gimnasio.",
      descEn: "Landing page for a gym that presents all the information and membership plans for its clients.",
      tags: ["Landing page", "Netlify", "Cloudflare"] },

    { name: "Badboysgym CRM", slug: "badboysgym-crm", url: "", shot: true,
      descEs: "Panel administrativo tanto para administradores y funcionarios del gym para llevar toda la gestión de planes, servicios de los clientes del Gimnasio.",
      descEn: "Admin panel for gym owners and staff to manage plans and client services end to end.",
      tags: ["CRM", "Roles y permisos", "Supabase"] },

    { name: "ElticoFX", slug: "elticofx", url: "https://elticofx.com/", shot: true,
      descEs: "Landing page enfocada en atracción de clientes para la comunidad de forex e inversión.",
      descEn: "Landing page focused on client acquisition for a forex and investing community.",
      tags: ["Landing page", "Conversión", "Vercel"] },

    { name: "Comunidad de IA", slug: "comunidad-ia", url: "https://comunidad.abdismart.com/", shot: true,
      descEs: "Brindamos valor a la comunidad, agregando Agentes de IA, Guias, repositorios etc.",
      descEn: "We deliver value to the community by adding AI agents, guides, repositories and more.",
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
      periodEs: "2026 — Actualidad", periodEn: "2026 — Present",
      placeEs: "Costa Rica · Remoto", placeEn: "Costa Rica · Remote",
      leadEs: "Desarrollé presencia digital para profesionales de la salud mediante sistemas con IA, landing pages y automatizaciones.",
      leadEn: "Built digital presence for healthcare professionals through AI-driven systems, landing pages and automations.",
      pointsEs: ["Diseñé un CRM para consultorios, laboratorios y profesionales de la salud que automatiza la gestión de agendas, permitiendo operar 24/7 en lugar de 8 horas y reduciendo la pérdida de ingresos por citas no gestionadas y cancelaciones."],
      pointsEn: ["Designed a CRM for clinics, laboratories and healthcare professionals that automates scheduling, enabling 24/7 operation instead of 8 hours and reducing revenue loss from unmanaged appointments and cancellations."],
      stack: ["React", "Supabase", "Vercel", "Cloudflare", "n8n", "Claude", "ChatGPT", "REST API", "Git", "GitHub"] },

    { company: "Multibank Group", current: false,
      roleEs: "Business Development Manager (BDM)", roleEn: "Business Development Manager (BDM)",
      periodEs: "Dic. 2023 — Jul. 2025", periodEn: "Dec 2023 — Jul 2025",
      placeEs: "Monterrey, México", placeEn: "Monterrey, Mexico",
      leadEs: "Optimicé el flujo de onboarding de una landing page, reduciendo la fricción de registro.",
      leadEn: "Optimized the onboarding flow of a landing page, reducing signup friction.",
      pointsEs: ["Aumenté los leads calificados diarios de 10 a 50: un crecimiento del 400%."],
      pointsEn: ["Increased qualified daily leads from 10 to 50: 400% growth."],
      stack: ["WordPress", "Elementor", "n8n", "ChatGPT", "Supabase", "Git"] },

    { company: "Cosvic", current: false,
      roleEs: "Gerente de Ventas", roleEn: "Sales Manager",
      periodEs: "2021 — Oct. 2023", periodEn: "2021 — Oct 2023",
      placeEs: "Costa Rica", placeEn: "Costa Rica",
      leadEs: "Diseñé la presencia digital web y en redes sociales de la empresa.",
      leadEn: "Designed the company's web and social media presence.",
      pointsEs: ["Implementé un proceso de ventas que incrementó las ventas en un 30%."],
      pointsEn: ["Implemented a sales process that increased sales by 30%."],
      stack: ["WordPress", "Elementor"] }
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
      nav1: "Servicios", nav2: "Proyectos", nav3: "Sobre mí", nav4: "Recorrido", nav5: "Certificaciones", navCta: "Contacto",
      availLabel: "Disponible para proyectos",
      heroTitle1: "Ingeniero de", heroTitle2: "Software e IA",
      heroSub: "Construyo el producto completo para negocios de salud: la landing que capta, el CRM que administra la operación y los agentes de IA que hacen el trabajo repetitivo. 5 años de experiencia, 9 proyectos de IA en producción.",
      heroCta1: "Ver proyectos", heroCta2: "Escríbeme",
      cvLabel: "Descargar CV",
      cvAriaEs: "Descargar CV en español", cvAriaEn: "Descargar CV en inglés",
      metrics: [
        { value: "05", label: "Años de experiencia" },
        { value: "09", label: "Proyectos de IA" },
        { value: "03", label: "CRMs en producción" },
        { value: "05", label: "Landing pages en vivo" }
      ],
      h2servicios: "Servicios",
      services: [
        { num: "S1", title: "Desarrollo web y landing page",
          body: "Sitios y landings rápidas, medibles y listas para campañas: estructura de conversión, contenido, SEO técnico y despliegue.",
          meta: "Next.js · Vercel · Netlify" },
        { num: "S2", title: "CRM personalizados",
          body: "Paneles hechos a la medida de la operación: clientes, agendas, planes, roles y reportes, sin pagar licencias por usuario.",
          meta: "Supabase · Postgres · Prisma" },
        { num: "S3", title: "Agentes de IA",
          body: "Agentes que atienden, confirman y agendan por WhatsApp, conectados a tu base de datos y a tu calendario real.",
          meta: "Claude · WhatsApp API · Cloudflare" }
      ],
      h2proyectos: "Proyectos",
      projectsQuip: '<b>200 tazas de café</b>, unos millones de tokens y <b>esto fue lo que sobrevivió</b>.',
      visitLabel: "Visitar sitio",
      internal: "Interno",
      shotHint: (n) => "Captura de " + n,
      h2sobre: "Sobre mí",
      aboutQ: "¿Quién es",
      about1: "Ingeniero de Software enfocado en inteligencia artificial aplicada al desarrollo web. Diseño sistemas digitales que ordenan y automatizan la operación de negocios de salud.",
      about2: "Fundé Abdismart, donde desarrollo un CRM con inteligencia artificial que automatiza la gestión de agendas de profesionales de la salud. Empecé hace 5 años con WordPress y Elementor; hoy trabajo end-to-end: arquitectura, base de datos, frontend, despliegue y los agentes que conectan WhatsApp con la agenda real. También he construido landings y paneles para gimnasios y comunidades.",
      aboutCta: "Hablemos",
      portraitHint: "Suelta tu foto aquí",
      skills: ["Landing pages", "CRM personalizados", "Agentes de IA", "WhatsApp API", "Automatizaciones", "WordPress", "Next.js", "Supabase"],
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
      ctaHead: "¿Tienes una operación que automatizar?",
      tzLabel: "Zona horaria",
      footerRights: "© 2026 Geiner Porras Vargas · Todos los derechos reservados",
      footerNote: "Disponible para proyectos y colaboraciones",
      themeToLight: "Cambiar a tema claro",
      themeToDark: "Cambiar a tema oscuro",
      menuOpen: "Abrir menú", menuClose: "Cerrar menú", menuNav: "Secciones"
    },
    en: {
      skip: "Skip to content",
      nav1: "Services", nav2: "Work", nav3: "About", nav4: "Journey", nav5: "Certifications", navCta: "Contact",
      availLabel: "Available for projects",
      heroTitle1: "AI & Software", heroTitle2: "Engineer",
      heroSub: "I build the whole product for healthcare businesses: the landing page that captures, the CRM that runs the operation, and the AI agents that handle the repetitive work. 5 years of experience, 9 AI projects in production.",
      heroCta1: "View work", heroCta2: "Get in touch",
      cvLabel: "Download CV",
      cvAriaEs: "Download CV in Spanish", cvAriaEn: "Download CV in English",
      metrics: [
        { value: "05", label: "Years of experience" },
        { value: "09", label: "AI projects" },
        { value: "03", label: "CRMs in production" },
        { value: "05", label: "Live landing pages" }
      ],
      h2servicios: "Services",
      services: [
        { num: "S1", title: "Web development & landing pages",
          body: "Fast, measurable sites and landing pages ready for campaigns: conversion structure, content, technical SEO and deployment.",
          meta: "Next.js · Vercel · Netlify" },
        { num: "S2", title: "Custom CRMs",
          body: "Panels built around your operation: clients, schedules, plans, roles and reports, with no per-seat licensing.",
          meta: "Supabase · Postgres · Prisma" },
        { num: "S3", title: "AI agents",
          body: "Agents that reply, confirm and book over WhatsApp, wired to your real database and calendar.",
          meta: "Claude · WhatsApp API · Cloudflare" }
      ],
      h2proyectos: "Selected work",
      projectsQuip: '<b>200 cups of coffee</b>, a few million tokens and <b>this is what survived</b>.',
      visitLabel: "Visit site",
      internal: "Internal",
      shotHint: (n) => n + " screenshot",
      h2sobre: "About",
      aboutQ: "Who is",
      about1: "Software Engineer focused on artificial intelligence applied to web development. I design digital systems that bring order to and automate the operations of healthcare businesses.",
      about2: "I founded Abdismart, where I build an AI-powered CRM that automates appointment scheduling for healthcare professionals. I started five years ago with WordPress and Elementor; today I work end to end: architecture, database, frontend, deployment and the agents that connect WhatsApp to the real calendar. I have also built landing pages and panels for gyms and communities.",
      aboutCta: "Let's talk",
      portraitHint: "Drop your photo here",
      skills: ["Landing pages", "Custom CRMs", "AI agents", "WhatsApp API", "Automation", "WordPress", "Next.js", "Supabase"],
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
      ctaHead: "Got an operation to automate?",
      tzLabel: "Time zone",
      footerRights: "© 2026 Geiner Porras Vargas · All rights reserved",
      footerNote: "Available for projects and collaborations",
      themeToLight: "Switch to light theme",
      themeToDark: "Switch to dark theme",
      menuOpen: "Open menu", menuClose: "Close menu", menuNav: "Sections"
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
            <ul class="job-points">${points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            <div class="job-stack">
              <span class="job-stack-label mono">${esc(t.careerStack)}</span>
              <div class="tags">${job.stack.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
            </div>
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
