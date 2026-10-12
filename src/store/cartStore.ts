import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Một dòng sản phẩm trong giỏ hàng.
export interface CartItem {
  id: number;
  name: string;
  price: number; // Giá gốc (VNĐ)
  salePrice?: number; // Giá khuyến mãi (nếu có)
  image: string; // URL ảnh
  quantity: number; // Số lượng trong giỏ
}

// Trạng thái + hành động của giỏ hàng toàn cục.
interface CartState {
  // State
  items: CartItem[];
  isOpen: boolean; // Điều khiển mở/đóng sidebar

  // Actions
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed / Selectors
  totalItems: () => number;
  totalPrice: () => number;
}

// Store giỏ hàng: lưu items vào localStorage, sidebar luôn đóng khi reload.
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Thêm sản phẩm: có rồi thì tăng số lượng, chưa có thì thêm mới.
      // Sau khi thêm luôn mở sidebar để người dùng thấy giỏ hàng.
      addToCart: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                : item,
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            isOpen: true,
          });
        }
      },

      // Xóa hẳn một dòng sản phẩm khỏi giỏ.
      removeFromCart: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      // Đổi số lượng: <= 0 thì xóa dòng, tối đa 99.
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: Math.min(quantity, 99) } : item,
          ),
        });
      },

      // Xóa sạch giỏ hàng.
      clearCart: () => set({ items: [] }),

      // Mở / đóng sidebar giỏ hàng.
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Tổng số sản phẩm (cộng dồn quantity).
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      // Tổng tiền: ưu tiên giá khuyến mãi nếu có.
      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
          0,
        ),
    }),
    {
      name: "thanh-nhu-cart", // Key trong localStorage
      partialize: (state) => ({
        items: state.items,
        // KHÔNG persist isOpen — sidebar luôn đóng khi reload trang.
      }),
    },
  ),
);

// Hook chống flash badge: chỉ trả về true sau khi persist đã nạp xong localStorage.
// Header dùng hook này để ẩn badge cho tới khi số lượng đã chính xác.
export const useCartHydration = (): boolean => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Lắng nghe sự kiện rehydrate xong của Zustand persist.
    const unsub = useCartStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    // Trường hợp đã hydrate rồi (ví dụ điều hướng client-side).
    if (useCartStore.persist.hasHydrated()) {
      setHydrated(true);
    }

    return () => {
      unsub();
    };
  }, []);

  return hydrated;
};