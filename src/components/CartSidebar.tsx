"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";

// Font chữ riêng của sidebar (scoped theo className, không ảnh hưởng section khác).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

export default function CartSidebar() {
  const isOpen = useCartStore((state) => state.isOpen);
  const items = useCartStore((state) => state.items);
  const closeCart = useCartStore((state) => state.closeCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = useCartStore((state) => state.totalPrice);

  // Ref để focus trap: giữ focus trong sidebar khi mở.
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Khóa cuộn body khi sidebar mở.
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Focus vào nút đóng ngay khi mở để hỗ trợ điều hướng bàn phím.
      requestAnimationFrame(() => closeButtonRef.current?.focus());
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  // Bắt phím Escape để đóng sidebar.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
      // Focus trap tối thiểu: Tab vòng trong sidebar.
      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay tối phía sau sidebar: click để đóng. */}
          <motion.div
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
          />

          {/* Sidebar trượt từ bên phải. */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Giỏ hàng"
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl sm:w-[420px]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header sidebar: tiêu đề + nút đóng. */}
            <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
              <h2
                className={`${cormorant.className} text-xl font-semibold text-stone-900`}
              >
                Giỏ Hàng
                <span
                  className={`${inter.className} ml-2 text-sm font-normal text-stone-400`}
                >
                  ({totalItems} sản phẩm)
                </span>
              </h2>
              <button
                ref={closeButtonRef}
                onClick={closeCart}
                aria-label="Đóng giỏ hàng"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-stone-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Vùng danh sách sản phẩm: cuộn dọc ở giữa. */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                // Trạng thái giỏ trống.
                <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                  <svg
                    aria-hidden="true"
                    className="mb-4 h-16 w-16 text-stone-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <p
                    className={`${cormorant.className} mb-2 text-xl text-stone-900`}
                  >
                    Giỏ hàng đang trống
                  </p>
                  <p
                    className={`${inter.className} mb-6 text-sm text-stone-400`}
                  >
                    Hãy khám phá các sản phẩm nội thất tuyệt vời của chúng tôi
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className={`${inter.className} rounded bg-[#b08d57] px-6 py-2.5 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#c9a66b]`}
                  >
                    Tiếp Tục Mua Sắm
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  <ul className="divide-y divide-stone-100">
                    {items.map((item) => (
                      <motion.li
                        key={item.id}
                        className="flex gap-4 py-4"
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Ảnh sản phẩm. */}
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Thông tin + điều khiển số lượng. */}
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate pr-2 text-sm font-medium leading-tight text-stone-900">
                            {item.name}
                          </h3>

                          {/* Giá (ưu tiên giá khuyến mãi). */}
                          <div className="mt-1">
                            {item.salePrice ? (
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-stone-900">
                                  {formatPrice(item.salePrice)}
                                </span>
                                <span className="text-xs text-stone-400 line-through">
                                  {formatPrice(item.price)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-semibold text-stone-900">
                                {formatPrice(item.price)}
                              </span>
                            )}
                          </div>

                          {/* Nút - / + và xóa. */}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center rounded border border-stone-200">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="Giảm số lượng"
                                className="flex h-7 w-7 items-center justify-center text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900"
                              >
                                −
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-stone-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="Tăng số lượng"
                                className="flex h-7 w-7 items-center justify-center text-sm text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                              className="p-1 text-stone-400 transition-colors hover:text-red-500"
                            >
                              <svg
                                aria-hidden="true"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </AnimatePresence>
              )}
            </div>

            {/* Footer sidebar: tạm tính + nút thanh toán (chỉ hiện khi có sản phẩm). */}
            {items.length > 0 && (
              <div className="border-t border-stone-200 bg-white px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`${inter.className} text-sm text-stone-500`}
                  >
                    Tạm tính
                  </span>
                  <span
                    className={`${cormorant.className} text-lg font-semibold text-stone-900`}
                  >
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <p className={`${inter.className} mb-4 text-xs text-stone-400`}>
                  Phí vận chuyển sẽ được tính khi thanh toán
                </p>
                <Link
                  href="/thanh-toan"
                  className={`${inter.className} block w-full rounded bg-[#b08d57] py-3.5 text-center text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#c9a66b]`}
                >
                  Tiến Hành Thanh Toán
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className={`${inter.className} mt-2 block w-full py-2.5 text-center text-sm text-stone-500 transition-colors hover:text-[#b08d57]`}
                >
                  ← Tiếp tục mua sắm
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}