"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { products, type Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";

// Font chữ riêng của section (scoped theo className nên không ảnh hưởng các section khác).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

// Tính % giảm giá từ giá gốc và giá sale, làm tròn số nguyên.
const calculateDiscount = (price: number, salePrice: number): number => {
  return Math.round(((price - salePrice) / price) * 100);
};

// Hook đọc media query "(hover: hover) and (pointer: fine)" — chỉ bật 3D tilt
// trên thiết bị chuột/bàn phím, tự tắt trên mobile cảm ứng.
function useFinePointer(): boolean {
  // subscribe/đọc trạng thái matchMedia; dùng cùng một hàm để server/client khớp (luôn false lúc SSR).
  const subscribe = (onChange: () => void) => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  };
  const getSnapshot = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  // getServerSnapshot: giả định không có hover ở server để render khớp với client hydration.
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

// Style + nhãn của từng loại badge.
const badgeStyles: Record<NonNullable<Product["badge"]>, { classes: string; label: (p: Product) => string }> = {
  bestseller: { classes: "bg-[#b08d57] text-white", label: () => "Bán chạy" },
  new: { classes: "bg-stone-900 text-white", label: () => "Mới" },
  sale: {
    classes: "bg-red-600 text-white",
    label: (p) =>
      p.salePrice ? `Giảm ${calculateDiscount(p.price, p.salePrice)}%` : "Khuyến mãi",
  },
};

