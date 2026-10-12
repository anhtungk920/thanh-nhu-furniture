import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <main className="bg-[#faf9f7]">
        {/* A. Hero Section */}
        <section className="relative flex min-h-[500px] items-end h-[70vh]">
          <Image
            src={project.image}
            alt={`${project.name} — ${project.location}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* B. Breadcrumb — nằm đè lên hero */}
          <nav
            aria-label="Đường dẫn trang"
            className="absolute left-0 right-0 top-24 mx-auto max-w-7xl px-4 text-sm text-white/70 lg:top-28 sm:px-6 lg:px-8"
          >
            <Link href="/" className="transition-colors hover:text-[#b08d57]">
              Trang chủ
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href="/du-an" className="transition-colors hover:text-[#b08d57]">
              Dự án
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-white">{project.name}</span>
          </nav>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
            <span className="mb-4 inline-block rounded-sm bg-[#b08d57] px-3 py-1.5 text-xs uppercase tracking-wider text-white">
              {project.category}
            </span>
            <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-white lg:text-6xl">
              {project.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <svg {...iconProps} className="h-4 w-4 shrink-0 text-[#b08d57]">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {project.location}
              </span>
              <span className="flex items-center gap-2">
                <svg {...iconProps} className="h-4 w-4 shrink-0 text-[#b08d57]">
                  <path d="M21.3 8.7L8.7 21.3a1 1 0 01-1.4 0L2.7 16.7a1 1 0 010-1.4L15.3 2.7a1 1 0 011.4 0l4.6 4.6a1 1 0 010 1.4z" />
                  <path d="M7.5 10.5l2 2M10.5 7.5l2 2M13.5 4.5l2 2" />
                </svg>
                {project.area}
              </span>
              <span className="flex items-center gap-2">
                <svg {...iconProps} className="h-4 w-4 shrink-0 text-[#b08d57]">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {project.year}
              </span>
              <span className="flex items-center gap-2">
                <svg {...iconProps} className="h-4 w-4 shrink-0 text-[#b08d57]">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {project.duration}
              </span>
            </div>
          </div>
        </section>

        {/* C. Story Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
              CÂU CHUYỆN DỰ ÁN
            </p>
            <h2
              className={`${cormorant.className} mt-2 text-3xl font-semibold text-stone-900 lg:text-4xl`}
            >
              Hành Trình Kiến Tạo Không Gian
            </h2>
            <div className="mt-4 h-[2px] w-[60px] bg-[#b08d57]" />
            <p className="mt-6 text-base leading-loose text-stone-600 lg:text-lg">
              {project.story}
            </p>
          </div>
        </section>

        {/* D. Specs Grid */}
        <section className="bg-[#faf9f7] py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
                THÔNG TIN DỰ ÁN
              </p>
              <h2 className={`${cormorant.className} mt-2 text-3xl font-semibold text-stone-900`}>
                Chi Tiết Kỹ Thuật
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              <div className="rounded-xl border border-stone-100 bg-white p-6 text-center shadow-sm">
                <svg {...iconProps} className="mx-auto mb-3 h-8 w-8 text-[#b08d57]">
                  <path d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
                  <circle cx="7.5" cy="10.5" r="1" />
                  <circle cx="12" cy="7.5" r="1" />
                  <circle cx="16.5" cy="10.5" r="1" />
                  <circle cx="9" cy="15.5" r="1" />
                  <circle cx="15" cy="15.5" r="1" />
                </svg>
                <p className="mb-1 text-xs uppercase tracking-wider text-stone-400">Phong Cách</p>
                <p className={`${cormorant.className} text-lg font-semibold text-stone-900`}>
                  {project.style}
                </p>
              </div>

              <div className="rounded-xl border border-stone-100 bg-white p-6 text-center shadow-sm">
                <svg {...iconProps} className="mx-auto mb-3 h-8 w-8 text-[#b08d57]">
                  <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
                  <path d="M9 21v-8h6v8" />
                </svg>
                <p className="mb-1 text-xs uppercase tracking-wider text-stone-400">Diện Tích</p>
                <p className={`${cormorant.className} text-lg font-semibold text-stone-900`}>
                  {project.area}
                </p>
              </div>

              <div className="rounded-xl border border-stone-100 bg-white p-6 text-center shadow-sm">
                <svg {...iconProps} className="mx-auto mb-3 h-8 w-8 text-[#b08d57]">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                <p className="mb-1 text-xs uppercase tracking-wider text-stone-400">Thời Gian</p>
                <p className={`${cormorant.className} text-lg font-semibold text-stone-900`}>
                  {project.duration}
                </p>
              </div>

              <div className="rounded-xl border border-stone-100 bg-white p-6 text-center shadow-sm">
                <svg {...iconProps} className="mx-auto mb-3 h-8 w-8 text-[#b08d57]">
                  <path d="M20 7V6a2 2 0 00-2-2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2v-8" />
                  <path d="M16 12l4-3v6l-4-3" />
                  <circle cx="16" cy="12" r="1.5" />
                </svg>
                <p className="mb-1 text-xs uppercase tracking-wider text-stone-400">Ngân Sách</p>
                <p className={`${cormorant.className} text-lg font-semibold text-stone-900`}>
                  {project.budget}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* E. Gallery Section */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
                THƯ VIỆN ẢNH
              </p>
              <h2 className={`${cormorant.className} mt-2 text-3xl font-semibold text-stone-900 lg:text-4xl`}>
                Không Gian Hoàn Thiện
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={image}
                  className={`relative overflow-hidden rounded-2xl group ${
                    index === 0
                      ? "aspect-[16/9] md:col-span-2"
                      : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${project.name} — ảnh ${index + 1}`}
                    fill
                    sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* G. CTA Section */}
        <section className="bg-stone-900 py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className={`${cormorant.className} text-3xl font-semibold text-white lg:text-4xl`}>
              Bạn Muốn Sở Hữu Không Gian Như Thế Này?
            </h2>
            <p className="mb-8 mt-4 text-stone-400">
              Liên hệ Thanh Nhu để được tư vấn thiết kế miễn phí.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center rounded-sm bg-[#b08d57] px-8 py-4 text-sm font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-[#c9a66b]"
              >
                BÁO GIÁ THI CÔNG
              </Link>
              <Link
                href="/du-an"
                className="inline-flex items-center justify-center rounded-sm border border-white px-8 py-4 text-sm font-medium uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-white hover:text-stone-900"
              >
                XEM DỰ ÁN KHÁC
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}