import { checkoutFlow } from "@/lib/ebooks";

/**
 * Flujo de compra.
 *
 * El recorrido completo: producto, compra, pago y descarga. Le dice al
 * comprador qué va a pasar después de apretar el botón, que es la duda que
 * frena la mayoría de las compras chicas.
 *
 * La nota del pie anticipa el salto de dominio: el botón lleva a
 * tienda.vcp-design.com.ar, y quien sabe que va a pasar por ahí no cree que lo
 * mandaron a otro sitio.
 */
export function CheckoutFlow() {
  return (
    <div>
      <ol className="grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
        {checkoutFlow.map((stage, i) => (
          <li key={stage.step} className="bg-void p-6">
            <span className="t-mono text-[0.72rem] text-peri">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="t-title mt-4 text-[1.05rem] text-chrome">{stage.step}</h3>
            <p className="t-body mt-1.5 text-[0.85rem] text-muted">{stage.detail}</p>
          </li>
        ))}
      </ol>

      <p className="t-mono mt-4 text-[0.75rem] text-faint">
        El pago se procesa en tienda.vcp-design.com.ar, el checkout seguro de Shopify, y el PDF
        te llega por email apenas se confirma.
      </p>
    </div>
  );
}
