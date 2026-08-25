import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemState {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  price: number;
  originalPrice: number;
  coverImage: string;
  quantity: number;
  deliveryType: string;
  durationDays?: number | null;
  upgradeEmail?: string; // Email nâng cấp (nếu là UPGRADE)
}

interface CartStore {
  items: CartItemState[];
  couponCode: string | null;
  discountAmount: number;
  
  addItem: (item: CartItemState) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  setUpgradeEmail: (variantId: string, email: string) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountAmount: 0,

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.variantId === newItem.variantId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            if (newItem.upgradeEmail) {
              updated[existingIndex].upgradeEmail = newItem.upgradeEmail;
            }
            return { items: updated };
          }

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        }));
      },

      setUpgradeEmail: (variantId, email) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, upgradeEmail: email } : item
          ),
        }));
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, discountAmount: discount });
      },

      removeCoupon: () => {
        set({ couponCode: null, discountAmount: 0 });
      },

      clearCart: () => {
        set({ items: [], couponCode: null, discountAmount: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const total = subtotal - get().discountAmount;
        return total > 0 ? total : 0;
      },
    }),
    {
      name: "bestapp-cart-storage",
    }
  )
);
