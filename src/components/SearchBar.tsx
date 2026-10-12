"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products } from "@/data/products";
import { formatPrice } from "@/utils/format";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const term = query.trim().toLocaleLowerCase("vi");
  const results = term
    ? products.filter((product) =>
        product.name.toLocaleLowerCase("vi").includes(term) ||
        product.category.toLocaleLowerCase("vi").includes(term),
      )
    : [];

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    router.push(`/tim-kiem?q=${encodeURIComponent(query.trim())}`);
    close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Tìm kiếm sản phẩm"
        aria-expanded={isOpen}
        className="flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-900 transition-colors hover:border-[#b08d57] hover:text-[#b08d57]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="7.3" />
          <path d="m16.2 16.2 5 5" />
        </svg>
      </button>
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Tìm kiếm sản phẩm"
              className="fixed inset-0 z-[100] overflow-y-auto bg-stone-950/95 px-4 py-20 text-white backdrop-blur-md sm:px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Đóng tìm kiếm"
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#b08d57]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5 19 19M19 5 5 19" />
                </svg>
              </button>

              <div className="mx-auto flex max-w-6xl flex-col items-center pt-8 sm:pt-16">
                <form onSubmit={submit} role="search" className="w-full max-w-2xl">
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Tìm kiếm sản phẩm..."
                    aria-label="Tìm kiếm sản phẩm"
                    className="w-full border-b-2 border-[#b08d57] bg-transparent py-4 text-center text-2xl font-light text-white outline-none placeholder:text-white/50 lg:text-4xl"
                  />
                  <p className="mt-3 text-center text-xs text-white/50">Nhấn Enter để xem tất cả kết quả</p>
                </form>

                {term && (
                  <div className="mt-10 w-full">
                    {results.length > 0 ? (
                      <>
                        <p className="mb-5 text-sm text-white/60">{results.length} sản phẩm phù hợp</p>
                        <motion.div
                          key={term}
                          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                          initial="hidden"
                          animate="visible"
                          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                        >
                          {results.map((product) => (
                            <motion.button
                              key={product.id}
                              type="button"
                              onClick={() => {
                                router.push(`/san-pham/${product.slug}`);
                                close();
                              }}
                              className="flex items-center gap-3 rounded border border-white/15 p-3 text-left transition-colors hover:border-[#b08d57]"
                              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                            >
                              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-stone-800">
                                <Image src={product.image} alt={product.name} fill sizes="80px" className="object-cover" />
                              </span>
                              <span className="min-w-0">
                                <span className="block line-clamp-2 text-sm font-medium">{product.name}</span>
                                <span className="mt-1 block text-sm text-[#e8d4a8]">{formatPrice(product.salePrice ?? product.price)}</span>
                              </span>
                            </motion.button>
                          ))}
                        </motion.div>
                      </>
                    ) : (
                      <div className="text-center">
                        <p className="mb-5 text-white/70">Không tìm thấy sản phẩm nào cho &ldquo;{query.trim()}&rdquo;</p>
                        <p className="mb-3 text-sm text-white/50">Thử tìm theo danh mục:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {categories.map((category) => (
                            <button key={category} type="button" onClick={() => setQuery(category)} className="rounded-full border border-[#b08d57]/60 px-4 py-2 text-sm text-[#e8d4a8] hover:bg-[#b08d57]/20">
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}