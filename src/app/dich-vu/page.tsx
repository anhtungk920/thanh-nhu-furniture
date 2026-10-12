import Link from "next/link";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function DichVuPage() {
  return (
    <>
      <main className="bg-[#faf9f7]">
        <section className="border-b border-stone-100 bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-stone-400" aria-label="Đường dẫn trang">
              <Link href="/" className="transition-colors hover:text-[#b08d57]">Trang chủ</Link>
              <span>/</span>
              <span className="text-stone-900">Dịch vụ</span>
            </nav>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">DỊCH VỤ</p>
            <h1 className="font-cormorant mb-3 text-4xl font-semibold text-stone-900 lg:text-5xl">
              Dịch Vụ Thiết Kế & Thi Công
            </h1>
            <div className="mb-4 h-[2px] w-[60px] bg-[#b08d57]" />
            <p className="max-w-2xl leading-relaxed text-stone-500">
              Giải pháp nội thất trọn gói từ tư vấn thiết kế đến thi công hoàn thiện, mang đến không gian sống đẳng cấp cho gia đình bạn.
            </p>
          </div>
        </section>

        <Services />
      </main>
      <Footer />
    </>
  );
}