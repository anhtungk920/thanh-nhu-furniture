import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";

// Font chữ riêng của footer (scoped theo className, không ảnh hưởng section khác).
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

// Kiểu dữ liệu của một liên kết trong footer.
interface FooterLink {
  label: string;
  href: string;
}

// Cột 2: liên kết nhanh.
const quickLinks: FooterLink[] = [
  { label: "Trang Chủ", href: "/" },
  { label: "Sản Phẩm", href: "/san-pham" },
  { label: "Bộ Sưu Tập", href: "/bo-suu-tap" },
  { label: "Về Chúng Tôi", href: "/gioi-thieu" },
  { label: "Liên Hệ", href: "/lien-he" },
];

// Cột 3: chính sách.
const policyLinks: FooterLink[] = [
  { label: "Chính Sách Đổi Trả", href: "/chinh-sach/doi-tra" },
  { label: "Bảo Hành Sản Phẩm", href: "/chinh-sach/bao-hanh" },
  { label: "Vận Chuyển & Giao Hàng", href: "/chinh-sach/van-chuyen" },
  { label: "Hướng Dẫn Thanh Toán", href: "/chinh-sach/thanh-toan" },
  { label: "Câu Hỏi Thường Gặp", href: "/chinh-sach/faq" },
];

// Mạng xã hội — icon vẽ tay bằng SVG, không dùng icon library.
type SocialKey = "facebook" | "instagram" | "youtube" | "tiktok";

interface SocialLink {
  key: SocialKey;
  label: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  { key: "facebook", label: "Facebook", href: "https://facebook.com" },
  { key: "instagram", label: "Instagram", href: "https://instagram.com" },
  { key: "youtube", label: "YouTube", href: "https://youtube.com" },
  { key: "tiktok", label: "TikTok", href: "https://tiktok.com" },
];

// Icon mạng xã hội tương ứng từng nền tảng (stroke-width 1.5, viewBox 0 0 24 24).
function SocialIcon({ name }: { name: SocialKey }) {
  // Thuộc tính chung cho mọi icon: nét 1.5px, bo góc tròn, viewBox chuẩn 24px.
  const commonProps = {
    className: "h-[18px] w-[18px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true,
  };

  if (name === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-6h2.2a1 1 0 0 0 .97-1.24l.7-3.2A1 1 0 0 0 15.9 10H14V7.5A1.5 1.5 0 0 1 15.5 6H16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-1z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...commonProps}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg {...commonProps}>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10.2 9.3v5.4L15 12l-4.8-2.7z" />
      </svg>
    );
  }

  // TikTok: hình dáng nốt nhạc đơn giản.
  return (
    <svg {...commonProps}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 6.2A4.8 4.8 0 0 0 18.8 11" />
    </svg>
  );
}

