import type { Metadata } from "next";
import { products } from "@/data/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return { title: "Không tìm thấy sản phẩm | Thanh Nhu" };
  }

  const description =
    product.description ??
    `${product.name} — ${product.category} từ Thanh Nhu Nội Thất.`;

  return {
    title: `${product.name} | Thanh Nhu Nội Thất`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [{ url: product.image, width: 800, height: 800, alt: product.name }],
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [product.image],
    },
  };
}

export default function ProductSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}