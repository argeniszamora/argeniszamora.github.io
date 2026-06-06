// ============================================================
//  TUS DATOS DEL CV  — Edita aquí todo tu contenido.
//  No necesitas tocar el resto del código.
// ============================================================

export const cvData = {
  // ---- Datos personales ----
  nombre: "Argenis Zamora",
  titulo: "Digital Marketing Manager | Growth & Performance",
  resumen:
    "Especialista en marketing digital con +6 años de experiencia diseñando y ejecutando " +
    "estrategias integrales de growth, performance y posicionamiento orgánico en mercados de " +
    "Chile, Colombia, Argentina, Perú y México. Combino visión estratégica con ejecución técnica " +
    "en paid media (Meta, Google, LinkedIn), SEO, automatización con n8n y Make, y análisis de " +
    "datos con GA4 y Looker Studio. Historial comprobado escalando leads calificados, tráfico " +
    "orgánico y cotizaciones en sectores salud, B2B y consumo masivo.",

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
    { valor: "+80%", texto: "Tráfico orgánico en 4 meses (ATM)" },
    { valor: "+60%", texto: "Leads calificados generados (ATM)" },
    { valor: "+40%", texto: "Cotizaciones web incrementadas (ATM)" },
    { valor: "5 países", texto: "Estrategia regional liderada (Kinesso)" },
  ],

  // ---- Experiencia laboral ----
  experiencia: [
    {
      puesto: "Growth Marketing Specialist",
      empresa: "Keenfounders (Cliente: Lasertam) · Híbrido",
      periodo: "Oct 2025 – Presente",
      descripcion: [
        "Lidero la estrategia de growth y performance para Lasertam, marca de depilación láser en Chile.",
        "Gestiono campañas de paid media (Meta y Google Ads) con enfoque data-driven: análisis de CTR, CPL y ROAS para optimizar la inversión y escalar cotizaciones.",
        "Mantengo el monitoreo de conversiones reales y su trazabilidad end-to-end, asegurando atribución y analítica confiables para la toma de decisiones.",
        "Automatizo la generación de reportes e informes de performance conectando las APIs de las plataformas (Meta, Google, GA4) y procesándolas con IA (Claude Code), eliminando trabajo manual y acelerando la entrega de insights accionables.",
        "Diseño, armo y envío campañas de email marketing orientadas a generar ventas y conversión directa.",
        "Presento las campañas a stakeholders y apoyo en la coordinación de redes sociales e influencers.",
        "Desarrollé un sistema automatizado de monitoreo de precios de competencia (Python, Streamlit, SQLite) con scraping semanal vía GitHub Actions, optimizando el posicionamiento de precios por zona.",
      ],
    },
    {
      puesto: "Especialista Paid Media (Freelance)",
      empresa: "Admente · Remoto",
      periodo: "Jul 2025 – Presente",
      descripcion: [
        "Gestiono campañas de Meta Ads y Google Ads para múltiples clientes simultáneos, optimizando segmentaciones, creatividades y presupuestos por cuenta.",
        "Analizo métricas de rendimiento (CTR, CPL, ROAS) y entrego reportes periódicos con recomendaciones de mejora por cliente.",
        "Adapto estrategias de paid media a distintos sectores y objetivos, manteniendo eficiencia de presupuesto y cumplimiento de KPIs.",
      ],
    },
    {
      puesto: "Growth Marketing Manager",
      empresa: "ATM SpA · Santiago, Chile",
      periodo: "Jul 2024 – Jun 2025",
      descripcion: [
        "Lideré estrategia de marketing integral (paid media, SEO, email y automatización) para clínicas de salud con foco en adquisición B2B.",
        "Implementé automatización de marketing y CRM con Make y GoHighLevel, reduciendo tiempos de conversión y escalando lead generation.",
        "Diseñé email marketing multietapa basado en comportamiento, y dashboards de KPI en Looker Studio con A/B testing sistemático.",
        "Coordiné con equipos de negocio para alinear iniciativas de marketing con objetivos comerciales trimestrales.",
      ],
    },
    {
      puesto: "SEO & Growth Manager (Clientes: Softys y Nestlé Perú)",
      empresa: "Kinesso · Las Condes, Chile",
      periodo: "Ene 2021 – Mar 2024",
      descripcion: [
        "Cliente Softys — Diseñé e implementé estrategia digital regional para 5 países coordinando equipos locales y capacitaciones internas.",
        "Cliente Softys — Lideré SEO de Personal Care: análisis competitivo, optimización técnica y automatización de reportes ejecutivos.",
        "Cliente Nestlé Perú — Ejecuté SEO técnico y de contenido para múltiples marcas, mejorando posicionamiento orgánico y share of voice.",
        "Cliente Nestlé Perú — Analicé arquitectura de sitio e identifiqué oportunidades técnicas para priorizar iniciativas de crecimiento.",
      ],
    },
    {
      puesto: "Especialista SEO y SEM",
      empresa: "Clínica Cela (estética y depilación láser) · Chile y Colombia",
      periodo: "2020 – 2021",
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
    "Google Ads Search Certification",
    "Google Analytics Individual Qualification",
    "SEO Fundamentals – Semrush",
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
      categoria: "Analytics",
      items: ["GA4", "Looker Studio", "Google Tag Manager", "A/B Testing", "Dashboards KPI"],
    },
    {
      categoria: "Email Marketing",
      items: ["Estrategias multietapa", "Segmentación comportamental", "MailerLite", "Mailchimp", "CRM"],
    },
    {
      categoria: "Automatización",
      items: ["n8n", "Make (Integromat)", "GoHighLevel", "Flujos de lead gen y nurturing"],
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
