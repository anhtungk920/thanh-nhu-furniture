import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import FloatingButtons from "@/components/FloatingButtons";
import RouteProgress from "@/components/RouteProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Thanh Nhu | Nội Thất Gỗ Cao Cấp",
  description: "Khám phá bộ sưu tập nội thất gỗ tự nhiên cao cấp từ Thanh Nhu — Thiết kế tinh xảo, chất lượng vượt trội cho tổ ấm của bạn.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Thanh Nhu - Nội Thất Gỗ Cao Cấp",
              url: "https://thanhnhu.vn",
              logo: "https://thanhnhu.vn/logo.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Nguyễn Huệ",
                addressLocality: "Quận 1",
                addressRegion: "TP. Hồ Chí Minh",
                addressCountry: "VN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+84901234567",
                contactType: "customer service",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <RouteProgress />
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
        {/* Sidebar giỏ hàng toàn cục: luôn mount, chỉ hiện khi isOpen=true. */}
        <CartSidebar />
        <FloatingButtons />
      </body>
    </html>
  );
}
