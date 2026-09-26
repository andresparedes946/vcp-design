import { checkoutFlow } from "@/lib/ebooks";
import { shopifyEnabled } from "@/lib/shopify";

/**
 * Flujo de compra.
 *
 * El recorrido completo, dibujado antes de estar automatizado: producto,
 * compra, pago y descarga. Mostrarlo cumple dos funciones — le dice al
 * comprador qué va a pasar después de apretar el botón, que es la duda que
 * frena la mayoría de las compras chicas, y deja la estructura lista para
 * cuando se conecte la pasarela de verdad.
 *
 * La nota del pie no es un descargo legal: es la diferencia entre un
 * comprador que sabe que le va a llegar un mensaje y uno que cree que el sitio
 * se rompió.
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
        {shopifyEnabled
          ? "El pago se procesa en el checkout seguro de Shopify y el PDF te llega por email."
          : "Hoy los pasos 02 y 03 se resuelven por WhatsApp. El pago automático con tarjeta y Mercado Pago está en camino."}
      </p>
    </div>
  );
}
