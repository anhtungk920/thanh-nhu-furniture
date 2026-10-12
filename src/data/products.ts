// Kểu dữ liệu sản phẩm dùng chung cho toàn bộ trang (trang chủ, danh sách, chi tiết, thanh toán).
export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images?: string[]; // gallery ảnh cho trang chi tiết
  description?: string; // mô tả dài
  badge?: "bestseller" | "new" | "sale";
  material?: string; // chất liệu
  dimensions?: string; // kích thước
  warranty?: string; // bảo hành
  inStock?: boolean; // còn hàng
}

// Danh mục sản phẩm dùng chung cho trang danh sách và bộ lọc.
export const categories = [
  "Phòng Khách",
  "Phòng Bếp",
  "Phòng Ngủ",
  "Phòng Làm Việc",
  "Đèn Trang Trí",
  "Kệ & Tủ",
];

// Danh mục sản phẩm Thanh Nhu.
export const products: Product[] = [
  {
    id: 9,
    slug: "sofa-vang-pure-line-224",
    name: "Sofa Văng 2.24m Bọc Da Hiện Đại Pure Line 2.24",
    category: "Phòng Khách",
    price: 35000000,
    salePrice: 32500000,
    rating: 5.0,
    reviewCount: 42,
    image: "/products/pure-line-224.jpg",
    images: ["/products/pure-line-224.jpg"],
    description: "Sofa văng 2.24m bọc da cao cấp phong cách hiện đại. Thiết kế tối giản với đường nét mềm mại, khung gỗ tự nhiên chắc chắn, đệm mút đàn hồi cao cấp mang lại cảm giác êm ái tuyệt đối.",
    material: "Da bò Ý cao cấp + Khung gỗ tự nhiên",
    dimensions: "Dài 2240 x Sâu 950 x Cao 780 mm",
    warranty: "5 năm",
    badge: "new",
    inStock: true,
  },
  {
    id: 10,
    slug: "ghe-ban-dao-breeze-natural-oak",
    name: "Ghế Bàn Đảo Breeze Natural Oak",
    category: "Phòng Bếp",
    price: 4500000,
    rating: 4.9,
    reviewCount: 28,
    image: "/products/breeze-natural-oak.jpg",
    images: ["/products/breeze-natural-oak.jpg"],
    description: "Ghế bàn đảo Breeze làm từ gỗ sồi tự nhiên (Natural Oak) với thiết kế lưng cong ergonomic. Đệm ngồi bọc vải linen êm ái, chân gỗ chắc chắn. Phù hợp cho bàn đảo bếp, quầy bar, hoặc không gian bếp hiện đại.",
    material: "Gỗ sồi Natural Oak + Vải linen",
    dimensions: "530 x 1000 mm",
    warranty: "3 năm",
    badge: "new",
    inStock: true,
  },
  {
    id: 11,
    slug: "sofa-vang-prime-comfort-19",
    name: "Sofa Văng Dài 1.9m Bọc Da Tựa Gật Gù Prime Comfort 1.9",
    category: "Phòng Khách",
    price: 30900000,
    salePrice: 28900000,
    rating: 4.9,
    reviewCount: 56,
    image: "/products/prime-comfort-19.jpg",
    images: ["/products/prime-comfort-19.jpg"],
    description: "Sofa văng dài 1.9m với tựa đầu gật gù điều chỉnh 3 nấc, bọc da cao cấp màu kem thanh lịch. Kết hợp gối trang trí nhiều màu sắc. Phù hợp phòng khách căn hộ hiện đại.",
    material: "Da bò cao cấp + Khung gỗ sồi",
    dimensions: "Dài 1900 x Sâu 900 x Cao 850 mm",
    warranty: "5 năm",
    badge: "sale",
    inStock: true,
  },
  {
    id: 1,
    slug: "ghe-sofa-go-oc-cho",
    name: "Ghế Sofa Gỗ Óc Chó",
    category: "Phòng Khách",
    price: 25500000,
    rating: 4.9,
    reviewCount: 124,
    badge: "bestseller",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80",
    ],
    description:
      "Ghế sofa gỗ óc chó tự nhiên với khung gỗ chắc chịn và lớp đệm mút cao cấp. Thiết kế tối giản hiện đại phù hợp cho phòng khách sang trọng. Bề mặt gỗ được sơn PU bảo vệ, chống xước và dễ lau chùi trong suốt thời gian sử dụng.",
    material: "Gỗ óc chó tự nhiên, đệm mút, vải nỉ cao cấp",
    dimensions: "Dài 220cm x Rộng 90cm x Cao 80cm",
    warranty: "5 năm",
    inStock: true,
  },
  {
    id: 2,
    slug: "ban-tra-go-soi",
    name: "Bàn Trà Gỗ Sồi",
    category: "Phòng Khách",
    price: 8900000,
    salePrice: 7500000,
    rating: 4.7,
    reviewCount: 89,
    badge: "sale",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1611967164521-abae8fba4668?w=1200&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&q=80",
    ],
    description:
      "Bàn trà gỗ sồi tự nhiên mang vẻ ấm cúng, bền bỉ với vân gỗ độc đáo từng tấm. Mặt bàn phẳng chịu lực tốt, chân bàn chắc chịn có thể chịu tải lớn. Hoàn hảo cho không gian phòng khách hoặc làm bàn trà phòng đọc.",
    material: "Gỗ sồi tự nhiên",
    dimensions: "Dài 120cm x Rộng 60cm x Cao 45cm",
    warranty: "5 năm",
    inStock: true,
  },
  {
    id: 3,
    slug: "den-san-go-tu-nhien",
    name: "Đèn Sàn Gỗ Tự Nhiên",
    category: "Đèn Trang Trí",
    price: 4200000,
    rating: 4.8,
    reviewCount: 56,
    badge: "new",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1200&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1200&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=1200&q=80",
    ],
    description:
      "Đèn sàn gỗ tự nhiên với tay đèn vô địch thu hút ánh sáng ấm áp. Chân đèn chắc chịn giữ cân bằng, bóng LED tiết kiệm điện và bền lâu. Tạo điểm nhấn trang trí ấn tượng cho góc phòng khách hoặc phòng đọc sách.",
    material: "Gỗ tự nhiên, kim loại, vải",
    dimensions: "Cao 150cm x Đường kính chao 40cm",
    warranty: "2 năm",
    inStock: true,
  },
  {
    id: 4,
    slug: "ke-sach-go-thong-5-tang",
    name: "Kệ Sách Gỗ Thông 5 Tầng",
    category: "Kệ & Tủ",
    price: 6800000,
    rating: 4.6,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
      "https://images.unsplash.com/photo-1588279102819-f4220efe55a6?w=1200&q=80",
    ],
    description:
      "Kệ sách gỗ thông 5 tầng thiết kế thông minh giúp tối ưu không gian lưu trữ. Khung gỗ chắc chịn, các tầng kệ rộng rãi đựng được nhiều sách, đồ trang trí. Màu gỗ tự nhiên tạo cảm giác ấm cúng cho không gian làm việc.",
    material: "Gỗ thông tự nhiên",
    dimensions: "Cao 180cm x Rộng 80cm x Sâu 30cm",
    warranty: "3 năm",
    inStock: true,
  },
  {
    id: 5,
    slug: "tu-quan-ao-go-tan-bi",
    name: "Tủ Quần Áo Gỗ Tần Bì",
    category: "Phòng Ngủ",
    price: 18500000,
    salePrice: 15900000,
    rating: 4.8,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&q=80",
      "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=1200&q=80",
    ],
    description:
      "Tủ quần áo gỗ tần bì chắc chịn với thiết kế cửa cánh thông minh, ngăn kéo có ray âm. Bề mặt gỗ chống ẩm, chống mốc. Dung tích lớn giúp bạn sắp xếp quần áo gọn gàng, ngay ngắn trong phòng ngủ.",
    material: "Gỗ tần bì tự nhiên",
    dimensions: "Cao 210cm x Rộng 120cm x Sâu 60cm",
    warranty: "5 năm",
    inStock: true,
  },
  {
    id: 6,
    slug: "giuong-ngu-go-oc-cho",
    name: "Giường Ngủ Gỗ Óc Chó",
    category: "Phòng Ngủ",
    price: 32000000,
    rating: 5.0,
    reviewCount: 142,
    badge: "bestseller",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80",
    ],
    description:
      "Giường ngủ gỗ óc chó chắc chịn với khung liền mạch, chịu tải tốt, không kêu kết cấu. Vân gỗ tự nhiên tạo nét ấm và thanh lịch cho căn phòng ngủ. Kết hợp hoàn hảo với nệm và gối êm mềm cho giấc ngủ sâu.",
    material: "Gỗ óc chó tự nhiên",
    dimensions: "Giường Queen 160cm x 200cm, Cao đầu giường 100cm",
    warranty: "5 năm",
    inStock: true,
  },
  {
    id: 7,
    slug: "ban-lam-viec-go-soi",
    name: "Bàn Làm Việc Gỗ Sồi",
    category: "Phòng Làm Việc",
    price: 9500000,
    rating: 4.7,
    reviewCount: 68,
    badge: "new",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80",
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80",
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1200&q=80",
    ],
    description:
      "Bàn làm việc gỗ sồi tự nhiên với mặt bàn rộng rãi, thoáng gió cho không gian làm việc sáng tạo. Chân bàn chắc chịn chịu tải và ổn định, không rung khi gõ bàn phím. Phù hợp làm việc tại nhà hoặc văn phòng.",
    material: "Gỗ sồi tự nhiên",
    dimensions: "Dài 140cm x Rộng 70cm x Cao 75cm",
    warranty: "5 năm",
    inStock: true,
  },
  {
    id: 8,
    slug: "sofa-goc-chu-l-go-tu-nhien",
    name: "Sofa Góc Chữ L Gỗ Tự Nhiên",
    category: "Phòng Khách",
    price: 38000000,
    salePrice: 34500000,
    rating: 4.9,
    reviewCount: 156,
    badge: "bestseller",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&q=80",
    ],
    description:
      "Sofa góc chữ L với khung gỗ tự nhiên chắc chịn, đệm mút dày êm tạo cảm giác thư giãn tuyệt đối. Thiết kế góc L tận dụng tối đa không gian, phù hợp phòng khách rộng hoặc không gian sinh hoạt chung. Lớp vải bọc cao cấp dễ tháo vệ sinh.",
    material: "Gỗ tự nhiên, đệm mút, vải bọc cao cấp",
    dimensions: "Dài 300cm x Rộng 200cm x Cao 80cm",
    warranty: "5 năm",
    inStock: false,
  },
];
