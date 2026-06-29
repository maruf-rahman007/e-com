import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchProductById, fetchAllProductIds } from "@/lib/api";
import ProductImages from "@/components/products/ProductImages";
import ProductDetailInfo from "@/components/products/ProductDetailInfo";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const ids = await fetchAllProductIds(true);
    return ids.map((id) => ({ id: String(id) }));
  } catch {
    // Backend unavailable at build time — pages will render on-demand
    return [];
  }
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params;
    const { data } = await fetchProductById(Number(id), true);
    return {
      title: data.title,
      description: data.description ?? undefined,
      openGraph: {
        images: data.thumbnail ? [data.thumbnail] : [],
      },
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  try {
    const { data: product } = await fetchProductById(Number(id), true);

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: images */}
          <ProductImages
            images={product.images}
            thumbnail={product.thumbnail}
            title={product.title}
          />

          {/* Right: details */}
          <ProductDetailInfo product={product} />
        </div>
      </div>
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "PRODUCT_NOT_FOUND") notFound();
    throw err;
  }
}
