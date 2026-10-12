import HeroTypography from "@/components/HeroTypography";
import ProductCategories from "@/components/ProductCategories";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col">
        {/* Hero typography — lớp chữ gắn dính, nền ảnh mờ dần khi cuộn */}
        <HeroTypography />
        {/* Danh mục sản phẩm — bento grid nằm ngay dưới hero */}
        <ProductCategories />
        {/* Dịch vụ thiết kế & thi công trọn gói — lưới 3 card trình bày */}
        <Services />
        {/* Bộ sưu tập dự án thi công */}
        <Projects />
        {/* Sản phẩm nổi bật — drag carousel kéo ngang, khác hẳn bento grid phía trên */}
        <FeaturedProducts />
      </main>
      {/* Chân trang tối màu, khép lại trang sau các section sáng */}
      <Footer />
    </>
  );
}
