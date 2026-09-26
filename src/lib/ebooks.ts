/**
 * Productos digitales.
 *
 * La segunda unidad de negocio del estudio. El contenido vive separado de
 * `site.ts` porque tiene su propio ciclo: los servicios cambian una vez por
 * año, el catálogo cambia cada vez que sale un título.
 *
 * ⚠️ REVISAR ANTES DE PUBLICAR
 * `contents`, `includes`, `audience`, `outcomes` y `faq` del ebook disponible
 * están redactados a partir del título y la descripción del brief, no del PDF
 * real. Son un borrador con la forma correcta: hay que contrastarlos con el
 * archivo antes de cobrar por él. Prometer en la ficha un capítulo que el
 * ebook no tiene es la forma más rápida de que te pidan la devolución.
 */

import { whatsapp } from "./site";

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
  /** En dólares. Sin decimales: los precios redondos se leen más limpios. */
  price?: number;
  pages?: number;
  format?: string;
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
    slug: "tu-negocio-necesita-una-web",
    title: "¿Tu negocio necesita una página web?",
    excerpt:
      "Cuándo conviene tener una web, qué debería tener y cómo convertirla en una herramienta real.",
    description:
      "La guía para entender cuándo necesitás una web, qué debería tener y cómo convertirla en una herramienta real para tu negocio. Sin términos técnicos y sin vender humo: si tu caso no la necesita, también te lo va a decir.",
    category: "Negocios",
    status: "disponible",
    price: 3,
    pages: 10,
    format: "PDF",
    cover: {
      kicker: "Guía práctica · 01",
      lines: ["¿Tu negocio", "necesita una", "página web?"],
      tone: "#7c6cf0",
    },
    contents: [
      "Las tres preguntas antes de gastar un peso",
      "Web, landing o sólo Instagram: qué te conviene hoy",
      "Qué tiene que tener sí o sí, y qué es relleno",
      "Cuánto cuesta y por qué varía tanto",
      "Dominio, hosting y correo, explicado sin términos",
      "Cómo aparecer en Google sin pagar publicidad",
      "Los errores que hacen que una web no venda",
      "Qué pedirle a quien la construya",
      "Cómo saber si está funcionando",
      "Checklist final",
    ],
    includes: [
      "10 páginas en PDF, listas para leer en el teléfono",
      "Checklist para decidir si te conviene o no",
      "Guion de preguntas para pedir presupuestos",
      "Actualizaciones gratis de futuras ediciones",
    ],
    audience: [
      "Dueños de un negocio que hoy sólo venden por redes",
      "Profesionales que necesitan una presencia seria",
      "Emprendedores a punto de contratar su primera web",
      "Quien ya tiene una web y no sabe si le sirve",
    ],
    outcomes: [
      "Decidir con criterio si tu negocio necesita una web ahora o todavía no",
      "Reconocer qué presupuesto es razonable y cuál te están inflando",
      "Escribir un pedido claro para que te coticen lo mismo todos",
      "Medir si la web está trayendo consultas de verdad",
    ],
    faq: [
      {
        q: "¿Cómo lo recibo?",
        a: "Te llega el PDF por el mismo medio por el que lo comprás, apenas se confirma el pago.",
      },
      {
        q: "¿Sirve si no sé nada de tecnología?",
        a: "Está escrito justamente para eso. No hay términos técnicos sin explicar y no hace falta saber programar.",
      },
      {
        q: "¿Sirve si ya tengo una web?",
        a: "Sí. La última parte es un diagnóstico para revisar si la que tenés está cumpliendo alguna función.",
      },
      {
        q: "¿Es una guía para vender servicios de VCP Design?",
        a: "No. Es una guía para decidir, y una de las conclusiones posibles es que todavía no necesitás una web. Si después querés construirla, podemos hablar.",
      },
    ],
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
      kicker: "Guía práctica · 02",
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
      kicker: "Guía práctica · 03",
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
      kicker: "Guía práctica · 04",
      lines: ["Instagram", "+", "Web"],
      tone: "#d1495b",
    },
  },
];

export const featuredEbook = ebooks.find((book) => book.status === "disponible");

export const getEbook = (slug: string) => ebooks.find((book) => book.slug === slug);

/**
 * El botón de compra apunta a `/comprar/[slug]`, que arma el checkout de
 * Shopify en el momento (ver `lib/shopify.ts`).
 */
export const buyHref = (book: Ebook) => `/comprar/${book.slug}`;

/**
 * Compra por WhatsApp.
 *
 * El respaldo de `/comprar`: si Shopify no está configurado o falla, el pedido
 * sale por una conversación con el mensaje ya escrito. Es preferible a un
 * botón que termina en un error — para un producto de tres dólares, además,
 * el mensaje cierra la venta igual.
 */
export const whatsappBuyHref = (book: Ebook) =>
  `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
    `Hola, quiero comprar el ebook "${book.title}".`,
  )}`;

/** Los pasos de la compra, tal como van a funcionar una vez automatizada. */
export const checkoutFlow = [
  { step: "Producto", detail: "Elegís la guía" },
  { step: "Compra", detail: "Confirmás el pedido" },
  { step: "Pago", detail: "Tarjeta o Mercado Pago" },
  { step: "Descarga", detail: "El PDF, al instante" },
] as const;
