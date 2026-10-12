export interface Project {
  id: number;
  name: string;
  category: string;
  location: string;
  area: string;
  image: string;
  slug: string;
  description: string;
  story: string;
  fullDescription?: string;
  style: string;
  year: number;
  duration: string;
  budget: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Lavila Kiến Á — Biệt Thự Liền Kề",
    category: "Biệt Thự Luxury",
    location: "TP. Hồ Chí Minh",
    area: "220m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    slug: "lavila-kien-a",
    description: "Biệt thự liền kề 220m² phong cách Modern Luxury cho gia đình trẻ thành đạt.",
    story:
      "Gia chủ là cặp vợ chồng trẻ thành đạt, mong muốn một không gian sống hiện đại nhưng ấm cúng. Thanh Nhu đã thiết kế không gian mở, tối ưu ánh sáng tự nhiên, kết hợp gỗ óc chó cao cấp với đá marble trắng Ý. Phòng khách liên thông phòng bếp tạo cảm giác rộng rãi, sang trọng nhưng không xa cách.",
    fullDescription:
      "Gia chủ là cặp vợ chồng trẻ thành đạt, mong muốn một không gian sống hiện đại nhưng ấm cúng. Thanh Nhu đã thiết kế không gian mở, tối ưu ánh sáng tự nhiên, kết hợp gỗ óc chó cao cấp với đá marble trắng Ý. Phòng khách liên thông phòng bếp tạo cảm giác rộng rãi, sang trọng nhưng không xa cách. Hệ tủ bếp kịch trần, đảo bếp marble và sofa da Ý được chế tác đo ni đóng giày theo kích thước thực tế. Ánh sáng vàng ấm, rèm linen và thảm len tạo nên tổ ấm vừa tinh tế vừa gần gũi cho những buổi sum họp gia đình.",
    style: "Modern Luxury",
    year: 2025,
    duration: "90 ngày",
    budget: "2.5 - 3 tỷ",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    ],
  },
  {
    id: 2,
    name: "Lavila Kiến Á — Biệt Thự Liền Kề",
    category: "Biệt Thự Luxury",
    location: "TP. Hồ Chí Minh",
    area: "240m²",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    slug: "lavila-kien-a-2",
    description: "Biệt thự 240m² phong cách Contemporary cho gia đình đa thế hệ.",
    story:
      "Tiếp nối thành công của căn đầu tiên, gia chủ giao trọn căn biệt thự thứ hai cho Thanh Nhu với yêu cầu không gian Contemporary sang trọng cho ba thế hệ. Thiết kế ưu tiên sự riêng tư với phòng master tách biệt, phòng trẻ em ngập nắng và khu sinh hoạt chung ấm cúng với gỗ sồi tự nhiên, kính tràn và mảng xanh ban công.",
    fullDescription:
      "Tiếp nối thành công của căn đầu tiên, gia chủ giao trọn căn biệt thự thứ hai cho Thanh Nhu với yêu cầu không gian Contemporary sang trọng cho ba thế hệ. Thiết kế ưu tiên sự riêng tư với phòng master tách biệt, phòng trẻ em ngập nắng và khu sinh hoạt chung ấm cúng với gỗ sồi tự nhiên, kính tràn và mảng xanh ban công. Thanh Nhu đồng bộ toàn bộ nội thất rời và liền tường, từ hệ tủ âm tường đến bàn ăn gỗ óc chó 8 ghế, đảm bảo công năng, thẩm mỹ và độ bền vượt thời gian cho tổ ấm đông thành viên.",
    style: "Contemporary",
    year: 2025,
    duration: "90 ngày",
    budget: "3 - 3.5 tỷ",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
  },
  {
    id: 3,
    name: "Chung Cư Lacasa",
    category: "Penthouse & Căn Hộ",
    location: "TP. Hồ Chí Minh",
    area: "92m²",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    slug: "chung-cu-lacasa",
    description: "Căn hộ 92m² phong cách Scandinavian tối ưu công năng cho gia đình 3 người.",
    story:
      "Căn hộ 92m² cho gia đình 3 người. Thanh Nhu tối ưu công năng với hệ tủ âm tường, giường có ngăn kéo, bàn làm việc gấp gọn. Tone trắng - gỗ sáng tạo không gian ấm áp, thoáng đãng.",
    fullDescription:
      "Căn hộ 92m² cho gia đình 3 người. Thanh Nhu tối ưu công năng với hệ tủ âm tường, giường có ngăn kéo, bàn làm việc gấp gọn. Tone trắng - gỗ sáng tạo không gian ấm áp, thoáng đãng. Dù diện tích vừa phải, mọi góc đều được khai thác triệt để: ban công thành góc đọc sách, bếp chữ L tích hợp máy rửa bát âm tủ, phòng bé có kệ sách kết hợp bàn học. Vật liệu gỗ thông sáng màu và vải linen mang lại cảm giác Bắc Âu nhẹ nhàng, thư thái sau ngày dài.",
    style: "Scandinavian",
    year: 2025,
    duration: "45 ngày",
    budget: "800 triệu - 1 tỷ",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    ],
  },
  {
    id: 4,
    name: "Biệt Thự Vinhomes Riverside",
    category: "Biệt Thự Luxury",
    location: "Hà Nội",
    area: "350m²",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    slug: "vinhomes-riverside",
    description: "Biệt thự 350m² 3 tầng phong cách Neoclassical đẳng cấp.",
    story:
      "Biệt thự 350m² 3 tầng theo phong cách tân cổ điển. Thanh Nhu chế tác toàn bộ nội thất gỗ óc chó đánh bóng, phào chỉ tinh xảo, đèn chùm pha lê nhập khẩu.",
    fullDescription:
      "Biệt thự 350m² 3 tầng theo phong cách tân cổ điển. Thanh Nhu chế tác toàn bộ nội thất gỗ óc chó đánh bóng, phào chỉ tinh xảo, đèn chùm pha lê nhập khẩu. Từng chi tiết được chạm khắc thủ công: tủ rượu âm tường, cầu thang gỗ cong, phòng khách với lò sưởi giả đá marble. Không gian vừa bề thế, vừa tinh tế, khẳng định vị thế gia chủ và gu thẩm mỹ trường tồn cùng thời gian.",
    style: "Neoclassical",
    year: 2024,
    duration: "120 ngày",
    budget: "4 - 4.5 tỷ",
    gallery: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    ],
  },
  {
    id: 5,
    name: "Resort Fusion Đà Nẵng",
    category: "Khách Sạn & Resort",
    location: "Đà Nẵng",
    area: "1200m²",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    slug: "fusion-resort",
    description: "Khu nghỉ dưỡng 1.200m² phong cách Tropical Resort 5 sao.",
    story:
      "Dự án 1.200m² cho khu nghỉ dưỡng 5 sao. Thanh Nhu cung cấp toàn bộ nội thất gỗ tự nhiên cho 30 phòng villa, kết hợp vật liệu mây tre đan bản địa, tạo không gian nghỉ dưỡng hòa mình thiên nhiên.",
    fullDescription:
      "Dự án 1.200m² cho khu nghỉ dưỡng 5 sao. Thanh Nhu cung cấp toàn bộ nội thất gỗ tự nhiên cho 30 phòng villa, kết hợp vật liệu mây tre đan bản địa, tạo không gian nghỉ dưỡng hòa mình thiên nhiên. Giường canopy gỗ teak, bàn ghế mây, đèn lồng tre và sàn gỗ ngoài trời chịu nước được xử lý kỹ thuật cao, vừa mộc mạc vừa sang trọng. Dự án đòi hỏi tiến độ 180 ngày với đội ngũ thi công túc trực tại công trường để bàn giao đúng mùa du lịch cao điểm.",
    style: "Tropical Resort",
    year: 2024,
    duration: "180 ngày",
    budget: "8 - 10 tỷ",
    gallery: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
    ],
  },
  {
    id: 6,
    name: "Penthouse Vinhomes Central Park",
    category: "Penthouse & Căn Hộ",
    location: "TP. Hồ Chí Minh",
    area: "180m²",
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&q=80",
    slug: "vinhomes-central-park",
    description: "Penthouse 180m² view sông Sài Gòn phong cách Modern Minimalist.",
    story:
      "Penthouse 180m² view sông Sài Gòn. Thanh Nhu thiết kế nội thất tối giản, hệ kính panorama, sofa da Ý, bàn ăn marble. Không gian đỉnh cao cho giới thượng lưu.",
    fullDescription:
      "Penthouse 180m² view sông Sài Gòn. Thanh Nhu thiết kế nội thất tối giản, hệ kính panorama, sofa da Ý, bàn ăn marble. Không gian đỉnh cao cho giới thượng lưu. Toàn bộ nội thất được tiết chế để nhường chỗ cho tầm nhìn panorama: sàn gỗ xương cá, tủ bếp ẩn tay nắm, đảo bếp đá sintered stone và hệ đèn ray nam châm. Phòng ngủ master với bồn tắm view sông là điểm nhấn đắt giá, khẳng định đẳng cấp sống thượng lưu giữa trung tâm thành phố.",
    style: "Modern Minimalist",
    year: 2025,
    duration: "75 ngày",
    budget: "1.5 - 2 tỷ",
    gallery: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add58d1?w=1200&q=80",
    ],
  },
];

