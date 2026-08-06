/**
 * Contenido del sitio.
 * Todo lo editable vive acá: datos de contacto, servicios, proyectos y textos.
 * Los proyectos marcados con `placeholder: true` son de ejemplo — reemplazalos
 * por casos reales y borrá la bandera.
 */

export const site = {
  name: "VCP Design",
  tagline: "Apps · Web · SaaS",
  role: "Estudio de software",
  location: "Buenos Aires, Argentina",
  email: "vcpdesign@outlook.com.ar",
  phoneDisplay: "+54 9 11 5562-5597",
  founded: 2026,
} as const;

/**
 * Dominio del sitio. De acá salen la URL canónica, el sitemap y las etiquetas
 * Open Graph — o sea, la tarjeta que se ve cuando alguien comparte el link.
 *
 * Se resuelve en cascada para que nunca apunte a un dominio que no existe:
 *   1. `NEXT_PUBLIC_SITE_URL` — el dominio propio, cuando lo tengas. Se carga
 *      como variable de entorno en Vercel y manda sobre todo lo demás.
 *   2. La URL de producción que Vercel asigna sola (vcp-design.vercel.app).
 *   3. localhost, en desarrollo.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

export const whatsapp = {
  number: "5491155625597",
  message:
    "Hola, quiero solicitar un presupuesto para desarrollar un proyecto con VCP Design.",
  tooltip: "¿Hablamos sobre tu proyecto?",
} as const;

export const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
  whatsapp.message,
)}`;

export const nav = [
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "stack", label: "Stack" },
  { id: "proceso", label: "Proceso" },
  { id: "estudio", label: "Estudio" },
  { id: "contacto", label: "Contacto" },
] as const;

/* ── Servicios ─────────────────────────────────────────────────────────── */

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  span: string;
};

export const services: Service[] = [
  {
    id: "apps",
    index: "APPS",
    title: "Aplicaciones móviles",
    summary:
      "Apps nativas para iOS y Android desde una sola base de código. Offline, notificaciones push, pagos y publicación en ambas tiendas.",
    deliverables: [
      "React Native / Expo",
      "Modo offline y sincronización",
      "Push, deep links y biometría",
      "Publicación en App Store y Google Play",
    ],
    span: "4–6 semanas",
  },
  {
    id: "web",
    index: "WEB",
    title: "Plataformas web",
    summary:
      "Sitios y aplicaciones que cargan rápido, posicionan y se ven impecables en cualquier pantalla. Medibles desde el primer día.",
    deliverables: [
      "Next.js y renderizado en servidor",
      "SEO técnico y Core Web Vitals",
      "Panel de administración a medida",
      "Analítica y seguimiento de conversión",
    ],
    span: "3–4 semanas",
  },
  {
    id: "saas",
    index: "SAAS",
    title: "Productos SaaS",
    summary:
      "Software por suscripción de punta a punta: cuentas, roles, facturación recurrente y la infraestructura para que aguante crecer.",
    deliverables: [
      "Multi-tenant y control de accesos",
      "Suscripciones con Stripe o Mercado Pago",
      "API documentada e integraciones",
      "Monitoreo, backups y despliegue continuo",
    ],
    span: "4–6 semanas",
  },
];

/* ── Proyectos ─────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  name: string;
  category: string;
  year: string;
  summary: string;
  /**
   * Resultado medible del proyecto. Es opcional a propósito: mejor no mostrar
   * nada que inventar un número. Cuando tengas el dato real, agregalo.
   */
  metric?: { value: string; label: string };
  stack: string[];
  accent: string;
  /** Ruta a la captura dentro de /public. Sin ella se dibuja un panel generado. */
  image?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    id: "nexo",
    name: "JardinControl",
    category: "PWA · App web",
    year: "2026",
    summary:
      "Plataforma de fichaje y métricas para un jardín, con rol de administrador para control de empleados.",
    // Sin `metric` hasta tener el dato real: cuando sepas cuánto tiempo ahorró
    // o cuántos empleados fichan por día, agregalo acá y aparece en la tarjeta.
    stack: ["Next.js", "Supabase", "PWA"],
    accent: "#7c6cf0",
  },
];

/* ── Stack ─────────────────────────────────────────────────────────────── */

export const stackGroups = [
  {
    label: "Producto",
    items: ["Next.js", "React", "TypeScript", "React Native", "Expo", "Tailwind CSS"],
  },
  {
    label: "Servidor",
    items: ["Node.js", "PostgreSQL", "Supabase", "Prisma", "Redis", "tRPC"],
  },
  {
    label: "Infraestructura",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare", "Sentry"],
  },
];

export const stackMarquee = [
  "Next.js",
  "React",
  "TypeScript",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "Tailwind CSS",
  "Expo",
  "Vercel",
  "AWS",
  "Docker",
  "Stripe",
  "Figma",
  "GitHub Actions",
];

/* ── Proceso ───────────────────────────────────────────────────────────── */

export type Step = {
  n: string;
  title: string;
  body: string;
  span: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Descubrimiento",
    body: "Entendemos el negocio antes que el software. Definimos a quién le sirve, qué problema resuelve y cómo se va a medir que funcionó.",
    span: "3–4 días",
  },
  {
    n: "02",
    title: "Diseño",
    body: "Arquitectura, flujos y prototipo navegable. Vas a poder recorrer el producto y pedir cambios antes de que se escriba una línea de código.",
    span: "1 semana",
  },
  {
    n: "03",
    title: "Desarrollo",
    body: "Entregas cada dos semanas en un entorno real. Ves avances concretos, probás, y ajustamos el rumbo sin esperar al final.",
    span: "3–6 semanas",
  },
  {
    n: "04",
    title: "Lanzamiento y soporte",
    body: "Publicación, monitoreo y correcciones. Después seguimos con mejoras mensuales o te entregamos todo documentado para tu equipo.",
    span: "Continuo",
  },
];

/* ── Estudio ───────────────────────────────────────────────────────────── */

export const stats = [
  { value: "5+", label: "Productos entregados" },
  { value: "1", label: "Año construyendo" },
  { value: "4 de 5", label: "Clientes que nos eligen" },
  { value: "7d", label: "Al primer entregable" },
];

export const principles = [
  {
    title: "El código es tuyo",
    body: "Repositorio, credenciales y documentación se transfieren al cierre. Sin dependencias forzadas ni licencias atadas al estudio.",
  },
  {
    title: "Precio cerrado",
    body: "Presupuesto por alcance definido. Si cambia el alcance lo hablamos antes, nunca aparece en la factura final.",
  },
  {
    title: "Una sola persona a cargo",
    body: "Hablás siempre con quien construye. Sin capas de gestión traduciendo lo que necesitás.",
  },
];

/* ── Testimonios ───────────────────────────────────────────────────────── */

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Llegamos con una idea escrita en papel y a la semana teníamos la app en el jardín. Lo que más valoro es que nos dijeron que no a tres funciones que no hacían falta y con la rapidez que trabajaron.",
    author: "Sandra.C",
    role: "Directora, Jardín MF",
  },
];

/* ── Contacto ──────────────────────────────────────────────────────────── */

export const budgets = [
  "Menos de $ 300.000",
  "Todavía no lo sé",
];

export const projectTypes = ["App móvil", "Plataforma web", "Producto SaaS", "PWA", "Sistema ERP", "Portales para clientes", "Otros"];
