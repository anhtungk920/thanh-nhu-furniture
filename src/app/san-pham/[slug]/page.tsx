"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Cormorant_Garamond } from "next/font/google";
import { products, type Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";
import ImageLightbox from "@/components/ImageLightbox";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
});

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const product = products.find((item) => item.slug === params.slug);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product) {
    notFound();
  }

  const allImages = Array.from(new Set([product.image, ...(product.images || [])]));
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: allImages,
            description: product.description,
            sku: `TN-${product.id}`,
            brand: { "@type": "Brand", name: "Thanh Nhu" },
            offers: {
              "@type": "Offer",
              price: product.salePrice || product.price,
              priceCurrency: "VND",
              availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: `https://thanhnhu.vn/san-pham/${product.slug}`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <nav aria-label="Đường dẫn trang" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-stone-400">
        <Link href="/" className="transition-colors hover:text-[#b08d57]">
          Trang chủ
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/san-pham" className="transition-colors hover:text-[#b08d57]">
          Sản phẩm
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/san-pham" className="transition-colors hover:text-[#b08d57]">
          {product.category}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-medium text-stone-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductGallery key={product.slug} product={product} allImages={allImages} onZoom={openLightbox} />
        <ProductInfo key={product.slug} product={product} />
      </div>

      <RelatedProducts product={product} currentProductId={product.id} />
      <ProductReviews />
      <ImageLightbox key={`${product.slug}-${lightboxIndex}`} images={allImages} initialIndex={lightboxIndex} isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} />
    </main>
    </>
  );
}

const REVIEWS = [
  {
    name: "Nguyễn Văn An",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    content:
      "Chất lượng gỗ tuyệt vời, đường nét chế tác rất tinh xảo. Gia đình tôi rất hài lòng với bộ sofa này!",
    date: "15/09/2026",
  },
  {
    name: "Trần Thị Mai",
    location: "Hà Nội",
    rating: 5,
    content: "Đóng gói cẩn thận, giao hàng đúng hẹn. Sản phẩm đẹp hơn cả hình, rất đáng tiền.",
    date: "02/08/2026",
  },
  {
    name: "Lê Hoàng Nam",
    location: "Đà Nẵng",
    rating: 4,
    content:
      "Thiết kế sang trọng, phù hợp với không gian phòng khách. Sẽ ủng hộ Thanh Nhu thêm nhiều sản phẩm nữa.",
    date: "20/07/2026",
  },
];

