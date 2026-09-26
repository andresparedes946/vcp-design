import { NextResponse } from "next/server";
import { getEbook, whatsappBuyHref } from "@/lib/ebooks";
import { checkoutUrlFor } from "@/lib/shopify";

/**
 * El botón "Comprar".
 *
 * Crea el carrito en Shopify en el momento del clic y redirige al checkout. Si
 * Shopify no está configurado, el producto no existe allá o la API falla, cae
 * a WhatsApp con el pedido escrito: un botón de compra que termina en un error
 * es una venta perdida, y el mensaje la sigue cerrando a mano.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const book = getEbook(slug);

  if (!book || book.status !== "disponible") {
    return NextResponse.redirect(new URL("/ebooks", request.url), 303);
  }

  try {
    const checkoutUrl = await checkoutUrlFor(book.slug);
    if (checkoutUrl) return NextResponse.redirect(checkoutUrl, 303);
  } catch (error) {
    console.error(`[comprar/${slug}] Shopify:`, error);
  }

  return NextResponse.redirect(whatsappBuyHref(book), 303);
}
