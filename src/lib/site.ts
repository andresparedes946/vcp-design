/**
 * Contenido del sitio.
 * Todo lo editable vive acá: datos de contacto, servicios, proyectos y textos.
 */

export const site = {
  name: "VCP Design",
  /** El posicionamiento nuevo: estudio y, además, casa de productos. */
  concept: "Digital Studio & Products",
  tagline: "Web · Apps · E-commerce · SaaS",
  role: "Estudio digital",
  location: "Buenos Aires, Argentina",
  /** Ciudad y país por separado: así los pide el schema de Google. */
  city: "Buenos Aires",
  country: "AR",
  email: "vcpdesign@outlook.com.ar",
  phoneDisplay: "+54 9 11 5562-5597",
  /** El mismo teléfono en formato E.164, que es el que entiende Google. */
  phoneE164: "+5491155625597",
  founded: 2026,
} as const;

/**
 * Dominio del sitio. De acá salen la URL canónica, el sitemap y las etiquetas
 * Open Graph — o sea, la tarjeta que se ve cuando alguien comparte el link.
 *
 * Se resuelve en cascada para que nunca apunte a un dominio que no existe:
 *   1. `NEXT_PUBLIC_SITE_URL` — el dominio propio, cuando lo tengas.
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

/**
 * Perfiles oficiales de la marca.
 *
 * No es decorativo: es la lista `sameAs` del JSON-LD, o sea cómo Google
 * confirma que el sitio y el perfil son la misma entidad, y con eso arma el
 * panel de marca cuando alguien busca "VCP Design".
 *
 * Van sin parámetros de consulta y sólo perfiles que existan, estén activos y
 * sean de la marca. Las entradas vacías se descartan solas.
 */
export const socials = [
  {
    label: "Instagram",
    handle: "@vcp.design",
    url: "https://www.instagram.com/vcp.design/",
  },
] as const;

/** La lista plana que consume el JSON-LD. Sale de `socials`, no se duplica. */
export const socialProfiles: string[] = socials.map((profile) => profile.url);

/* ── Navegación ────────────────────────────────────────────────────────── */

/**
 * Navegación principal. Son rutas, no anclas: cada área del estudio tiene su
 * página propia y la home funciona como portada que las presenta.
 */
export const nav = [
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/ebooks", label: "Ebooks" },
  { href: "/estudio", label: "Sobre VCP" },
  { href: "/contacto", label: "Contacto" },
] as const;

/**
 * Secciones de la home, en orden de lectura.
 *
 * Alimentan dos cosas: el encabezado de página de cada sección y el riel de
 * progreso. El `label` es el que se imprime en la hairline a sangre, así que
 * es texto visible, no un identificador interno.
 */
export const homeSections = [
  { id: "enfoque", label: "Enfoque" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "proyectos", label: "Proyectos" },
  { id: "ebooks", label: "Recursos" },
  { id: "ecosistema", label: "Ecosistema" },
  { id: "estudio", label: "Estudio" },
  { id: "contacto", label: "Contacto" },
] as const;

/* ── Servicios ─────────────────────────────────────────────────────────── */

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  tags: string[];
  /**
   * Plazo típico. Opcional a propósito: sólo lo llevan los servicios de los
   * que ya hay obra entregada para respaldar el número. Mejor no mostrar nada
   * que inventar un plazo que después no se cumple.
   */
  span?: string;
};

