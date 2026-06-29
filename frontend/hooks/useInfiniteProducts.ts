"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { fetchProducts } from "@/lib/api";
import { Filters, Product } from "@/types";

export function useInfiniteProducts(
  initialProducts: Product[],
  initialHasMore: boolean,
  filters: Filters
) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  const filtersKey = JSON.stringify(filters);
  const prevFiltersKey = useRef(filtersKey);

  // When SSR re-renders with new filters, reset client state
  useEffect(() => {
    if (prevFiltersKey.current !== filtersKey) {
      prevFiltersKey.current = filtersKey;
      setProducts(initialProducts);
      setHasMore(initialHasMore);
      setPage(2);
    }
  }, [filtersKey, initialProducts, initialHasMore]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetchProducts({ ...filters, page, limit: 12 });
      setProducts((prev) => [...prev, ...res.data]);
      setHasMore(res.meta.hasMore);
      setPage((p) => p + 1);
    } catch (err) {
      console.error("Failed to load more products", err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, filters, page]);

  return { products, loadMore, hasMore, loading };
}
