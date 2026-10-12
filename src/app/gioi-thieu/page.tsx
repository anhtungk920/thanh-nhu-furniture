import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const stats = [
  { value: "15+", label: "Năm kinh nghiệm" },
  { value: "500+", label: "Dự án hoàn thành" },
  { value: "3.000m²", label: "Xưởng sản xuất" },
  { value: "100%", label: "Khách hàng hài lòng" },
];

const steps = [
  {
    number: "01",
    title: "Khảo Sát & Tư Vấn Miễn Phí",
    description: "Đội ngũ KTS đến tận nơi khảo sát hiện trạng, lắng nghe mong muốn và tư vấn giải pháp tối ưu theo ngân sách của gia chủ.",
  },
  {
    number: "02",
    title: "Thiết Kế 3D Bespoke",
    description: "Bản vẽ 3D siêu thực từng góc máy, phối cảnh vật liệu và ánh sáng. Chỉnh sửa không giới hạn cho đến khi gia chủ hài lòng 100%.",
  },
  {
    number: "03",
    title: "Sản Xuất Tại Xưởng 3.000m²",
    description: "Gia công trực tiếp tại xưởng với máy CNC châu Âu. Gỗ nguyên khối chuẩn FAS, phủ dầu tự nhiên an toàn sức khỏe.",
  },
  {
    number: "04",
    title: "Lắp Đặt & Bàn Giao",
    description: "Đội thợ chuyên nghiệp lắp đặt tận nơi, dọn dẹp sạch sẽ. Nghiệm thu cùng gia chủ và kích hoạt bảo hành 5 năm chính hãng.",
  },
];

const values = [
  {
    title: "Chất Lượng Thượng Hạng",
    description:
      "Gỗ tự nhiên tuyển chọn kỹ lưỡng, xử lý chống cong vênh mối mọt và hoàn thiện thủ công tỉ mỉ trong từng đường nét.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.8 13.5 7 21l5-2.4L17 21l-1.8-7.5" />
      </svg>
    ),
  },
  {
    title: "Thiết Kế Cá Nhân Hóa",
    description:
      "Mỗi không gian đều được đo ni đóng giày theo thói quen sinh hoạt, gu thẩm mỹ và ngân sách riêng của từng gia đình.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="12.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="11" r="1" fill="currentColor" stroke="none" />
        <path d="M12 20.5c-1.5-1.6-2-3-1.4-4.5.5-1.3 2-1.8 3.4-1.5" />
      </svg>
    ),
  },
  {
    title: "Bảo Hành Dài Lâu",
    description:
      "Chính sách bảo hành minh bạch, bảo trì định kỳ và đội ngũ chăm sóc luôn đồng hành cùng bạn sau khi nhận bàn giao.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 5 6v5.5c0 4.2 2.9 8.1 7 9.5 4.1-1.4 7-5.3 7-9.5V6l-7-3z" />
        <path d="M9.5 12.2l1.8 1.8 3.4-3.6" />
      </svg>
    ),
  },
];

export default function GioiThieuPage() {
  return (
    <>
      <main className="bg-[#faf9f7]">
        {/* Hero */}
        <section className="border-b border-stone-100 bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-stone-400" aria-label="Đường dẫn trang">
              <Link href="/" className="transition-colors hover:text-[#b08d57]">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-stone-900">Giới thiệu</span>
            </nav>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
              VỀ CHÚNG TÔI
            </p>
            <h1 className={`${cormorant.className} mb-3 text-4xl font-semibold text-stone-900 lg:text-5xl`}>
              Câu Chuyện Thanh Nhu
            </h1>
            <div className="mb-4 h-[2px] w-[60px] bg-[#b08d57]" />
            <p className="max-w-2xl leading-relaxed text-stone-500">
              Hơn 15 năm gắn bó với gỗ tự nhiên, Thanh Nhu kiến tạo những không gian
              sống ấm cúng, bền vững và đậm dấu ấn cá nhân cho hàng trăm gia đình Việt.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-[#faf9f7] py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[4px] text-[#b08d57]">
                HÀNH TRÌNH TẠO DỰNG
              </p>
              <h2 className={`${cormorant.className} text-3xl font-semibold text-stone-900`}>
                10+ Năm Khẳng Định Đẳng Cấp Kiến Trúc Biệt Thự
              </h2>
              <div className="mt-4 space-y-4 leading-relaxed text-stone-500">
                <p>
                  Thành lập từ năm 2014, Thanh Nhu tự hào sở hữu xưởng sản xuất trực tiếp rộng 3.000m² tại Bình Dương, cùng đội ngũ nghệ nhân hơn 50 người với hơn 15 năm kinh nghiệm chế tác gỗ cao cấp. Chúng tôi chuyên sâu vào phân khúc biệt thự, penthouse và căn hộ hạng sang.
                </p>
                <p>
                  Với tôn chỉ &quot;Chất lượng tạo nên đẳng cấp&quot;, mỗi sản phẩm của Thanh Nhu là sự kết hợp hoàn hảo giữa kỹ thuật chế tác truyền thống và công nghệ CNC hiện đại. Từ khâu chọn gỗ nguyên khối, xử lý tẩm sấy đến hoàn thiện bề mặt, tất cả đều được kiểm soát nghiêm ngặt theo tiêu chuẩn châu Âu.
                </p>
                <p>
                  Chúng tôi tin rằng nội thất không chỉ là đồ đạc — đó là linh hồn của không gian sống. Vì vậy, mỗi dự án tại Thanh Nhu đều được cá nhân hóa 100%, phản ánh phong cách riêng và câu chuyện của từng gia chủ.
                </p>
              </div>
            </div>
            <div className="relative pb-12 pl-8 sm:pb-16 sm:pl-12">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Biệt thự sang trọng do Thanh Nhu thiết kế nội thất"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-1/2 overflow-hidden rounded-2xl border-8 border-white bg-stone-200 shadow-xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                    alt="Phòng khách với nội thất gỗ cao cấp"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className={`${cormorant.className} text-center text-3xl font-semibold text-stone-900 lg:text-4xl`}>
              Giá Trị Cốt Lõi
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-stone-100 bg-[#faf9f7] p-8 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#b08d57]/10 text-[#b08d57]">
                    {value.icon}
                  </div>
                  <h3 className={`${cormorant.className} text-xl font-semibold text-stone-900`}>
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quy trình làm việc 4 bước */}
        <section className="bg-white py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
              QUY TRÌNH LÀM VIỆC CHUẨN KỸ THUẬT
            </p>
            <h2 className={`${cormorant.className} mt-3 text-center text-3xl font-semibold text-stone-900 lg:text-4xl`}>
              Quy Trình Thi Công Nội Thất Trọn Gói 4 Bước
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-[60px] bg-[#b08d57]" />
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl bg-[#faf9f7] p-6 transition-all hover:shadow-lg"
                >
                  <p className={`${cormorant.className} mb-3 text-4xl text-[#b08d57]`}>
                    {step.number}
                  </p>
                  <h3 className={`${cormorant.className} mb-2 text-lg font-semibold text-stone-900`}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-stone-900 py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:px-6 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className={`${cormorant.className} text-4xl text-[#b08d57] lg:text-5xl`}>
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-stone-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}