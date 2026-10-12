"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";

// Font chữ riêng của section (scoped theo className nên không ảnh hưởng Header/Hero).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

// Kiểu dữ liệu của một danh mục sản phẩm.
interface Category {
  id: number;
  name: string;
  subtitle: string;
  productCount: number;
  image: string;
  // Class span trên desktop (breakpoint lg:), viết đầy đủ để Tailwind quét được.
  colSpan: string;
  rowSpan: string;
  // Class span trên mobile (mặc định, không prefix).
  mobileColSpan: string;
}

// Dữ liệu 6 danh mục — bố cục Bento Grid bất đối xứng.
const categories: Category[] = [
  {
    id: 1,
    name: "Phòng Khách",
    subtitle: "Living Room",
    productCount: 24,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-2",
    mobileColSpan: "col-span-2",
  },
  {
    id: 2,
    name: "Bàn Ăn",
    subtitle: "Dining",
    productCount: 18,
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    mobileColSpan: "col-span-1",
  },
  {
    id: 3,
    name: "Đèn Trang Trí",
    subtitle: "Lighting",
    productCount: 32,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    mobileColSpan: "col-span-1",
  },
  {
    id: 4,
    name: "Phòng Ngủ",
    subtitle: "Bedroom",
    productCount: 20,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    mobileColSpan: "col-span-1",
  },
  {
    id: 5,
    name: "Phòng Làm Việc",
    subtitle: "Workspace",
    productCount: 15,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80",
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    mobileColSpan: "col-span-2",
  },
  {
    id: 6,
    name: "Kệ & Tủ",
    subtitle: "Shelving",
    productCount: 28,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80",
    colSpan: "lg:col-span-1",
    rowSpan: "lg:row-span-1",
    mobileColSpan: "col-span-1",
  },
];

// Animation của container: các ô con xuất hiện lần lượt (stagger).
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Animation của từng ô: mờ + thu nhỏ nhẹ + trượt lên.
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Chiều cao tối thiểu của mỗi ô theo yêu cầu thiết kế.
function getHeightClasses(category: Category): string {
  // Ô rộng gấp đôi trên mobile cao hơn một chút.
  const mobileHeight =
    category.mobileColSpan === "col-span-2"
      ? "min-h-[220px]"
      : "min-h-[200px]";
  // Trên desktop: ô row-span-2 cao 480px (= 232 * 2 + gap 16), ô thường cao 232px.
  const desktopHeight =
    category.rowSpan === "lg:row-span-2"
      ? "lg:min-h-[480px]"
      : "lg:min-h-[232px]";
  return `${mobileHeight} ${desktopHeight}`;
}

// Kích thước ảnh gợi ý cho trình duyệt (ô gấp đôi cần ảnh lớn hơn).
function getSizes(category: Category): string {
  if (category.mobileColSpan === "col-span-2") {
    return "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw";
  }
  return "(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw";
}

export default function ProductCategories() {
  return (
    // Section nền kem, nằm ngay dưới Hero Banner.
    <section aria-labelledby="product-categories-title" className="bg-[#faf9f7] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề section: fade-in + trượt lên khi vào viewport, chỉ chạy 1 lần. */}
        <motion.div
          className="mb-12 text-center lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Subtitle nhỏ màu vàng đồng */}
          <p
            className={`${inter.className} text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]`}
          >
            Bộ sưu tập
          </p>
          {/* Tiêu đề chính */}
          <h2
            id="product-categories-title"
            className={`${cormorant.className} mt-3 text-[42px] font-semibold leading-tight text-stone-900`}
          >
            Danh Mục Sản Phẩm
          </h2>
          {/* Đường kẻ trang trí căn giữa */}
          <div aria-hidden="true" className="mx-auto mt-4 h-[2px] w-[60px] bg-[#b08d57]" />
        </motion.div>

        {/* Lưới Bento: mobile 2 cột / desktop 4 cột, animation stagger khi cuộn tới. */}
        <motion.div
          className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            // Mỗi ô là một link (thẻ <a>) để đảm bảo accessibility: focus + đọc màn hình.
            <motion.a
              key={category.id}
              href="/san-pham"
              aria-label={`${category.name} — ${category.productCount} sản phẩm`}
              variants={itemVariants}
              className={`group relative block overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b08d57] ${category.mobileColSpan} ${category.colSpan} ${category.rowSpan} ${getHeightClasses(category)}`}
            >
              {/* Ảnh nền phủ kín ô, phóng nhẹ khi hover. */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={getSizes(category)}
              />

              {/* Overlay gradient: luôn hiện nhẹ, đậm hơn khi hover. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90"
              />

              {/* Nội dung text ở góc dưới trái. */}
              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                {/* Subtitle tiếng Anh: ẩn, hiện dần khi hover. */}
                <span className="block translate-y-3 text-[11px] font-medium uppercase tracking-[3px] text-[#b08d57] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {category.subtitle}
                </span>

                {/* Tên danh mục: luôn hiển thị, dịch nhẹ lên khi hover. */}
                <h3
                  className={`${cormorant.className} mt-1 translate-y-2 text-xl font-semibold text-white transition-transform duration-500 group-hover:translate-y-0 lg:text-2xl`}
                >
                  {category.name}
                </h3>

                {/* Số lượng sản phẩm: hiện sau subtitle một nhịp (delay-75). */}
                <p className="mt-1 translate-y-3 text-sm text-white/70 opacity-0 transition-all delay-75 duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {category.productCount} sản phẩm
                </p>

                {/* Đường kẻ accent chạy dài ra khi hover. */}
                <div
                  aria-hidden="true"
                  className="mt-3 h-[2px] w-0 bg-[#b08d57] transition-all duration-700 group-hover:w-12"
                />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}