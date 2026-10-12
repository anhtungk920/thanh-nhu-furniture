import type { Metadata } from "next";
import { projects } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return { title: "Không tìm thấy dự án | Thanh Nhu" };
  }

  const description = project.description;

  return {
    title: `${project.name} | Thanh Nhu Nội Thất`,
    description,
    openGraph: {
      title: project.name,
      description,
      images: [{ url: project.image, width: 800, height: 800, alt: project.name }],
      type: "website",
      locale: "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description,
      images: [project.image],
    },
  };
}

export default function ProjectSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}