// Thẻ sản phẩm: ảnh 3D tilt + badge + quick actions + thông tin + giá.
function ProductCard({ product, eager }: { product: Product; eager: boolean }) {
  // Ref của khung ảnh để tính tâm xoay 3D tilt.
  const imageRef = useRef<HTMLDivElement>(null);
  // Chỉ bật tilt khi thiết bị có hover chính xác (tắt trên mobile cảm ứng).
  const tiltEnabled = useFinePointer();

  // Kết nối giỏ hàng toàn cục (Zustand).
  const addToCart = useCartStore((state) => state.addToCart);
  // Flag phản hồi thị giác sau khi bấm \"Thêm vào giỏ\".
  const [isAdded, setIsAdded] = useState(false);

  // Bấm nút -> ghi vào store + hiện \"Đã thêm\" 1.5s.
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
    });
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1500);
  };

  // Góc xoay thô từ vị trí chuột, dùng motion value để không gây re-render.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  // Làm mượt góc xoay bằng spring vật lý.
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  // Tính góc xoay tối đa ±5 độ dựa trên vị trí chuột so với tâm ảnh.
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled || !imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const mouseX = e.clientX - (rect.left + rect.width / 2);
    const mouseY = e.clientY - (rect.top + rect.height / 2);
    rotateX.set((mouseY / (rect.height / 2)) * -5);
    rotateY.set((mouseX / (rect.width / 2)) * 5);
  };

  // Trả ảnh về phẳng khi chuột rời khỏi.
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const badge = product.badge ? badgeStyles[product.badge] : null;

  return (
    <article
      data-product-card
      className="group w-[240px] flex-shrink-0 sm:w-[260px] lg:w-[300px]"
    >
      {/* Khung ảnh: tilt 3D + zoom nhẹ khi hover. */}
      <motion.div
        ref={imageRef}
        className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-stone-100"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 800,
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 260px, 300px"
        />

        {/* Badge góc trên trái, pulse chậm 3s. */}
        {badge && (
          <span
            aria-label={`Nhãn: ${badge.label(product)}`}
            className={`animate-subtle-pulse absolute left-3 top-3 rounded-sm px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${badge.classes}`}
          >
            {badge.label(product)}
          </span>
        )}

        {/* Quick actions: hiện khi hover (desktop) hoặc focus (bàn phím). */}
        <div className="absolute bottom-3 left-3 right-3 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 focus-within:translate-y-0 focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            aria-label={`Thêm ${product.name} vào giỏ hàng`}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn click xuyên qua card (nếu card có link bọc ngoài).
              handleAddToCart();
            }}
            disabled={isAdded}
            className={`flex-1 rounded py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 ${
              isAdded
                ? "cursor-default bg-green-600/95 text-white"
                : "bg-white/95 text-stone-900 hover:bg-[#b08d57] hover:text-white"
            }`}
          >
            {isAdded ? "Đã thêm ✓" : "Thêm vào giỏ"}
          </button>
          <button
            type="button"
            aria-label={`Thêm ${product.name} vào danh sách yêu thích`}
            className="flex w-10 items-center justify-center rounded bg-white/95 text-stone-900 backdrop-blur-sm transition-colors duration-300 hover:bg-[#b08d57] hover:text-white"
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* Thông tin sản phẩm. */}
      <div className="px-1">
        <p className="mb-1 text-[11px] font-medium uppercase tracking-[2px] text-[#b08d57]">
          {product.category}
        </p>
        <h3 className="mb-2 text-lg font-semibold leading-tight text-stone-900 transition-colors duration-300 group-hover:text-[#b08d57]">
          <span className={cormorant.className}>{product.name}</span>
        </h3>

        {/* Đánh giá sao + số lượt review. */}
        <div className="mb-2 flex items-center gap-1.5">
          <div
            className="flex gap-0.5"
            role="img"
            aria-label={`Đánh giá ${product.rating} trên 5 sao`}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                aria-hidden="true"
                className={`h-3.5 w-3.5 ${star <= Math.floor(product.rating) ? "text-[#b08d57]" : "text-stone-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-stone-500">({product.reviewCount})</span>
        </div>

        {/* Giá: giá sale + giá gốc gạch ngang, hoặc giá thường. */}
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-lg font-semibold text-stone-900">
                {formatPrice(product.salePrice)}
              </span>
              <span className="text-sm text-stone-400 line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-stone-900">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProducts() {
  // Ref của khung nhìn carousel (overflow-hidden) để đo giới hạn kéo.
  const viewportRef = useRef<HTMLDivElement>(null);
  // Vị trí X hiện tại của track (motion value, không gây re-render khi kéo).
  const x = useMotionValue(0);
  // Giới hạn kéo trái (số âm): -(scrollWidth - clientWidth).
  const [minX, setMinX] = useState(0);
  // Trạng thái nút điều hướng (mờ đi khi đã ở đầu/cuối dải).
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Cập nhật trạng thái nút theo vị trí kéo hiện tại.
  const syncNavState = (value: number, min: number) => {
    setCanPrev(value < -4);
    setCanNext(value > min + 4);
  };

  // Đo lại giới hạn kéo khi mount + resize (responsive đổi card width).
  useEffect(() => {
    const measure = () => {
      const el = viewportRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const nextMin = max > 0 ? -max : 0;
      setMinX(nextMin);
      // Kẹp vị trí hiện tại vào giới hạn mới khi thu/phóng màn hình.
      const clamped = Math.min(0, Math.max(nextMin, x.get()));
      x.set(clamped);
      syncNavState(clamped, nextMin);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  // Theo dõi vị trí kéo để bật/tắt nút điều hướng kịp thời.
  useMotionValueEvent(x, "change", (value) => syncNavState(value, minX));

  // Điều khiển carousel bằng nút bấm: trượt 1 khoảng bằng 2 card + gap.
  const slide = (direction: "prev" | "next") => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector("[data-product-card]") as HTMLElement | null;
    const cardWidth = card?.offsetWidth ?? 300;
    // Gap khớp với class gap của track: 12 / 16 / 24px.
    const gap =
      window.innerWidth >= 1024 ? 24 : window.innerWidth >= 640 ? 16 : 12;
    const step = cardWidth * 2 + gap * 2;
    const max = el.scrollWidth - el.clientWidth;
    const min = max > 0 ? -max : 0;
    const target =
      direction === "next"
        ? Math.max(min, x.get() - step)
        : Math.min(0, x.get() + step);
    animate(x, target, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    // Nền trắng để tạo contrast với section Danh mục (nền kem) phía trên.
    <motion.section
      role="region"
      aria-label="Sản phẩm nổi bật"
      className="overflow-hidden bg-white py-20 lg:py-28"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Tiêu đề + nút điều hướng: flex 2 đầu, canh đáy. */}
      <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p
            className={`${inter.className} text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]`}
          >
            Best sellers
          </p>
          <h2
            className={`${cormorant.className} mt-2 text-3xl font-semibold leading-tight text-stone-900 sm:text-4xl lg:text-[42px]`}
          >
            Sản Phẩm Nổi Bật
          </h2>
          {/* Đường kẻ trang trí */}
          <div aria-hidden="true" className="mt-3 h-[2px] w-[60px] bg-[#b08d57]" />
        </div>

        {/* Nút mũi tên: chỉ hiện từ tablet ngang trở lên. */}
        <div className="hidden gap-3 md:flex">
          <button
            type="button"
            onClick={() => slide("prev")}
            disabled={!canPrev}
            aria-label="Xem các sản phẩm trước đó"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors duration-300 hover:border-[#b08d57] hover:bg-[#b08d57] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-stone-300 disabled:hover:bg-transparent disabled:hover:text-stone-700"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => slide("next")}
            disabled={!canNext}
            aria-label="Xem các sản phẩm tiếp theo"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition-colors duration-300 hover:border-[#b08d57] hover:bg-[#b08d57] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-stone-300 disabled:hover:bg-transparent disabled:hover:text-stone-700"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Khung nhìn carousel: tràn full-width để card cuối "ló" ra ngoài, gợi ý kéo. */}
      <div
        ref={viewportRef}
        className="cursor-grab overflow-hidden active:cursor-grabbing"
      >
        {/* Track kéo ngang: padding-left căn với container, padding-right nhỏ để lộ card kế tiếp. */}
        <motion.div
          className="flex w-max gap-3 pb-1 pl-4 pr-4 sm:gap-4 sm:pl-6 sm:pr-6 lg:gap-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-8"
          drag="x"
          style={{ x }}
          dragConstraints={{ left: minX, right: 0 }}
          dragElastic={0.1}
          dragTransition={{
            bounceStiffness: 300,
            bounceDamping: 30,
            power: 0.3,
            timeConstant: 200,
          }}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} eager={index < 2} />
          ))}
        </motion.div>
      </div>

      {/* Link xem tất cả: căn giữa, mũi tên trượt phải khi hover. */}
      <div className="mx-auto mt-8 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <Link
          href="/san-pham"
          className={`${inter.className} group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[2px] text-[#b08d57] transition-colors duration-300 hover:text-stone-900`}
        >
          Xem tất cả sản phẩm
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </motion.section>
  );
}