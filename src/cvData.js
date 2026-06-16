// ============================================================
//  TUS DATOS DEL CV  — Edita aquí todo tu contenido.
//  No necesitas tocar el resto del código.
// ============================================================

export const cvData = {
  // ---- Datos personales ----
  nombre: "Argenis Zamora",
  titulo: "Growth & Performance Marketing · E-commerce & Data",
  // Roles que rotan con efecto de máquina de escribir en el hero
  roles: [
    "Growth & Performance",
    "Paid Media (Meta & Google)",
    "E-commerce & Data",
    "Marketing Automation",
    "Analítica (GA4 · BigQuery)",
    "SEO técnico",
  ],
  resumen:
    "Especialista en Growth & Performance Marketing con más de 6 años de experiencia diseñando y " +
    "ejecutando estrategias de adquisición, performance y analítica en e-commerce, salud y B2B en " +
    "Chile, Colombia, Argentina, Perú y México. Combino ejecución técnica en paid media (Meta, Google), " +
    "analítica avanzada (GA4, BigQuery, Looker Studio) y automatización (n8n, Make, Python) con foco en " +
    "ROAS, eficiencia de inversión y crecimiento de ingresos. Base en Ingeniería de Sistemas, orientado " +
    "a datos y a la automatización con IA.",

  // ---- "¿Sabías que...?" (toast que aparece a los 5s, rota entre estos) ----
  sabiasQue: [
    "Combino marketing con código: uso Python, APIs e IA (Claude Code) para automatizar el growth. Un perfil híbrido poco común.",
    "Casi dupliqué el ROAS de una cuenta de Meta Ads: de ~5.9x a ~10x sostenido (excluyendo eventos Cyber).",
    "Cyber Monday 2025: lideré una campaña multicanal que generó $46,8MM CLP en ventas, 23% sobre la meta y 4,34x ROAS.",
    "Tengo +6 años escalando growth y performance en 5 países de Latinoamérica.",
    "Construyo mis propias herramientas: desde un monitor de precios con scraping hasta reportería automatizada por API.",
    "Trabajé marcas como Softys y Nestlé liderando SEO técnico y estrategia regional.",
  ],

  // ---- Contacto y redes ----
  contacto: {
    email: "zamoraargenis18@gmail.com",
    telefono: "+56 9 6532 0385",
    ubicacion: "Santiago, Chile",
    github: "https://github.com/argeniszamora",
    linkedin: "https://www.linkedin.com/in/growth-marketing-argenis/",
    sitio: "",
  },

  // ---- Logros destacados (métricas grandes) ----
  logros: [
    { valor: "≈2x", texto: "ROAS en Meta Ads: de 5.9x a ~10x — Lasertam" },
    { valor: "$46,8MM", texto: "Ventas Cyber Monday 2025 · 4,34x ROAS (Lasertam)" },
    { valor: "-14%", texto: "Gasto publicitario ineficiente eliminado" },
    { valor: "+80%", texto: "Tráfico orgánico en 4 meses (ATM)" },
  ],

  // ---- Experiencia laboral ----
  experiencia: [
    {
      puesto: "Growth Marketing Specialist",
      empresa: "Keenfounders (Cliente: Lasertam) · Santiago, Chile · Híbrido",
      periodo: "Oct 2025 – Presente",
      descripcion: [
        "Lidero la estrategia de growth y performance para una red nacional de clínicas de depilación láser (+20 sucursales), aumentando el ROAS de Meta Ads de ~5,9x a ~10x sostenido y eliminando ~14% de gasto ineficiente mediante optimización de campañas y automatización de reportería.",
        "Cyber Monday 2025: lideré la campaña multicanal (Meta, Google, email, orgánico) alcanzando $46,8MM CLP en ventas atribuidas, 23% sobre meta y 4,34x ROAS.",
        "Desarrollé dashboards a medida para la toma de decisiones y automaticé la reportería y atribución conectando APIs (Meta, Google, GA4, WooCommerce) con IA (Claude Code), n8n y BigQuery.",
        "Desarrollé un sistema de monitoreo de precios de competencia (Python, Streamlit, SQLite) con scraping semanal vía GitHub Actions.",
        "Posicioné el newsletter como un nuevo canal de venta directa en MailerLite mediante secuencias promocionales multietapa.",
      ],
    },
    {
      puesto: "Especialista Paid Media (Freelance)",
      empresa: "Admente · Remoto",
      periodo: "Jul 2025 – Presente",
      descripcion: [
        "Gestiono campañas de Meta Ads y Google Ads para especialistas médicos (cirugía bariátrica, balón gástrico, consultas y cirugía robótica), con foco en la captación de leads calificados.",
        "Opero cuentas en Chile y República Dominicana, adaptando segmentación, creatividades y presupuesto a cada mercado y especialidad.",
        "Analizo CTR, CPL y ROAS y entrego reportes periódicos con recomendaciones de optimización por cuenta.",
      ],
    },
    {
      puesto: "Growth Marketing Manager",
      empresa: "ATM SpA · Santiago, Chile",
      periodo: "Jul 2024 – Jun 2025",
      descripcion: [
        "Lideré la estrategia de marketing integral (paid media, SEO, email y automatización) con foco en la generación de leads calificados B2B, segmentados por línea de negocio: dermatología, oftalmología y cirugía.",
        "Generé +80% de tráfico orgánico en 4 meses y +60% de leads calificados.",
        "Automaticé la contactabilidad y el seguimiento de leads con Make y GoHighLevel, reduciendo los tiempos de respuesta.",
        "Implementé email marketing multietapa basado en comportamiento y dashboards de KPI en Looker Studio con A/B testing sistemático.",
      ],
    },
    {
      puesto: "SEO & Growth Manager (Clientes: Softys y Nestlé Perú)",
      empresa: "Kinesso · Las Condes, Chile",
      periodo: "2023 – 2024",
      descripcion: [
        "Cliente Softys — Diseñé e implementé estrategia digital regional para 5 países coordinando equipos locales y capacitaciones internas.",
        "Cliente Softys — Lideré SEO de Personal Care: análisis competitivo, optimización técnica y automatización de reportes ejecutivos.",
        "Cliente Nestlé Perú — Ejecuté SEO técnico y de contenido para múltiples marcas, mejorando posicionamiento orgánico y share of voice.",
        "Cliente Nestlé Perú — Analicé arquitectura de sitio e identifiqué oportunidades técnicas para priorizar iniciativas de crecimiento.",
      ],
    },
    {
      puesto: "Encargado SEO & SEM",
      empresa: "Clínica Cela (estética y depilación láser) · Chile y Colombia",
      periodo: "2021 – 2023",
      descripcion: [
        "Gestioné campañas multicanal (Google, Meta, LinkedIn, TikTok, Waze) para dos mercados con presupuestos independientes.",
        "Ejecuté auditorías SEO, mejoras de UX y velocidad de sitio, incrementando tráfico orgánico calificado.",
        "Diseñé campañas de email marketing con seguimiento de conversiones y coordiné con agencias externas en Colombia.",
      ],
    },
  ],

  // ---- Educación ----
  educacion: [
    {
      titulo: "Ingeniería de Sistemas",
      institucion: "Universidad Nororiental Gran Mariscal de Ayacucho",
      periodo: "2009 – 2014",
    },
  ],

  // ---- Certificaciones ----
  certificaciones: [
    "Curso de Growth Marketing – Coderhouse (2023)",
    "Google Ads Search Certification – Google (Skillshop)",
    "Google Analytics Individual Qualification (GAIQ) – Google (Skillshop)",
    "SEO Fundamentals – Semrush",
  ],

  // ---- Marcas / empresas con las que ha trabajado ----
  // Para usar logos reales: pon el archivo en public/logos/ y agrega `logo: "/logos/archivo.svg"`.
  // Si no hay `logo`, se muestra el nombre como wordmark.
  // `via`: si llegaste a esa marca a través de otra (agencia/empresa).
  empresas: [
    { nombre: "Lasertam", via: "Keenfounders", logo: "/logos/lasertam.svg" },
    { nombre: "Softys", via: "Kinesso", logo: "/logos/softys.jpg" },
    { nombre: "Nestlé", via: "Kinesso", logo: "/logos/nestle.svg" },
    { nombre: "Kinesso", logo: "/logos/kinesso.svg" },
    { nombre: "Keenfounders", logo: "/logos/keenfounders.png" },
    { nombre: "Clínica Cela", logo: "/logos/cela.png" },
    { nombre: "ATM", logo: "/logos/atm.jpg", fill: true },
    { nombre: "Admente", logo: "/logos/admente.png", fill: true },
    { nombre: "MPS", logo: "/logos/mps.png", via: "Admente" },
    { nombre: "Imactions", logo: "/logos/imactions.jpg" },
    { nombre: "ScarfMe", logo: "/logos/scarfme.png" },
    { nombre: "LexLatin", logo: "/logos/lexlatin.webp" },
  ],

  // ---- Habilidades (agrupadas por categoría) ----
  habilidades: [
    {
      categoria: "Paid Media",
      items: ["Meta Ads", "Google Ads (Search, PMax, Display)", "LinkedIn Ads", "TikTok Ads", "Waze Ads"],
    },
    {
      categoria: "SEO / SEM",
      items: ["SEO técnico", "On-page", "Off-page", "Keyword Research", "Share of Voice", "Semrush"],
    },
    {
      categoria: "Analítica y Data",
      items: ["GA4", "BigQuery", "Looker Studio", "Google Tag Manager", "SQL", "A/B Testing", "Dashboards KPI"],
    },
    {
      categoria: "E-commerce",
      items: ["WooCommerce", "Atribución multicanal (UTM)", "Seguimiento de conversiones"],
    },
    {
      categoria: "Email Marketing",
      items: ["Estrategias multietapa", "Segmentación comportamental", "MailerLite", "Mailchimp", "CRM"],
    },
    {
      categoria: "Automatización & Dev",
      items: ["n8n", "Make (Integromat)", "GoHighLevel", "Python (Streamlit, SQLite)", "GitHub Actions", "APIs"],
    },
    {
      categoria: "IA & Dev Tools",
      items: ["Claude Code", "Automatización con LLMs", "Prompting avanzado", "Integración de APIs"],
    },
    {
      categoria: "Soft Skills",
      items: ["Pensamiento estratégico", "Liderazgo de proyectos", "Adaptabilidad", "Comunicación ejecutiva"],
    },
  ],
};
