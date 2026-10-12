"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

const categories = [
  "Tất Cả Dự Án",
  "Biệt Thự Luxury",
  "Penthouse & Căn Hộ",
  "Khách Sạn & Resort",
] as const;

type Category = (typeof categories)[number];

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>("Tất Cả Dự Án");
  const filtered: Project[] = activeCategory === "Tất Cả Dự Án"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section aria-labelledby="projects-title" className="bg-[#faf9f7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center lg:mb-12">
          <p className={`${inter.className} text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]`}>
            DỰ ÁN ĐÃ THI CÔNG
          </p>
          <h2 id="projects-title" className={`${cormorant.className} mt-3 text-3xl font-semibold text-stone-900 lg:text-4xl`}>
            Bộ Sưu Tập Dự Án Thi Công
          </h2>
          <p className={`${inter.className} mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-400`}>
            Tuyển chọn những công trình kiến trúc biệt thự &amp; penthouse nổi bật nhất.
          </p>
        </div>

        <div role="group" aria-label="Lọc dự án theo danh mục" className={`${inter.className} mb-12 flex flex-wrap justify-center gap-3`}>
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b08d57] ${isActive
                  ? "bg-[#b08d57] text-white"
                  : "border border-stone-200 bg-white text-stone-600 hover:border-[#b08d57] hover:text-[#b08d57]"}`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.a
                key={project.id}
                href={`/du-an/${project.slug}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b08d57]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.name} — ${project.location}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className={`${inter.className} absolute left-3 top-3 z-10 rounded-sm bg-[#b08d57] px-3 py-1 text-[10px] uppercase tracking-wider text-white`}>
                    {project.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className={`${cormorant.className} mb-2 line-clamp-1 text-lg font-semibold text-stone-900`}>
                    {project.name}
                  </h3>
                  <div className={`${inter.className} mb-3 flex items-center gap-4 text-xs text-stone-500`}>
                    <span className="flex items-center gap-1.5">
                      <svg {...iconProps} className="h-3.5 w-3.5 shrink-0 text-[#b08d57]">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {project.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg {...iconProps} className="h-3.5 w-3.5 shrink-0 text-[#b08d57]">
                        <path d="M21.3 8.7L8.7 21.3a1 1 0 01-1.4 0L2.7 16.7a1 1 0 010-1.4L15.3 2.7a1 1 0 011.4 0l4.6 4.6a1 1 0 010 1.4z" />
                        <path d="M7.5 10.5l2 2M10.5 7.5l2 2M13.5 4.5l2 2" />
                      </svg>
                      {project.area}
                    </span>
                  </div>
                  <div className="border-t border-stone-100 pt-3">
                    <span className={`${inter.className} inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#b08d57] transition-all group-hover:gap-2.5`}>
                      Xem Chi Tiết Dự Án <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}