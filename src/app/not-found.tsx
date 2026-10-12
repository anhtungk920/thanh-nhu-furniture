import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf9f7] px-4 py-16">
      <div className="w-full max-w-2xl text-center">
        <h1
          className={`${cormorant.className} mb-2 text-[120px] font-bold leading-none text-[#b08d57] lg:text-[180px]`}
        >
          404
        </h1>

        <div className="mx-auto mb-8 h-[2px] w-[80px] bg-[#b08d57]" />

        <h2
          className={`${cormorant.className} mb-4 text-3xl font-semibold text-stone-900 lg:text-4xl`}
        >
          Không Tìm Thấy Trang
        </h2>

        <p className="mx-auto mb-10 max-w-lg leading-relaxed text-stone-500">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di
          chuyển. Hãy quay về trang chủ để khám phá bộ sưu tập nội thất cao cấp
          của Thanh Nhu.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#b08d57] px-8 py-4 text-sm font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-[#c9a66b]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            VỀ TRANG CHỦ
          </Link>

          <Link
            href="/san-pham"
            className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-stone-900 bg-transparent px-8 py-4 text-sm font-medium uppercase tracking-[2px] text-stone-900 transition-all duration-300 hover:bg-stone-900 hover:text-white"
          >
            XEM SẢN PHẨM
          </Link>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent" />

        <p className="mt-6 text-xs text-stone-400">
          Cần hỗ trợ? Gọi{" "}
          <a
            href="tel:+84901234567"
            className="text-[#b08d57] hover:underline"
          >
            (+84) 90 123 4567
          </a>{" "}
          hoặc email{" "}
          <a
            href="mailto:info@thanhnhu.vn"
            className="text-[#b08d57] hover:underline"
          >
            info@thanhnhu.vn
          </a>
        </p>
      </div>
    </main>
  );
}