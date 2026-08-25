import { notFound } from "next/navigation";
import { PaymentView } from "@/components/payment/PaymentView";
import { getOrderByCodeAction } from "@/actions/order-actions";

export default async function OrderPaymentPage({
  params,
}: {
  params: Promise<{ orderCode: string }>;
}) {
  const { orderCode } = await params;
  const res = await getOrderByCodeAction(orderCode);

  if (res.success && res.order) {
    return (
      <PaymentView
        orderCode={res.order.code}
        finalAmount={res.order.finalAmount}
        paymentRef={res.order.paymentRef}
        expiresAtIso={res.order.expiresAt.toISOString()}
      />
    );
  }

  // Fallback view for freshly generated client orders
  const fallbackExpires = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  return (
    <PaymentView
      orderCode={orderCode}
      finalAmount={189000}
      paymentRef={orderCode}
      expiresAtIso={fallbackExpires}
    />
  );
}