// Render một danh sách liên kết có mũi tên trượt ra khi hover.
function LinkList({ links }: { links: FooterLink[] }) {
  return (
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group inline-flex items-center gap-2 text-sm text-stone-400 transition-colors duration-300 hover:text-[#b08d57]"
          >
            {/* Mũi tên: width 0 → w-4 khi hover, tạo cảm giác trượt ra từ trái. */}
            <span
              aria-hidden="true"
              className="w-0 overflow-hidden text-[#b08d57] transition-all duration-300 group-hover:w-4"
            >
              →
            </span>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Icon nhỏ trong cột liên hệ / trust badges: stroke 1.5, kích thước 16px, màu vàng đồng.
function ContactIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[#b08d57]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}

export default function Footer() {
  return (
    // Footer tối stone-900: "khép lại" trang, tương phản với các section sáng phía trên.
    <footer className="bg-stone-900">
      {/* Đường trang trí trên cùng: gradient trong suốt → vàng đồng → trong suốt. */}
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#b08d57] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* 4 cột chính: 1 cột trên mobile, 2 cột trên tablet, 4 cột trên desktop. */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* CỘT 1: Logo + mô tả + trust badges (bảo hành / giao hàng). */}
          <div>
            <Link
              href="/"
              aria-label="Thanh Nhu — về trang chủ"
              className="mb-6 inline-block transition-opacity duration-300 hover:opacity-90"
            >
              <Image
                src="/logo.jpg"
                alt="Thanh Nhu"
                width={44}
                height={44}
                className="object-contain rounded-full"
              />
              <span
                className={`${cormorant.className} block text-2xl font-bold tracking-wide text-[#faf9f7] lg:text-3xl`}
              >
                Thanh Nhu
              </span>
              <span
                className={`${inter.className} mt-1 block text-[10px] font-medium uppercase tracking-[4px] text-[#b08d57]`}
              >
                Nội Thất Cao Cấp
              </span>
            </Link>

            <p className={`${inter.className} mb-6 max-w-xs text-sm leading-relaxed text-stone-400`}>
              Mang đến không gian sống đẳng cấp với những sản phẩm nội thất gỗ tự
              nhiên, được chế tác tinh xảo bởi những nghệ nhân hàng đầu Việt Nam.
            </p>

            <div className={`${inter.className} flex items-center gap-3 text-xs text-stone-500`}>
              <span className="flex items-center gap-1.5">
                <ContactIcon>
                  <path d="M12 3 5 6v5.5c0 4.2 2.9 8.1 7 9.5 4.1-1.4 7-5.3 7-9.5V6l-7-3z" />
                  <path d="M9.5 12.2l1.8 1.8 3.4-3.6" />
                </ContactIcon>
                Bảo hành 5 năm
              </span>
              <span aria-hidden="true" className="h-3 w-px bg-stone-700" />
              <span className="flex items-center gap-1.5">
                <ContactIcon>
                  <path d="M3 6h11v9H3zM14 9h3.5l3 3v3H14z" />
                  <circle cx="7" cy="17.5" r="1.5" />
                  <circle cx="17" cy="17.5" r="1.5" />
                </ContactIcon>
                Giao hàng toàn quốc
              </span>
            </div>
          </div>

          {/* CỘT 2: Liên kết nhanh. */}
          <nav aria-label="Khám phá">
            <h4
              className={`${cormorant.className} mb-6 text-lg font-semibold tracking-wide text-[#faf9f7]`}
            >
              Khám Phá
            </h4>
            <LinkList links={quickLinks} />
          </nav>

          {/* CỘT 3: Chính sách. */}
          <nav aria-label="Chính sách">
            <h4
              className={`${cormorant.className} mb-6 text-lg font-semibold tracking-wide text-[#faf9f7]`}
            >
              Chính Sách
            </h4>
            <LinkList links={policyLinks} />
          </nav>

          {/* CỘT 4: Liên hệ + mạng xã hội. */}
          <div>
            <h4
              className={`${cormorant.className} mb-6 text-lg font-semibold tracking-wide text-[#faf9f7]`}
            >
              Liên Hệ
            </h4>

            {/* address đúng ngữ nghĩa cho thông tin liên hệ của trang. */}
            <address className="not-italic">
              <ul className="mb-8 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5">
                    <ContactIcon>
                      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </ContactIcon>
                  </span>
                  <span className={`${inter.className} text-sm leading-relaxed text-stone-400`}>
                    123 Đường Nguyễn Huệ,
                    <br />
                    Quận 1, TP. Hồ Chí Minh
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <ContactIcon>
                    <path d="M5 3h3.2l1.6 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.6V17a4 4 0 0 1-4.4 4A16 16 0 0 1 3 7.4 4 4 0 0 1 5 3z" />
                  </ContactIcon>
                  <a
                    href="tel:+84901234567"
                    className={`${inter.className} text-sm text-stone-400 transition-colors duration-300 hover:text-[#b08d57]`}
                  >
                    (+84) 90 123 4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <ContactIcon>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3.5 6.5 8.5 6 8.5-6" />
                  </ContactIcon>
                  <a
                    href="mailto:info@thanhnhu.vn"
                    className={`${inter.className} text-sm text-stone-400 transition-colors duration-300 hover:text-[#b08d57]`}
                  >
                    info@thanhnhu.vn
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <ContactIcon>
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7.5V12l3 1.8" />
                  </ContactIcon>
                  <span className={`${inter.className} text-sm text-stone-400`}>
                    T2 - T7: 8:00 - 20:00
                  </span>
                </li>
              </ul>
            </address>

            {/* Kết nối mạng xã hội: khung tròn 40px, hover đổi viền + icon sang vàng đồng. */}
            <div>
              <p
                className={`${inter.className} mb-3 text-xs font-medium uppercase tracking-[2px] text-stone-500`}
              >
                Kết nối
              </p>
              <ul className="flex gap-3">
                {socialLinks.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} của Thanh Nhu`}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 text-stone-400 transition-all duration-300 hover:scale-105 hover:border-[#b08d57] hover:text-[#b08d57]"
                    >
                      <SocialIcon name={social.key} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter: đăng ký nhận thông tin bộ sưu tập mới và ưu đãi. */}
        <div className="mt-12 border-t border-stone-800 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h4
                className={`${cormorant.className} mb-1 text-xl font-semibold text-[#faf9f7]`}
              >
                Nhận Ưu Đãi Đặc Biệt
              </h4>
              <p className={`${inter.className} text-sm text-stone-400`}>
                Đăng ký để nhận thông tin bộ sưu tập mới và ưu đãi độc quyền.
              </p>
            </div>
            {/* Form tĩnh ở server component: dùng action="mailto:" demo, sau này nối API khi cần logic kiểm tra email phức tạp. */}
            <form className="flex w-full gap-2 lg:w-auto" action="#">
              <input
                type="email"
                name="email"
                required
                aria-label="Email của bạn"
                placeholder="Email của bạn"
                className={`${inter.className} flex-1 rounded border border-stone-700 bg-stone-800 px-4 py-3 text-sm text-[#faf9f7] transition-colors duration-300 placeholder:text-stone-500 focus:border-[#b08d57] focus:outline-none lg:w-[280px]`}
              />
              <button
                type="submit"
                className={`${inter.className} whitespace-nowrap rounded bg-[#b08d57] px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#c9a66b]`}
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>

        {/* Copyright + link pháp lý nhỏ ở đáy footer. */}
        <div className="mt-10 border-t border-stone-800 pt-8 pb-4">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className={`${inter.className} text-xs text-stone-500`}>
              © 2026 Thanh Nhu. Tất cả quyền được bảo lưu.
            </p>
            <div className={`${inter.className} flex gap-4 text-xs`}>
              <Link
                href="/chinh-sach/bao-mat"
                className="text-stone-500 transition-colors duration-300 hover:text-[#b08d57]"
              >
                Chính sách bảo mật
              </Link>
              <span aria-hidden="true" className="text-stone-700">
                |
              </span>
              <Link
                href="/chinh-sach/dieu-khoan"
                className="text-stone-500 transition-colors duration-300 hover:text-[#b08d57]"
              >
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}