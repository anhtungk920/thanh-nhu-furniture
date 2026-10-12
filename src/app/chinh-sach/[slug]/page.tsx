import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

interface PolicyContent {
  title: string;
  subtitle: string;
  intro: string;
  sections: { heading: string; content: string[] }[];
}

const policies: Record<string, PolicyContent> = {
  "doi-tra": {
    title: "Chính Sách Đổi Trả",
    subtitle: "ĐỔI TRẢ",
    intro:
      "Thanh Nhu cam kết mang đến trải nghiệm mua sắm an tâm với chính sách đổi trả linh hoạt trong vòng 30 ngày.",
    sections: [
      {
        heading: "1. Điều Kiện Đổi Trả",
        content: [
          "Sản phẩm còn nguyên tem, nhãn mác, chưa qua sử dụng và không có dấu hiệu hư hỏng do người dùng.",
          "Thời gian đổi trả trong vòng 30 ngày kể từ ngày nhận hàng.",
          "Có hóa đơn mua hàng hoặc mã đơn hàng hợp lệ.",
          "Sản phẩm bị lỗi từ nhà sản xuất hoặc không đúng mô tả.",
        ],
      },
      {
        heading: "2. Quy Trình Đổi Trả",
        content: [
          "Bước 1: Liên hệ hotline (+84) 90 123 4567 hoặc email info@thanhnhu.vn để thông báo yêu cầu đổi trả.",
          "Bước 2: Cung cấp hình ảnh/video sản phẩm và lý do đổi trả.",
          "Bước 3: Thanh Nhu xác nhận trong vòng 24h và sắp xếp thu hồi sản phẩm.",
          "Bước 4: Đổi sản phẩm mới hoặc hoàn tiền trong 3-5 ngày làm việc.",
        ],
      },
      {
        heading: "3. Chi Phí Đổi Trả",
        content: [
          "Miễn phí đổi trả nếu lỗi từ nhà sản xuất hoặc giao sai sản phẩm.",
          "Khách hàng chịu phí vận chuyển nếu đổi trả do nhu cầu cá nhân.",
        ],
      },
    ],
  },
  "bao-hanh": {
    title: "Bảo Hành Sản Phẩm",
    subtitle: "BẢO HÀNH",
    intro: "Tất cả sản phẩm Thanh Nhu đều được bảo hành chính hãng theo tiêu chuẩn cao cấp.",
    sections: [
      {
        heading: "1. Thời Gian Bảo Hành",
        content: [
          "Sofa, giường ngủ, tủ quần áo: 5 năm.",
          "Bàn, ghế, kệ sách: 3 năm.",
          "Đèn trang trí: 2 năm.",
          "Phụ kiện đi kèm: 12 tháng.",
        ],
      },
      {
        heading: "2. Phạm Vi Bảo Hành",
        content: [
          "Lỗi kết cấu: mối mọt, nứt gãy gỗ, hỏng khung.",
          "Lỗi bề mặt: bong tróc sơn, phai màu, hỏng vải bọc.",
          "Lỗi cơ khí: tay nắm, ray trượt, bản lề.",
        ],
      },
      {
        heading: "3. Trường Hợp Không Bảo Hành",
        content: [
          "Sản phẩm hư hỏng do va đập, ngập nước hoặc sử dụng sai cách.",
          "Tự ý sửa chữa bởi bên thứ ba.",
          "Hao mòn tự nhiên sau thời gian dài sử dụng.",
        ],
      },
    ],
  },
  "van-chuyen": {
    title: "Vận Chuyển & Giao Hàng",
    subtitle: "VẬN CHUYỂN",
    intro:
      "Thanh Nhu cung cấp dịch vụ vận chuyển toàn quốc với đội ngũ giao hàng chuyên nghiệp, đảm bảo sản phẩm nguyên vẹn.",
    sections: [
      {
        heading: "1. Phí Vận Chuyển",
        content: [
          "Miễn phí vận chuyển cho đơn hàng từ 10.000.000đ.",
          "Đơn hàng dưới 10 triệu: phí 500.000đ toàn quốc.",
          "Khu vực TP.HCM, Hà Nội: giao trong 1-3 ngày.",
          "Các tỉnh thành khác: giao trong 3-7 ngày.",
        ],
      },
      {
        heading: "2. Quy Trình Giao Hàng",
        content: [
          "Bước 1: Xác nhận đơn hàng qua điện thoại trong vòng 2 giờ.",
          "Bước 2: Đóng gói cẩn thận với vật liệu chống sốc.",
          "Bước 3: Giao hàng và kiểm tra sản phẩm cùng khách hàng.",
          "Bước 4: Ký biên bản bàn giao.",
        ],
      },
      {
        heading: "3. Lắp Đặt",
        content: [
          "Miễn phí lắp đặt tại TP.HCM và Hà Nội.",
          "Tỉnh thành khác: phí lắp đặt từ 300.000đ - 800.000đ tùy khoảng cách.",
        ],
      },
    ],
  },
  "thanh-toan": {
    title: "Hướng Dẫn Thanh Toán",
    subtitle: "THANH TOÁN",
    intro: "Thanh Nhu hỗ trợ đa dạng phương thức thanh toán linh hoạt, an toàn và tiện lợi.",
    sections: [
      {
        heading: "1. Phương Thức Thanh Toán",
        content: [
          "COD — Thanh toán tiền mặt khi nhận hàng (miễn phí).",
          "Chuyển khoản ngân hàng — Vietcombank, STK 1234 5678 9012, Chủ TK: CÔNG TY TNHH THANH NHU.",
          "Thẻ tín dụng/ghi nợ — Visa, Mastercard (sắp ra mắt).",
          "Ví điện tử — Momo, ZaloPay (sắp ra mắt).",
        ],
      },
      {
        heading: "2. Lưu Ý Khi Thanh Toán",
        content: [
          "Với chuyển khoản: ghi rõ nội dung THANHNHU + Số điện thoại để xác nhận nhanh.",
          "Với COD: vui lòng chuẩn bị tiền mặt đúng số tiền đơn hàng.",
          "Xuất hóa đơn VAT theo yêu cầu (vui lòng ghi chú khi đặt hàng).",
        ],
      },
    ],
  },
  faq: {
    title: "Câu Hỏi Thường Gặp",
    subtitle: "FAQ",
    intro: "Tổng hợp những câu hỏi phổ biến nhất từ khách hàng của Thanh Nhu.",
    sections: [
      {
        heading: "Sản phẩm của Thanh Nhu có phải gỗ tự nhiên 100% không?",
        content: [
          "Có. Tất cả sản phẩm đều làm từ gỗ tự nhiên nguyên khối (gỗ óc chó, gỗ sồi, gỗ tần bì, gỗ thông), được nhập khẩu và kiểm định theo tiêu chuẩn FAS.",
        ],
      },
      {
        heading: "Thời gian sản xuất một bộ nội thất là bao lâu?",
        content: [
          "Thời gian sản xuất trung bình từ 30-45 ngày tùy độ phức tạp. Với dự án lớn, có thể kéo dài 60-90 ngày.",
        ],
      },
      {
        heading: "Có thể tùy chỉnh kích thước, màu sắc không?",
        content: [
          "Có. Thanh Nhu nhận thiết kế và gia công theo yêu cầu (bespoke). Khách hàng có thể tùy chọn kích thước, màu gỗ, chất liệu vải bọc, phụ kiện.",
        ],
      },
      {
        heading: "Thanh Nhu có nhận thi công trọn gói không?",
        content: [
          "Có. Chúng tôi cung cấp dịch vụ thiết kế + thi công trọn gói cho biệt thự, penthouse, căn hộ cao cấp trên toàn quốc.",
        ],
      },
      {
        heading: "Bảo hành có bao gồm sửa chữa miễn phí không?",
        content: [
          "Có. Mọi lỗi kết cấu và lỗi kỹ thuật trong thời hạn bảo hành đều được sửa chữa hoặc thay mới miễn phí.",
        ],
      },
    ],
  },
  "bao-mat": {
    title: "Chính Sách Bảo Mật",
    subtitle: "BẢO MẬT",
    intro: "Thanh Nhu tôn trọng và bảo vệ tuyệt đối thông tin cá nhân của khách hàng.",
    sections: [
      {
        heading: "1. Thông Tin Thu Thập",
        content: [
          "Họ tên, số điện thoại, email, địa chỉ giao hàng.",
          "Lịch sử mua hàng và sở thích sản phẩm (để tư vấn tốt hơn).",
        ],
      },
      {
        heading: "2. Mục Đích Sử Dụng",
        content: [
          "Xử lý đơn hàng, giao hàng, bảo hành.",
          "Gửi thông tin khuyến mãi, bộ sưu tập mới (nếu khách đồng ý).",
          "Nâng cao chất lượng dịch vụ.",
        ],
      },
      {
        heading: "3. Cam Kết Bảo Mật",
        content: [
          "Không chia sẻ, bán hoặc cho thuê thông tin khách hàng cho bên thứ ba.",
          "Dữ liệu được mã hóa theo tiêu chuẩn SSL/TLS.",
          "Khách hàng có quyền yêu cầu xóa thông tin bất kỳ lúc nào.",
        ],
      },
    ],
  },
  "dieu-khoan": {
    title: "Điều Khoản Sử Dụng",
    subtitle: "ĐIỀU KHOẢN",
    intro: "Khi truy cập và sử dụng website thanhnhu.vn, bạn đồng ý với các điều khoản sau.",
    sections: [
      {
        heading: "1. Quyền Sở Hữu Trí Tuệ",
        content: [
          "Toàn bộ nội dung (hình ảnh, văn bản, thiết kế) thuộc bản quyền Thanh Nhu.",
          "Nghiêm cấm sao chép, sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản.",
        ],
      },
      {
        heading: "2. Trách Nhiệm Người Dùng",
        content: [
          "Cung cấp thông tin chính xác khi đặt hàng.",
          "Không sử dụng website vào mục đích bất hợp pháp.",
          "Không gây tổn hại đến hệ thống và uy tín của Thanh Nhu.",
        ],
      },
      {
        heading: "3. Giải Quyết Tranh Chấp",
        content: [
          "Mọi tranh chấp được giải quyết thông qua thương lượng.",
          "Nếu không đạt thỏa thuận, sẽ đưa ra Tòa án nhân dân TP. Hồ Chí Minh.",
        ],
      },
    ],
  },
};

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];

  if (!policy) {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen bg-[#faf9f7]">
        {/* Hero section */}
        <section className="border-b border-stone-100 bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav className="mb-4 flex items-center gap-2 text-sm text-stone-400">
              <Link href="/" className="transition-colors hover:text-[#b08d57]">
                Trang chủ
              </Link>
              <span>/</span>
              <span className="text-stone-900">{policy.title}</span>
            </nav>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-[4px] text-[#b08d57]">
              {policy.subtitle}
            </p>
            <h1 className="mb-3 font-serif text-3xl font-semibold text-stone-900 lg:text-5xl">
              {policy.title}
            </h1>
            <div className="mb-4 h-[2px] w-[60px] bg-[#b08d57]" />
            <p className="max-w-2xl leading-relaxed text-stone-500">{policy.intro}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-10 rounded-2xl border border-stone-100 bg-white p-8 shadow-sm lg:p-12">
              {policy.sections.map((section, idx) => (
                <div key={idx}>
                  <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900 lg:text-2xl">
                    {section.heading}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((line, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed text-stone-600">
                        <span className="mt-1 flex-shrink-0 text-[#b08d57]">•</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}