/**
 * Productos digitales.
 *
 * La segunda unidad de negocio del estudio. El contenido vive separado de
 * `site.ts` porque tiene su propio ciclo: los servicios cambian una vez por
 * año, el catálogo cambia cada vez que sale un título.
 *
 * La vidriera es este sitio; la caja es la tienda de Shopify
 * (tienda.vcp-design.com.ar), que cobra y manda el PDF. Para sumar un título
 * a la venta: se crea el producto en Shopify, se copia acá el ID de la
 * variante (Shopify > Producto > la variante, el número al final de la URL) y
 * se pone `status: "disponible"`. El precio se carga en los dos lados: el de
 * acá se muestra, el de Shopify es el que se cobra.
 */

export type EbookStatus = "disponible" | "proximamente";

export type Ebook = {
  slug: string;
  title: string;
  /** Una línea para las tarjetas del catálogo. */
  excerpt: string;
  /** El párrafo de la ficha. */
  description: string;
  category: EbookCategory;
  status: EbookStatus;
  /** Sin decimales: los precios redondos se leen más limpios. */
  price?: number;
  currency?: "ARS" | "USD";
  pages?: number;
  format?: string;
  /** El producto en Shopify. Sin esto, el título no se puede comprar. */
  shopify?: {
    handle: string;
    variantId: string;
  };
  /** Portada tipográfica. No hay imagen: se compone en CSS. */
  cover: {
    kicker: string;
    /** El título partido en líneas, para controlar el quiebre en la tapa. */
    lines: string[];
    /** Color de la tapa. Uno por título, para que el catálogo se distinga. */
    tone: string;
  };
  contents?: string[];
  includes?: string[];
  audience?: string[];
  outcomes?: string[];
  faq?: { q: string; a: string }[];
};

export const storeUrl = "https://tienda.vcp-design.com.ar";

export const ebookCategories = [
  "Todos",
  "Negocios",
  "IA",
  "Marketing",
  "Web",
  "Emprendimiento",
] as const;

export type EbookCategory = Exclude<(typeof ebookCategories)[number], "Todos">;

