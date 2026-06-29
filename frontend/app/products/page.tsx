import type { Metadata } from "next";
import { Suspense } from "react";
import { fetchProducts, fetchCategories } from "@/lib/api";
import { Filters } from "@/types";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductListClient from "@/components/products/ProductListClient";
import { ProductGridSkeleton } from "@/components/products/ProductSkeleton";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full catalog of products",
};

interface Props {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters: Filters = {
    search: params.search ?? "",
    category: params.category ?? "",
    minPrice: params.minPrice ?? "",
    maxPrice: params.maxPrice ?? "",
  };

  const [productsRes, categoriesRes] = await Promise.all([
    fetchProducts({ ...filters, page: 1, limit: 12 }, true),
    fetchCategories(true),
  ]);

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sticky sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-r border-gray-200 bg-white p-5">
        <Suspense>
          <FilterSidebar categories={categoriesRes.data} currentFilters={filters} />
        </Suspense>
      </aside>

      {/* Product grid area */}
      <div className="flex-1 p-5 lg:p-6 min-w-0">
        {/* Mobile filter disclosure (simplified — just shows category buttons) */}
        <div className="lg:hidden mb-4">
          <Suspense>
            <FilterSidebar categories={categoriesRes.data} currentFilters={filters} />
          </Suspense>
        </div>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductListClient
            initialProducts={productsRes.data}
            initialHasMore={productsRes.meta.hasMore}
            filters={filters}
          />
        </Suspense>
      </div>
    </div>
  );
}