export const services: Service[] = [
  {
    id: "landing-pages",
    index: "01",
    title: "Landing pages",
    summary:
      "Una sola página con un solo objetivo: presentar un producto, un servicio o una campaña, y que el visitante haga algo antes de irse.",
    tags: ["Diseño", "UX/UI", "Desarrollo", "Responsive"],
  },
  {
    id: "websites",
    index: "02",
    title: "Websites",
    summary:
      "Sitios web profesionales para empresas, profesionales y marcas. Cargan rápido, posicionan y se ven impecables en cualquier pantalla.",
    tags: ["Diseño", "Desarrollo", "SEO", "Performance"],
    span: "3–4 semanas",
  },
  {
    id: "ecommerce",
    index: "03",
    title: "E-commerce",
    summary:
      "Tiendas online preparadas para mostrar productos y vender: catálogo, carrito, medios de pago y un panel para manejarlo sin depender de nadie.",
    tags: ["Catálogo", "Checkout", "Pagos", "Gestión"],
  },
  {
    id: "apps",
    index: "04",
    title: "Apps",
    summary:
      "Aplicaciones web y móviles construidas alrededor de cómo trabaja el negocio, no al revés. Una base de código, las dos tiendas.",
    tags: ["iOS", "Android", "PWA", "Offline"],
    span: "4–6 semanas",
  },
  {
    id: "saas",
    index: "05",
    title: "SaaS",
    summary:
      "Plataformas digitales, sistemas de gestión y productos por suscripción: cuentas, permisos, cobros recurrentes y la infraestructura para crecer.",
    tags: ["Cuentas", "Roles", "Suscripciones", "API"],
    span: "4–6 semanas",
  },
  {
    id: "automatizaciones",
    index: "06",
    title: "Automatizaciones",
    summary:
      "Automatizamos lo repetitivo para que tu equipo deje de hacer a mano lo que puede hacerse solo, y para que los datos lleguen sin que nadie los copie.",
    tags: ["Integraciones", "Reportes", "Tareas programadas", "Avisos"],
    span: "2–4 semanas",
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
  /** Enlace público al producto. Sin él, la tarjeta no lleva a ningún lado. */
  url?: string;
  /**
   * `true` cuando el producto exige cuenta para entrar. Se avisa en la tarjeta:
   * mandar a alguien a una pantalla de login sin explicarle por qué se lee como
   * un enlace roto, no como un sistema en producción.
   */
  requiresAuth?: boolean;
  /** Texto del aviso de acceso, cuando el genérico no aplica. */
  authNote?: string;
  /** Entra en la selección de la home. El resto vive en /proyectos. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "aberturas-lujan",
    name: "Aberturas Luján",
    category: "E-commerce",
    year: "2026",
    summary:
      "Fábrica de aberturas de aluminio, con dominio propio y venta online. Catálogo por línea, carrito y pago con Mercado Pago, más pedido de cotización para lo que no entra en una medida estándar.",
    stack: ["Next.js", "Supabase", "Mercado Pago"],
    image: "/proyectos/aberturas-lujan.jpg",
    accent: "#9fb3c8",
    url: "https://aberturaslujan.com.ar",
    featured: true,
  },
  {
    id: "estudio-barrionuevo",
    name: "Estudio Barrionuevo",
    category: "Website",
    year: "2026",
    summary:
      "Piezas escultóricas para arquitectura e interiores. La referencia no fue una web de producto sino un catálogo de galería: la obra ocupa la pantalla completa y el texto se corre a un costado.",
    stack: ["Next.js", "Framer Motion", "Lenis"],
    image: "/proyectos/estudio-barrionuevo.jpg",
    accent: "#cbb185",
    url: "https://www.estudio-barrionuevo.com",
    featured: true,
  },
  {
    id: "kinetic",
    name: "KineTic",
    category: "SaaS",
    year: "2026",
    summary:
      "Consultorio digital para kinesiólogos. Pacientes, historia clínica, tratamientos, agenda y sesiones en un solo lugar: la sesión se carga desde la camilla y el informe en PDF para el médico sale solo.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "PWA"],
    image: "/proyectos/kinetic.png",
    accent: "#38bdf8",
    url: "https://kinetic-salud.vercel.app/dashboard",
    requiresAuth: true,
    authNote: "Requiere cuenta · prueba gratuita",
    featured: true,
  },
  {
    id: "jardincontrol",
    name: "JardinControl",
    category: "PWA · Sistema de gestión",
    year: "2026",
    summary:
      "Fichaje con código QR y DNI para las 20 empleadas de un jardín de infantes. La dirección ve en el momento quién llegó, quién falta y cómo viene el mes en horas y sueldos.",
    metric: { value: "-50%", label: "tiempo de administración" },
    stack: ["Next.js", "Supabase", "PWA"],
    image: "/proyectos/jardincontrol.png",
    accent: "#7c6cf0",
    url: "https://jardin-control.vercel.app",
    requiresAuth: true,
    featured: true,
  },
  {
    id: "profit",
    name: "ProFit",
    category: "PWA · Salud",
    year: "2026",
    summary:
      "Seguimiento de comidas, macros, peso y ayuno intermitente. Escribís o decís lo que comiste —«dos huevos, dos tostadas y una banana»— y la app reconoce los alimentos y calcula las calorías, sin buscar uno por uno en una planilla.",
    stack: ["Next.js", "Supabase", "IA"],
    image: "/proyectos/profit.png",
    accent: "#34d399",
    url: "https://profit-2026.vercel.app/inicio",
    requiresAuth: true,
    authNote: "Requiere cuenta · registro gratuito",
  },
];

/** La selección que se muestra en la home. El resto vive en /proyectos. */
export const featuredProjects = projects.filter((project) => project.featured);

/* ── Enfoque (prueba social) ───────────────────────────────────────────── */

/**
 * Sólo datos verificables. Nada de clientes, facturación, porcentajes ni
 * cantidad de usuarios: un número inventado se nota y cuesta más de lo que
 * suma.
 */
export const stats = [
  { value: String(projects.length).padStart(2, "0") + "+", label: "Proyectos entregados" },
  { value: "04", label: "Rubros distintos" },
  { value: "2026", label: "Año de fundación" },
  { value: "07d", label: "Al primer entregable" },
];

/** Las capacidades, como palabras sueltas. Se imprimen grandes. */
export const disciplines = ["Web", "Apps", "SaaS", "E-commerce"];

/* ── Stack ─────────────────────────────────────────────────────────────── */

/**
 * Corto a propósito. La tecnología tiene que demostrar capacidad, no ocupar el
 * centro de la página: una lista de treinta logos dice menos que siete bien
 * elegidos.
 */
export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "Tailwind CSS",
];

/* ── Proceso ───────────────────────────────────────────────────────────── */

export type Step = {
  n: string;
  title: string;
  body: string;
  span: string;
};

/** Acá sí se numera: el orden es información, no decoración. */
export const steps: Step[] = [
  {
    n: "01",
    title: "Descubrimiento",
    body: "Entendemos el negocio antes que el software: a quién le sirve, qué problema resuelve y cómo se va a medir que funcionó.",
    span: "3–4 días",
  },
  {
    n: "02",
    title: "Estrategia",
    body: "Definimos estructura, funcionalidades y experiencia. Sale un alcance escrito, con lo que entra y lo que queda para después.",
    span: "3–5 días",
  },
  {
    n: "03",
    title: "Diseño",
    body: "Arquitectura, flujos y prototipo navegable. Vas a poder recorrer el producto y pedir cambios antes de que se escriba una línea de código.",
    span: "1 semana",
  },
  {
    n: "04",
    title: "Desarrollo",
    body: "Entregas cada dos semanas en un entorno real. Ves avances concretos, probás, y ajustamos el rumbo sin esperar al final.",
    span: "3–6 semanas",
  },
  {
    n: "05",
    title: "Lanzamiento",
    body: "Publicación, monitoreo y correcciones. Después seguimos con mejoras mensuales o te entregamos todo documentado para tu equipo.",
    span: "Continuo",
  },
];

/* ── Estudio ───────────────────────────────────────────────────────────── */

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
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Llegamos con una idea escrita en papel y a la semana teníamos la app en el jardín. Lo que más valoro es que nos dijeron que no a tres funciones que no hacían falta y con la rapidez que trabajaron.",
    author: "Sandra C.",
    role: "Directora, Jardín MF",
  },
];

/* ── Contacto ──────────────────────────────────────────────────────────── */

export const budgets = ["Menos de $ 300.000", "Todavía no lo sé"];

export const projectTypes = [
  "Landing page",
  "Website",
  "E-commerce",
  "App",
  "SaaS",
  "Automatizaciones",
  "Otro",
];
