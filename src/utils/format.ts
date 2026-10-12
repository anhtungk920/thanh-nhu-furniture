// Định dạng giá tiền theo chuẩn Việt Nam: 25.500.000đ
// Dùng chung cho FeaturedProducts và CartSidebar để tránh trùng lặp.
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
};