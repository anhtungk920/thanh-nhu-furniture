"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { products, type Product } from "@/data/products";
import { formatPrice } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";

// Card sản phẩm dạng lưới: ảnh + badge + overlay hết hàng + quick actions + thông tin.
const ProductGridCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
    });
  };

  return (
    <a href={`/san-pham/${product.slug}`} className="group block">
      {/* Phần ảnh */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-3">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-sm
            ${product.badge === 'bestseller' ? 'bg-[#b08d57] text-white' : ''}
            ${product.badge === 'new' ? 'bg-stone-900 text-white' : ''}
            ${product.badge === 'sale' ? 'bg-red-600 text-white' : ''}
          `}>
            {product.badge === 'bestseller' && 'Bán chạy'}
            {product.badge === 'new' && 'Mới'}
            {product.badge === 'sale' && `−${Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}%`}
          </span>
        )}

        {/* Overlay hết hàng */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-sm">
              Hết hàng
            </span>
          </div>
        )}

        {/* Nút quick actions — hiện khi hover (ẨN trên mobile) */}
        <div className="absolute bottom-3 left-3 right-3 hidden sm:flex gap-2
                        opacity-0 translate-y-3 transition-all duration-300
                        group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-white/95 backdrop-blur-sm text-stone-900 text-xs font-medium
                       py-2.5 rounded-lg hover:bg-[#b08d57] hover:text-white transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="w-10 bg-white/95 backdrop-blur-sm text-stone-900 rounded-lg
                       hover:bg-[#b08d57] hover:text-white transition-colors
                       flex items-center justify-center"
            aria-label="Yêu thích"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Phần info */}
      <div className="px-0.5">
        <p className="text-[10px] text-[#b08d57] uppercase tracking-[2px] font-medium mb-1">
          {product.category}
        </p>
        <h3 className="font-cormorant text-base lg:text-lg font-semibold text-stone-900 leading-tight mb-1.5
                       group-hover:text-[#b08d57] transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map(star => (
              <svg key={star} className={`w-3 h-3 ${star <= Math.floor(product.rating) ? 'text-[#b08d57]' : 'text-stone-300'}`}
                   fill="currentColor" viewBox="0 0 20 20">
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
        {/* Nút thêm giỏ mobile — chỉ hiện trên mobile */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="sm:hidden w-full mt-2 py-2 bg-[#b08d57] text-white text-xs font-medium
                     rounded-lg hover:bg-[#c9a66b] transition-colors
                     disabled:bg-stone-200 disabled:text-stone-400"
        >
          {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </a>
  );
};

// Card sản phẩm dạng danh sách: ảnh vuông bên trái + thông tin chi tiết bên phải.
const ProductListCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      image: product.image,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <a
      href={`/san-pham/${product.slug}`}
      className="group flex gap-4 lg:gap-6 bg-white rounded-xl p-3 lg:p-4
                 border border-stone-100 shadow-sm
                 hover:shadow-md hover:border-stone-200 transition-all duration-300"
    >
      {/* Ảnh */}
      <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px]
                      rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="200px"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-sm
            ${product.badge === 'bestseller' ? 'bg-[#b08d57] text-white' : ''}
            ${product.badge === 'new' ? 'bg-stone-900 text-white' : ''}
            ${product.badge === 'sale' ? 'bg-red-600 text-white' : ''}
          `}>
            {product.badge === 'bestseller' && 'Bán chạy'}
            {product.badge === 'new' && 'Mới'}
            {product.badge === 'sale' && `−${Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100)}%`}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-stone-900 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-sm">
              Hết hàng
            </span>
          </div>
        )}
      </div>

      {/* Thông tin */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
        <div>
          <p className="text-[10px] text-[#b08d57] uppercase tracking-[2px] font-medium mb-1">
            {product.category}
          </p>
          <h3 className="font-cormorant text-lg lg:text-xl font-semibold text-stone-900 mb-1.5
                         group-hover:text-[#b08d57] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(star => (
                <svg key={star}
                     className={`w-3 h-3 ${star <= Math.floor(product.rating) ? 'text-[#b08d57]' : 'text-stone-300'}`}
                     fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-stone-400">({product.reviewCount} đánh giá)</span>
          </div>
          <p className="hidden sm:block text-sm text-stone-500 leading-relaxed line-clamp-2 mb-2">
            {product.description}
          </p>
          <p className="hidden lg:block text-xs text-stone-400">
            <span className="text-stone-500 font-medium">Chất liệu:</span> {product.material}
          </p>
        </div>

        <div className="flex items-center justify-between mt-2 sm:mt-0">
          <div className="flex items-center gap-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-semibold text-stone-900">{formatPrice(product.salePrice)}</span>
                <span className="text-xs text-stone-400 line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-lg font-semibold text-stone-900">{formatPrice(product.price)}</span>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleAdd}
              disabled={!product.inStock || isAdded}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-300
                ${isAdded
                  ? 'bg-green-600 text-white'
                  : product.inStock
                    ? 'bg-[#b08d57] text-white hover:bg-[#c9a66b]'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
            >
              {isAdded ? 'Đã thêm ✓' : product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
            </button>
            <span className="text-xs text-[#b08d57] font-medium group-hover:underline whitespace-nowrap">
              Xem chi tiết →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default function SanPhamPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Tất cả");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Ref tới vùng danh sách: tự cuộn lên đầu khi filter/sort đổi.
  const productListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    productListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeFilter, sortBy]);

  const categories = [
    "Tất cả",
    "Phòng Khách",
    "Phòng Bếp",
    "Phòng Ngủ",
    "Phòng Làm Việc",
    "Đèn Trang Trí",
    "Kệ & Tủ",
  ] as const;

  const filteredAndSorted = useMemo(() => {
    let result = [...products];
    if (activeFilter !== "Tất cả") {
      result = result.filter((p) => p.category === activeFilter);
    }
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price_desc":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
          <span>Trang chủ</span>
          <span aria-hidden="true" className="mx-2">/</span>
          <span className="text-stone-900 font-medium">Sản phẩm</span>
        </nav>

        <div className="mt-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#b08d57] font-medium">
            BỘ SƯU TẬP
          </p>
          <h1 className="mt-2 font-cormorant text-3xl lg:text-4xl font-semibold text-stone-900">
            Tất Cả Sản Phẩm
          </h1>
        </div>

        <div ref={productListRef} className="mt-10">
          {/* Filter chips: mỗi chip hiện số lượng sản phẩm trong nhóm. */}
          <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            {categories.map((category) => {
              const active = activeFilter === category;
              const count =
                category === "Tất cả"
                  ? products.length
                  : products.filter((p) => p.category === category).length;
              return (
                <motion.button
                  key={category}
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    active
                      ? "bg-[#b08d57] text-white border border-[#b08d57]"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-[#b08d57]"
                  }`}
                  aria-pressed={active}
                >
                  <span>{category}</span>
                  <span
                    className={`ml-1.5 text-xs ${
                      active ? "text-white/80" : "text-stone-400"
                    }`}
                  >
                    ({count})
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Toolbar: số sản phẩm hiển thị + sort + chế độ xem. */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-stone-500">
              Hiển thị {filteredAndSorted.length} sản phẩm
            </p>
            <div className="flex items-center gap-3">
              <label htmlFor="sort-select" className="sr-only">
                Sắp xếp
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700 focus:outline-none focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/20"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="price_asc">Giá: Thấp → Cao</option>
                <option value="price_desc">Giá: Cao → Thấp</option>
                <option value="newest">Mới nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>

              {/* Nút đổi chế độ xem: grid / list. */}
              <div className="relative hidden sm:flex items-center bg-white border border-stone-200 rounded-lg p-1">
                {/* Sliding indicator */}
                <motion.div
                  className="absolute top-1 bottom-1 bg-[#b08d57] rounded"
                  layout
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    left: viewMode === 'grid' ? '4px' : '50%',
                    width: 'calc(50% - 4px)',
                  }}
                />

                <button
                  onClick={() => setViewMode('grid')}
                  className={`relative z-10 p-1.5 rounded transition-colors duration-200
                    ${viewMode === 'grid' ? 'text-white' : 'text-stone-400 hover:text-stone-600'}`}
                  aria-label="Xem dạng lưới"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <rect x="1" y="1" width="6" height="6" rx="1" />
                    <rect x="9" y="1" width="6" height="6" rx="1" />
                    <rect x="1" y="9" width="6" height="6" rx="1" />
                    <rect x="9" y="9" width="6" height="6" rx="1" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`relative z-10 p-1.5 rounded transition-colors duration-200
                    ${viewMode === 'list' ? 'text-white' : 'text-stone-400 hover:text-stone-600'}`}
                  aria-label="Xem dạng danh sách"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <rect x="1" y="1" width="14" height="3" rx="1" />
                    <rect x="1" y="6.5" width="14" height="3" rx="1" />
                    <rect x="1" y="12" width="14" height="3" rx="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {/* Empty state: danh mục/sort không có sản phẩm phù hợp. */}
            {filteredAndSorted.length === 0 && (
              <motion.div
                className="text-center py-16 lg:py-24"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-16 h-16 text-stone-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <h3 className="font-cormorant text-xl text-stone-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-sm text-stone-400 mb-6">
                  Không có sản phẩm nào trong danh mục &ldquo;<span className="text-[#b08d57]">{activeFilter}</span>&rdquo;
                </p>
                <button
                  onClick={() => setActiveFilter('Tất cả')}
                  className="px-6 py-2.5 bg-[#b08d57] text-white text-sm font-medium
                             uppercase tracking-wider rounded-lg hover:bg-[#c9a66b] transition-colors"
                >
                  Xem tất cả sản phẩm
                </button>
              </motion.div>
            )}
            {/* Product Grid */}
            {filteredAndSorted.length > 0 && (viewMode === 'grid' ? (
              <motion.div
                className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSorted.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      layoutId={`product-${product.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <ProductGridCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div className="flex flex-col gap-4" layout>
                <AnimatePresence mode="popLayout">
                  {filteredAndSorted.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      layoutId={`product-${product.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <ProductListCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
