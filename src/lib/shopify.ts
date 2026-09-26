/**
 * Shopify como caja registradora.
 *
 * La tienda sigue siendo este sitio: el catálogo, las fichas y los precios que
 * se muestran salen de `ebooks.ts`. Shopify sólo cobra y entrega el PDF. Por
 * eso no hay un catálogo sincronizado ni un carrito propio — para una guía de
 * pocos dólares, el botón arma un carrito de un solo producto y manda directo
 * al checkout.
 *
 * El producto se busca por handle, que tiene que ser igual al `slug` del ebook
 * (en Shopify: Producto > Buscadores > Identificador de URL). El precio que
 * cobra Shopify es el que está cargado allá: cambiarlo en `ebooks.ts` no lo
 * cambia en el checkout, hay que tocar los dos.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-07";

export const shopifyEnabled = Boolean(domain && token);

async function storefront<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Shopify respondió ${res.status}`);

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data as T;
}

/** Devuelve la URL del checkout de Shopify para ese ebook, o null si no se puede vender. */
export async function checkoutUrlFor(handle: string): Promise<string | null> {
  if (!shopifyEnabled) return null;

  const { product } = await storefront<{
    product: { variants: { nodes: { id: string; availableForSale: boolean }[] } } | null;
  }>(
    `query Product($handle: String!) {
      product(handle: $handle) {
        variants(first: 1) { nodes { id availableForSale } }
      }
    }`,
    { handle },
  );

  const variant = product?.variants.nodes[0];
  if (!variant?.availableForSale) return null;

  const { cartCreate } = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation Cart($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }`,
    { lines: [{ merchandiseId: variant.id, quantity: 1 }] },
  );

  if (cartCreate.userErrors.length) {
    throw new Error(cartCreate.userErrors.map((e) => e.message).join("; "));
  }

  return cartCreate.cart?.checkoutUrl ?? null;
}
