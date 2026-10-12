"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { useCartHydration, useCartStore } from "@/store/cartStore";
import SearchBar from "@/components/SearchBar";

const serif = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Dự án", href: "/du-an" },
  { label: "Liên hệ", href: "/lien-he" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  // hydrated = false lúc SSR, chỉ thành true sau khi localStorage nạp xong
  // => badge không bị flash "0" trước khi hiện số thật.
  const hydrated = useCartHydration();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`${sans.className} sticky top-0 z-50 border-b border-stone-200/70 bg-[#faf9f7]/90 backdrop-blur-md`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20">
        {/* Logo — bên trái */}
        <Link href="/" className="flex items-center gap-2 lg:gap-3">
          <Image
            src="/logo.jpg"
            alt="Thanh Nhu - Nội Thất Gỗ Cao Cấp"
            width={48}
            height={48}
            className="h-9 w-9 rounded-full object-contain lg:h-12 lg:w-12"
            priority
          />
          <span className="flex flex-col">
            <span className={`${serif.className} text-base font-bold leading-none tracking-wider text-stone-900 lg:text-2xl`}>
              THANH NHU
            </span>
            <span className="mt-0.5 whitespace-nowrap text-[7px] font-medium uppercase tracking-[2px] text-[#b08d57] lg:text-[9px] lg:tracking-[3px]">
              NỘI THẤT GỖ CAO CẤP
            </span>
          </span>
        </Link>

        {/* Menu — ở giữa (desktop) */}
        <nav className="hidden md:block" aria-label="Điều hướng chính">
          <ul className="flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`relative px-1 py-2 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-[#b08d57]"
                      : "text-stone-700 hover:text-[#b08d57]"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[#b08d57]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tìm kiếm + giỏ hàng + hamburger — bên phải */}
        <div className="flex items-center gap-1.5 lg:gap-3 [&>button]:h-auto [&>button]:w-auto [&>button]:p-1.5 lg:[&>button]:p-2 [&>button>svg]:h-4 [&>button>svg]:w-4 lg:[&>button>svg]:h-5 lg:[&>button>svg]:w-5">
          <SearchBar />
          <button
            type="button"
            onClick={openCart}
            aria-label={`Mở giỏ hàng, có ${hydrated ? totalItems : 0} sản phẩm`}
            className="relative flex cursor-pointer items-center gap-2 border border-stone-900 bg-stone-900 p-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#faf9f7] transition-colors hover:bg-stone-700 lg:p-2"
          >
            <svg
              className="h-4 w-4 lg:h-5 lg:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 7h15l-1.5 9h-12z" />
              <path d="M6 7 5 3H2" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            <span className="hidden lg:inline">Giỏ hàng</span>
            {hydrated && totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b08d57] px-1 text-[11px] font-semibold text-white"
              >
                {totalItems > 99 ? "99+" : totalItems}
              </motion.span>
            )}
          </button>

          {/* Nút hamburger — chỉ hiện dưới 768px */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="flex items-center justify-center border border-stone-300 p-1.5 text-stone-900 transition-colors hover:border-stone-900 md:hidden lg:p-2"
          >
            {open ? (
              <svg className="h-4 w-4 lg:h-5 lg:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg className="h-4 w-4 lg:h-5 lg:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile — thu gọn, mở bằng hamburger */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-stone-200 transition-[max-height,opacity] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="space-y-1 px-4 py-4" aria-label="Điều hướng di động">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between border-b border-stone-100 py-3 text-sm uppercase tracking-[0.16em] transition-colors last:border-0 ${
                isActive(item.href)
                  ? "font-medium text-[#b08d57]"
                  : "text-stone-700 hover:text-[#b08d57]"
              }`}
            >
              <span>
                {isActive(item.href) && (
                  <span className="mr-2 mb-0.5 inline-block h-1.5 w-1.5 rounded-full bg-[#b08d57]" />
                )}
                <span className="mr-3 text-[11px] text-[#b08d57]">0{index + 1}</span>
                {item.label}
              </span>
              <span aria-hidden="true" className="text-stone-400">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}