"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { categories, products, type Product } from "@/data/products";
import { formatPrice } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";

// Giữ kiểu card lưới của trang sản phẩm; card tại /san-pham hiện không được export.
function ProductGridCard({ product }: { product: Product }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/san-pham/${product.slug}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter") router.push(`/san-pham/${product.slug}`);
      }}
      className="group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57]"
      aria-label={`Xem ${product.name}`}
    >
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-xl bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${product.badge === "bestseller" ? "bg-[#b08d57]" : product.badge === "sale" ? "bg-red-600" : "bg-stone-900"} text-white`}>
            {product.badge === "bestseller" ? "Bán chạy" : product.badge === "sale" ? "Giảm giá" : "Mới"}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="rounded-sm bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">Hết hàng</span>
          </div>
        )}
        <button
          type="button"
          disabled={!product.inStock}
          onClick={(event) => {
            event.stopPropagation();
            addToCart({ id: product.id, name: product.name, price: product.price, salePrice: product.salePrice, image: product.image });
          }}
          className="absolute bottom-3 left-3 right-3 hidden rounded-lg bg-white/95 py-2.5 text-xs font-medium text-stone-900 opacity-0 transition-all hover:bg-[#b08d57] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:block sm:group-hover:opacity-100"
        >
          {product.inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
      </div>
      <p className="mb-1 text-xs text-stone-400">{product.category}</p>
      <h2 className="mb-2 line-clamp-2 text-sm font-medium text-stone-900 sm:text-base">{product.name}</h2>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-base font-semibold text-stone-900">{formatPrice(product.salePrice ?? product.price)}</span>
        {product.salePrice && <span className="text-xs text-stone-400 line-through">{formatPrice(product.price)}</span>}
      </div>
    </div>
  );
}

function SearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const term = query.toLocaleLowerCase("vi");
  const results = term
    ? products.filter((product) =>
        product.name.toLocaleLowerCase("vi").includes(term) ||
        product.category.toLocaleLowerCase("vi").includes(term),
      )
    : [];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:py-20">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#b08d57]">Thanh Nhu / Tìm kiếm</p>
      <h1 className="font-cormorant text-3xl text-stone-900 sm:text-4xl lg:text-5xl">
        {query ? <>Kết quả tìm kiếm cho &ldquo;{query}&rdquo;</> : "Tìm kiếm sản phẩm"}
      </h1>
      <p className="mt-3 text-sm text-stone-500">{results.length} sản phẩm phù hợp</p>

      {results.length > 0 ? (
        <motion.div
          key={term}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {results.map((product) => (
            <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
              <ProductGridCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="py-20 text-center">
          <svg className="mx-auto mb-5 h-16 w-16 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="7.3" strokeWidth="1.5" />
            <path d="m16.2 16.2 5 5" strokeWidth="1.5" />
          </svg>
          <h2 className="font-cormorant text-2xl text-stone-900">{query ? `Không tìm thấy sản phẩm nào cho “${query}”` : "Nhập từ khóa để tìm sản phẩm"}</h2>
          <p className="mt-2 text-sm text-stone-500">Thử tìm theo tên sản phẩm hoặc chọn một danh mục bên dưới.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => router.push(`/tim-kiem?q=${encodeURIComponent(category)}`)}
                className="rounded-full border border-[#b08d57] px-4 py-2 text-sm text-[#8f7044] transition-colors hover:bg-[#b08d57] hover:text-white"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 text-stone-500">Đang tải kết quả tìm kiếm...</main>}>
      <SearchResults />
    </Suspense>
  );
}