// Card sản phẩm liên quan — cùng layout với ProductGridCard ở trang /san-pham.
function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/san-pham/${product.slug}`} className="group block">
      <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-xl bg-stone-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider
              ${product.badge === "bestseller" ? "bg-[#b08d57] text-white" : ""}
              ${product.badge === "new" ? "bg-stone-900 text-white" : ""}
              ${product.badge === "sale" ? "bg-red-600 text-white" : ""}`}
          >
            {product.badge === "bestseller" && "Bán chạy"}
            {product.badge === "new" && "Mới"}
            {product.badge === "sale" &&
              `−${Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}%`}
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60">
            <span className="rounded-sm bg-stone-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white">
              Hết hàng
            </span>
          </div>
        )}
      </div>

      <div className="px-0.5">
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[2px] text-[#b08d57]">
          {product.category}
        </p>
        <h3
          className={`${cormorant.className} mb-1.5 line-clamp-2 text-base font-semibold leading-tight text-stone-900 transition-colors duration-300 group-hover:text-[#b08d57] lg:text-lg`}
        >
          {product.name}
        </h3>
        <div className="mb-2 flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`h-3 w-3 ${star <= Math.floor(product.rating) ? "text-[#b08d57]" : "text-stone-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <span className="text-base font-semibold text-stone-900">{formatPrice(product.salePrice)}</span>
              <span className="text-xs text-stone-400 line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-base font-semibold text-stone-900">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function RelatedProducts({ product, currentProductId }: { product: Product; currentProductId: number }) {
  const sameCategory = products.filter((p) => p.category === product.category && p.id !== currentProductId);
  const others = products.filter((p) => p.id !== currentProductId && p.category !== product.category);
  const related = [...sameCategory, ...others].slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-stone-200 pt-16 lg:mt-28">
      <p className="text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
        CÓ THỂ BẠN SẼ THÍCH
      </p>
      <h2 className={`${cormorant.className} mt-2 text-3xl font-semibold text-stone-900`}>
        Sản Phẩm Liên Quan
      </h2>
      <div className="mt-4 h-[2px] w-[60px] bg-[#b08d57]" />

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {related.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <RelatedProductCard product={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductReviews() {
  return (
    <section className="mt-20 border-t border-stone-200 pt-16 lg:mt-28">
      <p className="text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
        KHÁCH HÀNG NÓI GÌ
      </p>
      <h2 className={`${cormorant.className} mt-2 text-3xl font-semibold text-stone-900`}>
        Đánh Giá Sản Phẩm
      </h2>
      <div className="mt-4 h-[2px] w-[60px] bg-[#b08d57]" />

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  className={`${cormorant.className} flex h-12 w-12 items-center justify-center rounded-full bg-[#b08d57] text-xl text-white`}
                  aria-hidden="true"
                >
                  {review.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-stone-900">{review.name}</span>
                  <span className="mt-0.5 block text-xs text-stone-400">{review.location}</span>
                </span>
              </div>
              <div className="flex shrink-0 gap-0.5" aria-label={`${review.rating} trên 5 sao`}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-4 w-4 ${star <= review.rating ? "text-[#b08d57]" : "text-stone-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <p className="my-4 text-sm italic leading-relaxed text-stone-600">
              &ldquo;{review.content}&rdquo;
            </p>
            <p className="mt-3 text-xs text-stone-400">{review.date}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductGallery({ product, allImages, onZoom }: { product: Product; allImages: string[]; onZoom: (index: number) => void }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="lg:col-span-1">
      {/* Ảnh lớn */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-stone-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <button type="button" onClick={() => onZoom(activeImage)} aria-label={`Phóng to ảnh ${activeImage + 1} của ${product.name}`} className="relative block h-full w-full cursor-zoom-in">
              <Image
                src={allImages[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute left-4 top-4 z-10 rounded-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider
              ${product.badge === "bestseller" ? "bg-[#b08d57] text-white" : ""}
              ${product.badge === "new" ? "bg-stone-900 text-white" : ""}
              ${product.badge === "sale" ? "bg-red-600 text-white" : ""}`}
          >
            {product.badge === "bestseller" && "Bán chạy"}
            {product.badge === "new" && "Mới"}
            {product.badge === "sale" &&
              `−${Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}%`}
          </span>
        )}

        {/* Overlay hết hàng */}
        {!product.inStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
            <span className="rounded-sm bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white">
              Hết hàng
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {allImages.map((img, index) => (
          <div key={`${img}-${index}`} className="group relative h-20 w-20 shrink-0">
            <button
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Xem ảnh ${index + 1}`}
              aria-pressed={activeImage === index}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 transition-all duration-200
                ${activeImage === index ? "border-[#b08d57]" : "border-stone-200 hover:border-stone-300"}`}
            >
              <Image src={img} alt={`${product.name} ${index + 1}`} fill className="object-cover" sizes="80px" />
            </button>
            <button type="button" onClick={() => onZoom(index)} aria-label={`Phóng to ảnh ${index + 1}`} className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded bg-black/70 text-white opacity-0 transition-opacity hover:bg-black focus-visible:opacity-100 group-hover:opacity-100">
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5M10 7v6m-3-3h6" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!product.inStock || isAdded) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image,
      });
    }
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col lg:col-span-1">
      {/* Category */}
      <p className="mb-3 text-[11px] font-medium uppercase tracking-[3px] text-[#b08d57]">
        {product.category}
      </p>

      {/* Tên sản phẩm */}
      <h1 className={`${cormorant.className} mb-4 text-3xl font-semibold leading-tight text-stone-900 lg:text-4xl`}>
        {product.name}
      </h1>

      {/* Rating + Reviews */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex gap-0.5" role="img" aria-label={`Đánh giá ${product.rating} trên 5 sao`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              aria-hidden="true"
              className={`h-4 w-4 ${star <= Math.floor(product.rating) ? "text-[#b08d57]" : "text-stone-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-stone-500">
          {product.rating} · <span className="font-medium text-[#b08d57]">{product.reviewCount} đánh giá</span>
        </span>
      </div>

      {/* Giá */}
      <div className="mb-5 flex items-baseline gap-3 border-b border-stone-200 pb-5">
        {product.salePrice ? (
          <>
            <span className={`${cormorant.className} text-3xl font-bold text-[#b08d57] lg:text-4xl`}>
              {formatPrice(product.salePrice)}
            </span>
            <span className="text-lg text-stone-400 line-through">{formatPrice(product.price)}</span>
            <span className="ml-auto rounded bg-red-600 px-2.5 py-1 text-xs font-semibold text-white">
              −{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
            </span>
          </>
        ) : (
          <span className={`${cormorant.className} text-3xl font-bold text-stone-900 lg:text-4xl`}>
            {formatPrice(product.price)}
          </span>
        )}
      </div>

      {/* Mô tả ngắn */}
      <p className="mb-6 text-sm leading-relaxed text-stone-600">{product.description}</p>

      {/* Thông số sản phẩm */}
      <div className="mb-6 space-y-2.5 border-b border-stone-200 pb-6">
        <div className="flex text-sm">
          <span className="w-32 shrink-0 text-stone-400">Chất liệu:</span>
          <span className="font-medium text-stone-700">{product.material}</span>
        </div>
        <div className="flex text-sm">
          <span className="w-32 shrink-0 text-stone-400">Kích thước:</span>
          <span className="font-medium text-stone-700">{product.dimensions}</span>
        </div>
        <div className="flex text-sm">
          <span className="w-32 shrink-0 text-stone-400">Bảo hành:</span>
          <span className="font-medium text-stone-700">{product.warranty}</span>
        </div>
        <div className="flex text-sm">
          <span className="w-32 shrink-0 text-stone-400">Tình trạng:</span>
          <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
            {product.inStock ? "Còn hàng" : "Hết hàng"}
          </span>
        </div>
      </div>

      {/* Số lượng + thêm vào giỏ */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center overflow-hidden rounded-lg border border-stone-200">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={!product.inStock}
            className="flex h-12 w-12 items-center justify-center text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40"
            aria-label="Giảm số lượng"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span className="w-12 text-center text-base font-medium text-stone-900">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            disabled={!product.inStock}
            className="flex h-12 w-12 items-center justify-center text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900 disabled:opacity-40"
            aria-label="Tăng số lượng"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdded}
          className={`h-12 flex-1 rounded-lg px-6 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
            !product.inStock
              ? "cursor-not-allowed bg-stone-200 text-stone-400"
              : isAdded
                ? "bg-green-600 text-white"
                : "bg-[#b08d57] text-white hover:bg-[#c9a66b]"
          }`}
        >
          {!product.inStock ? "Hết hàng" : isAdded ? "Đã thêm vào giỏ ✓" : "Thêm vào giỏ"}
        </button>
      </div>

      {/* Cam kết dịch vụ */}
      <div className="grid grid-cols-3 gap-3 border-t border-stone-200 pt-5">
        <div className="text-center">
          <svg aria-hidden="true" className="mx-auto mb-1.5 h-6 w-6 text-[#b08d57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[10px] uppercase tracking-wider text-stone-500">Bảo hành {product.warranty}</p>
        </div>
        <div className="text-center">
          <svg aria-hidden="true" className="mx-auto mb-1.5 h-6 w-6 text-[#b08d57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <p className="text-[10px] uppercase tracking-wider text-stone-500">Giao hàng toàn quốc</p>
        </div>
        <div className="text-center">
          <svg aria-hidden="true" className="mx-auto mb-1.5 h-6 w-6 text-[#b08d57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <p className="text-[10px] uppercase tracking-wider text-stone-500">Đổi trả 30 ngày</p>
        </div>
      </div>
    </div>
  );
}
