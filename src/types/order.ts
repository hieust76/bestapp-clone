export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentMethod = "SEPAY_QR" | "MOMO" | "WALLET" | "MANUAL";

export interface OrderItemData {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  deliveryStatus: "PENDING" | "DELIVERED" | "FAILED";
  deliveryData?: string | null;
}

export interface OrderData {
  id: string;
  orderCode: string;
  userId?: string | null;
  customerEmail: string;
  customerPhone?: string | null;
  customerName?: string | null;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentRef: string;
  paidAt?: Date | string | null;
  couponCode?: string | null;
  notes?: string | null;
  items: OrderItemData[];
  createdAt: Date | string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  price: number;
  originalPrice: number;
  coverImage: string;
  quantity: number;
  deliveryType: string;
}
