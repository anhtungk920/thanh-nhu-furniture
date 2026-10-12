import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sản Phẩm Nội Thất Gỗ Cao Cấp | Thanh Nhu',
  description: 'Khám phá bộ sưu tập nội thất gỗ tự nhiên cao cấp: sofa, bàn, ghế, giường, tủ, đèn trang trí. Thiết kế tinh xảo, chất lượng vượt trội.',
};

export default function SanPhamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}