"use client";

import { motion } from "framer-motion";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { ReactNode } from "react";

// Font chữ riêng của section (scoped theo className nên không ảnh hưởng các section khác).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

// Tên icon dùng để tra cứu trong map `serviceIcons` bên dưới.
type ServiceIcon = "compass" | "hammer" | "sparkles";

interface Service {
  icon: ServiceIcon;
  number: string;
  title: string;
  description: string;
  features: string[];
}

// Dữ liệu 3 dịch vụ chính: thiết kế, thi công trọn gói, cải tạo biệt thự.
const services: Service[] = [
  {
    icon: "compass",
    number: "01",
    title: "Thiết Kế Kiến Trúc & Nội Thất",
    description:
      "Bản vẽ phong cách Quiet Luxury, Warm Minimalism cá nhân hóa 100% theo bản mệnh gia chủ.",
    features: [
      "Quy hoạch mặt bằng công năng chuẩn tỉ lệ vàng",
      "Phối cảnh 3D siêu thực từng chi tiết góc máy",
      "Hồ sơ kỹ thuật điện nước M&E bám sát",
    ],
  },
  {
    icon: "hammer",
    number: "02",
    title: "Thi Công Nội Thất Trọn Gói",
    description:
      "Trực tiếp sản xuất tại xưởng 3.000m² và lắp đặt trọn gói không qua trung gian. Cam kết bảo hành 5 năm.",
    features: [
      "100% Gỗ Óc Chó nhập khẩu Mỹ chuẩn FAS",
      "KTS giám sát kỹ thuật 24/7 tại công trình",
      "Bàn giao dùng 100% bản vẽ 3D",
    ],
  },
  {
    icon: "sparkles",
    number: "03",
    title: "Cải Tạo & Nâng Cấp Biệt Thự",
    description:
      "Tối ưu lại mặt bằng không gian mở, gia cố kết cấu móng và thay áo mới cho định thự cũ.",
    features: [
      "Đánh giá kết cấu móng và dầm chịu lực",
      "Mở rộng hệ kính Panoramic lấy sáng tự nhiên",
      "Tiết kiệm 30% chi phí so với xây mới",
    ],
  },
];

// Icon theo phong cách Lucide: 24x24 viewBox, stroke 1.5, bo tròn đầu nét.
const iconBaseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

// Map từ khóa icon sang SVG tương ứng.
const serviceIcons: Record<ServiceIcon, ReactNode> = {
  compass: (
    <svg {...iconBaseProps}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  hammer: (
    <svg {...iconBaseProps}>
      <path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9" />
      <path d="M17.64 15L22 10.64" />
      <path d="M20.91 11.7L19.6 10.39a1 1 0 01-.39-.7l-.03-.35a1 1 0 00-.29-.63l-.73-.73a1 1 0 00-.63-.29l-.35-.03a1 1 0 01-.7-.39L16.3 6.6a.6.6 0 010-.83l.5-.5a2.12 2.12 0 012.83 0l.79.79a2.12 2.12 0 010 2.83l-2.3 2.3" />
    </svg>
  ),
  sparkles: (
    <svg {...iconBaseProps}>
      <path d="M9.94 14.06L3 21" />
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    </svg>
  ),
};

export default function Services() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header: căn giữa, đường kẻ đồng 60px làm nhịp thị giác. */}
        <div className="mb-12 text-center lg:mb-16">
          <p
            className={`${inter.className} text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]`}
          >
            DỊCH VỤ CỦA CHÚNG TÔI
          </p>

          <h2
            className={`${cormorant.className} mt-3 text-3xl font-semibold text-stone-900 lg:text-4xl`}
          >
            Thiết Kế &amp; Thi Công Nội Thất Trọn Gói
          </h2>

          {/* Đường kẻ trang trí căn giữa */}
          <div aria-hidden="true" className="mx-auto mt-5 h-[2px] w-[60px] bg-[#b08d57]" />

          <p className={`${inter.className} mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-stone-400`}>
            Giải pháp thiết kế &amp; thi công trọn gói cao cấp không phát sinh chi phí.
          </p>
        </div>

        {/* Lưới 3 cột: mỗi card trượt lên lần lượt khi cuộn tới. */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="rounded-2xl border border-stone-200 p-6 transition-all duration-300 hover:border-[#b08d57]/40 hover:shadow-lg lg:p-8"
            >
              {/* Icon dịch vụ — màu đồng, 32px */}
              <div className="mb-5 h-8 w-8 text-[#b08d57]">{serviceIcons[service.icon]}</div>

              {/* Số thứ tự */}
              <p className={`${inter.className} mb-2 font-mono text-xs tracking-wider text-[#b08d57]`}>
                {service.number}
              </p>

              {/* Tên dịch vụ */}
              <h3 className={`${cormorant.className} mb-3 text-xl font-semibold text-stone-900`}>
                {service.title}
              </h3>

              {/* Mô tả ngắn */}
              <p className={`${inter.className} mb-5 text-sm leading-relaxed text-stone-500`}>
                {service.description}
              </p>

              {/* Danh sách điểm nổi bật */}
              <ul className="space-y-2.5">
                {service.features.map((feature) => (
                  <li key={feature} className={`${inter.className} flex items-start gap-2.5`}>
                    <svg
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#b08d57]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="text-sm leading-relaxed text-stone-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}