export const ebooks: Ebook[] = [
  {
    slug: "de-la-idea-a-una-web-profesional-con-ia",
    title: "De la idea a una web profesional con IA",
    excerpt:
      "6 etapas. 25 capítulos. 1 método para crear webs profesionales con IA.",
    description:
      "El Método VCP para pasar de una idea suelta a una web diseñada, construida, optimizada y publicada. No es una colección de trucos: es el proceso que usamos en VCP Design, ordenado en pasos que podés seguir aunque sea tu primer proyecto.",
    category: "Web",
    status: "disponible",
    price: 17999,
    currency: "ARS",
    pages: 69,
    format: "PDF",
    shopify: {
      handle: "de-la-idea-a-una-web-profesional-con-ia",
      variantId: "50567872806991",
    },
    cover: {
      kicker: "Método VCP · 2026",
      lines: ["De la idea", "a una web", "profesional", "con IA"],
      tone: "#7c6cf0",
    },
    contents: [
      "El Método VCP en una página",
      "La pregunta correcta antes de crear una web",
      "Qué tipo de web necesita tu negocio",
      "La anatomía de una web profesional",
      "Cómo encontrar referencias visuales",
      "Cómo definir la dirección visual",
      "Claude como director creativo y desarrollador",
      "Cómo escribir prompts realmente útiles",
      "Construir la web por fases",
      "Crear un Hero que comunique",
      "Diseñar las secciones principales",
      "Crear contenido visual con IA",
      "Higgsfield: imágenes, videos y contenido visual",
      "Cómo evitar que una web parezca hecha por IA",
      "Responsive design",
      "Microinteracciones y animaciones",
      "SEO básico",
      "Performance",
      "Testing",
      "GitHub + Vercel + dominio",
      "Checklist antes de publicar",
      "Caso real: proyectos de VCP Design",
      "Tu primer proyecto en 7 días",
      "10 prompts esenciales",
      "Recursos y herramientas",
      "Próximos pasos: mantener tu web",
    ],
    includes: [
      "69 páginas en PDF",
      "25 capítulos ordenados en las 6 etapas del método: Define, Discover, Design, Build, Refine y Launch",
      "5 bonus: 25 prompts para webs, checklist de lanzamiento, Master Prompt VCP, plantilla de brief y 50 ideas de secciones",
      "Una acción concreta y una checklist al final de cada capítulo",
    ],
    audience: [
      "Emprendedores que quieren su primera web sin empezar por el código",
      "Profesionales que quieren una presencia seria y saber qué pedir",
      "Quien ya probó crear una web con IA y el resultado se ve genérico",
      "Diseñadores y desarrolladores que quieren un proceso ordenado para trabajar con Claude",
    ],
    outcomes: [
      "Elegir el tipo de web que tu negocio necesita, y descartar el que no",
      "Escribir un brief claro en una página y diseñar la estructura antes de tocar código",
      "Usar Claude como director creativo y como desarrollador, con prompts que tienen contexto y criterio",
      "Corregir lo que delata una web “hecha por IA” y dejarla responsive, rápida y con SEO básico",
      "Publicarla con GitHub, Vercel y dominio propio, y mantenerla profesional después del lanzamiento",
    ],
    faq: [
      {
        q: "¿Cómo lo recibo?",
        a: "Pagás en la tienda de VCP Design y, apenas se confirma el pago, te llega un email con el enlace para descargar el PDF.",
      },
      {
        q: "¿Necesito saber programar?",
        a: "No. El método está pensado para que puedas seguirlo aunque sea tu primer proyecto: la IA escribe el código y vos tomás las decisiones de qué construir.",
      },
      {
        q: "¿Qué herramientas usa?",
        a: "Claude para la estrategia, el diseño y el código; Higgsfield para imágenes y video; GitHub, Vercel y un dominio propio para publicar.",
      },
      {
        q: "¿Promete una web perfecta en minutos?",
        a: "No. La IA no garantiza ventas ni hace todo sola. Lo que sí hace es acortar muchísimo el camino entre tener una idea y tener algo real para mostrar, y el método te dice en qué orden hacer cada cosa.",
      },
    ],
  },
  {
    slug: "tu-negocio-necesita-una-web",
    title: "¿Tu negocio necesita una página web?",
    excerpt:
      "Cuándo conviene tener una web, qué debería tener y cómo convertirla en una herramienta real.",
    description:
      "La guía para entender cuándo necesitás una web, qué debería tener y cómo convertirla en una herramienta real para tu negocio. Sin términos técnicos y sin vender humo: si tu caso no la necesita, también te lo va a decir.",
    category: "Negocios",
    status: "proximamente",
    cover: {
      kicker: "Guía práctica · 02",
      lines: ["¿Tu negocio", "necesita una", "página web?"],
      tone: "#2bb39a",
    },
  },
  {
    slug: "ia-para-emprendedores",
    title: "IA para emprendedores",
    excerpt:
      "Qué tareas de tu negocio conviene delegarle a la inteligencia artificial, y cuáles no.",
    description:
      "Qué tareas de tu negocio conviene delegarle hoy a la inteligencia artificial, con qué herramientas y dónde sigue siendo más barato hacerlo a mano.",
    category: "IA",
    status: "proximamente",
    cover: {
      kicker: "Guía práctica · 03",
      lines: ["IA para", "emprendedores"],
      tone: "#4b7bec",
    },
  },
  {
    slug: "del-local-al-mundo-digital",
    title: "Cómo llevar tu negocio al mundo digital",
    excerpt:
      "El orden en que conviene digitalizar un negocio que hoy funciona de forma presencial.",
    description:
      "El orden en que conviene digitalizar un negocio que hoy funciona de manera presencial, sin frenar lo que ya está andando.",
    category: "Emprendimiento",
    status: "proximamente",
    cover: {
      kicker: "Guía práctica · 04",
      lines: ["Del local", "al mundo", "digital"],
      tone: "#c9a227",
    },
  },
  {
    slug: "instagram-mas-web",
    title: "Instagram + Web",
    excerpt:
      "Cómo se reparten el trabajo la red social y el sitio propio, en lugar de competir.",
    description:
      "Cómo hacer que Instagram y tu sitio trabajen juntos: qué tiene que pasar en cada uno y por dónde se pierden las consultas.",
    category: "Marketing",
    status: "proximamente",
    cover: {
      kicker: "Guía práctica · 05",
      lines: ["Instagram", "+", "Web"],
      tone: "#d1495b",
    },
  },
];

export const featuredEbook = ebooks.find((book) => book.status === "disponible");

export const getEbook = (slug: string) => ebooks.find((book) => book.slug === slug);

/** "$ 17.999" en pesos, "US$ 3" en dólares. */
export const formatPrice = (book: Ebook) =>
  book.price === undefined
    ? ""
    : `${book.currency === "USD" ? "US$" : "$"} ${book.price.toLocaleString("es-AR")}`;

/**
 * El botón de compra.
 *
 * Es un enlace de carrito de Shopify: agrega la guía y abre el checkout
 * directo, sin pasar por la página del producto. Para una compra de un solo
 * ítem, cada pantalla intermedia es un lugar donde se abandona.
 */
export const buyHref = (book: Ebook) =>
  book.shopify ? `${storeUrl}/cart/${book.shopify.variantId}:1` : storeUrl;

/** Los pasos de la compra. */
export const checkoutFlow = [
  { step: "Producto", detail: "Elegís la guía" },
  { step: "Compra", detail: "Confirmás el pedido" },
  { step: "Pago", detail: "En el checkout seguro de Shopify" },
  { step: "Descarga", detail: "El PDF, por email" },
] as const;
