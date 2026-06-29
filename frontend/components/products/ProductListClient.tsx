"use client";

import { useEffect } from "react";
import { Filters, Product } from "@/types";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import ProductGrid from "./ProductGrid";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger";
import { PackageSearch } from "lucide-react";

interface Props {
  initialProducts: Product[];
  initialHasMore: boolean;
  filters: Filters;
}

export default function ProductListClient({ initialProducts, initialHasMore, filters }: Props) {
  const { products, loadMore, hasMore, loading } = useInfiniteProducts(
    initialProducts,
    initialHasMore,
    filters
  );

  if (products.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch className="w-14 h-14 text-gray-300 mb-4" />
        <h2 className="text-lg font-semibold text-gray-700">No products found</h2>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Showing {products.length} product{products.length !== 1 ? "s" : ""}
      </p>
      <ProductGrid products={products} />
      <InfiniteScrollTrigger onIntersect={loadMore} hasMore={hasMore} loading={loading} />
    </div>
  );
}
