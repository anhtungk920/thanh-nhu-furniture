"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const word1 = "THANH";
const word2 = "NHU";

const directionsTHANH = [
  { x: -400, y: -300, rotate: -25 },
  { x: -200, y: -500, rotate: 15 },
  { x: 0, y: -600, rotate: 0 },
  { x: 200, y: -500, rotate: -15 },
  { x: 400, y: -300, rotate: 25 },
];

const directionsNHU = [
  { x: -300, y: 400, rotate: -30 },
  { x: 0, y: 500, rotate: 0 },
  { x: 300, y: 400, rotate: 30 },
];

function AnimatedChar({
  char,
  direction,
  scrollYProgress,
  gradient,
}: {
  char: string;
  direction: { x: number; y: number; rotate: number };
  scrollYProgress: MotionValue<number>;
  gradient: string;
}) {
  const x = useTransform(scrollYProgress, [0.15, 0.6], [0, direction.x]);
  const y = useTransform(scrollYProgress, [0.15, 0.6], [0, direction.y]);
  const rotate = useTransform(scrollYProgress, [0.15, 0.6], [0, direction.rotate]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.65], [1, 0]);

  return (
    <motion.span
      style={{ x, y, rotate, opacity, display: "inline-block" }}
      className={`bg-clip-text text-transparent ${gradient}`}
    >
      {char}
    </motion.span>
  );
}

export default function HeroTypography() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0.35, 0.6, 0.9, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);
  const decorativeOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.88, 0.95], [60, 0]);
  const finalPointerEvents = useTransform(scrollYProgress, (value) => value >= 0.88 ? "auto" : "none");

  return (
    <section ref={sectionRef} className="relative h-[200vh] w-full bg-stone-950">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image — sáng dần và phóng nhẹ khi cuộn */}
        <motion.div className="absolute inset-0 z-0" style={{ opacity: imageOpacity, scale: imageScale }}>
          <Image
            src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1920&q=85"
            alt="Nội thất Thanh Nhu"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/60 to-stone-950/90" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#b08d57]/20 via-transparent to-transparent" />
        </motion.div>

        <div className="hidden lg:block absolute top-1/2 left-8 w-[1px] h-20 bg-gradient-to-b from-transparent via-[#b08d57]/50 to-transparent" />
        <div className="hidden lg:block absolute top-1/2 right-8 w-[1px] h-20 bg-gradient-to-b from-transparent via-[#b08d57]/50 to-transparent" />

        {/* Typography layer */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="text-center">
            <h1
              className={`${cormorant.className} flex justify-center text-[12vw] font-bold leading-[0.85] tracking-[-0.02em] drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)] sm:text-[13vw] lg:text-[14vw]`}
            >
              {word1.split("").map((char, i) => (
                <AnimatedChar
                  key={i}
                  char={char}
                  direction={directionsTHANH[i]}
                  scrollYProgress={scrollYProgress}
                  gradient="bg-gradient-to-b from-white via-[#faf9f7] to-[#e8d4a8]"
                />
              ))}
            </h1>
            <h1
              className={`${cormorant.className} mt-2 flex justify-center text-[12vw] font-bold italic leading-[0.85] tracking-[-0.02em] drop-shadow-[0_8px_40px_rgba(0,0,0,0.5)] sm:text-[13vw] lg:-mt-6 lg:text-[14vw]`}
            >
              {word2.split("").map((char, i) => (
                <AnimatedChar
                  key={i}
                  char={char}
                  direction={directionsNHU[i]}
                  scrollYProgress={scrollYProgress}
                  gradient="bg-gradient-to-b from-[#e8d4a8] to-[#b08d57]"
                />
              ))}
            </h1>

            <motion.div style={{ opacity: contentOpacity }} className="mt-8 flex flex-col items-center gap-6 lg:mt-10">
              {/* Divider vàng */}
              <div className="h-[1px] w-[80px] bg-[#b08d57]" />

              {/* Tagline */}
              <p className="px-4 text-[10px] font-light uppercase tracking-[3px] whitespace-nowrap text-[#faf9f7]/85 lg:text-sm lg:tracking-[8px]">
                Thiết Kế &amp; Thi Công Nội Thất
              </p>

              {/* Subtitle */}
              <p className={`${cormorant.className} mx-auto max-w-2xl text-base italic text-[#faf9f7]/70 lg:text-lg`}>
                Nơi nghệ thuật gặp gỡ cuộc sống
              </p>

              {/* CTA buttons */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/du-an"
                  className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#b08d57] px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-white shadow-[0_10px_30px_rgba(176,141,87,0.3)] transition-all duration-300 hover:bg-[#c9a66b]"
                >
                  XEM DỰ ÁN
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-[#faf9f7]/60 bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-[#faf9f7] transition-all duration-300 hover:border-[#b08d57] hover:bg-[#faf9f7] hover:text-stone-900"
                >
                  BÁO GIÁ THI CÔNG
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Nội dung kết — hiện ra sau khi chữ THANH NHU bay hết và ảnh đã sáng */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center px-4"
          style={{ opacity: finalOpacity, y: finalY, pointerEvents: finalPointerEvents }}
        >
          <div className="max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[6px] text-[#b08d57] lg:text-xs">
              KHÔNG GIAN SỐNG ĐẲNG CẤP
            </p>

            <h2 className={`${cormorant.className} mb-6 text-4xl font-semibold leading-[1.1] text-white lg:text-6xl`}>
              Nơi Nghệ Thuật
              <br />
              <span className="italic text-[#e8d4a8]">Gặp Gỡ Cuộc Sống</span>
            </h2>

            <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/75 lg:text-base">
              Mỗi sản phẩm Thanh Nhu là một tác phẩm nghệ thuật, được chế tác tỉ mỉ từ những khối gỗ quý, mang đến hơi thở thiên nhiên cho tổ ấm của bạn.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/san-pham"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-[#b08d57] px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-[#c9a66b]"
              >
                KHÁM PHÁ SẢN PHẨM
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/gioi-thieu"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/60 bg-transparent px-8 py-4 text-xs font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-white hover:text-stone-900"
              >
                VỀ CHÚNG TÔI
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Góc trên trái: EST. 2014 */}
        <motion.div style={{ opacity: decorativeOpacity }} className="absolute left-8 top-32 z-20 hidden flex-col items-start gap-2 lg:flex">
          <span className="text-[10px] uppercase tracking-[4px] text-[#b08d57]">Est.</span>
          <span className={`${cormorant.className} text-2xl font-light text-[#faf9f7]/60`}>2014</span>
        </motion.div>

        {/* Góc trên phải: số thứ tự slide */}
        <motion.div style={{ opacity: decorativeOpacity }} className="absolute right-8 top-32 z-20 hidden flex-col items-end gap-1 lg:flex">
          <span className={`${cormorant.className} text-4xl font-light text-[#faf9f7]/30`}>01</span>
          <div className="h-[1px] w-8 bg-[#b08d57]" />
          <span className="text-[10px] uppercase tracking-[3px] text-[#faf9f7]/50">Trang chủ</span>
        </motion.div>

        {/* Scroll hint ở dưới */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[4px] text-[#faf9f7]/60">Cuộn</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-[#b08d57] to-transparent" />
        </div>
      </div>
    </section>
  );
}