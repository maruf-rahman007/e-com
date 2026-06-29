"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filters } from "@/types";

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: Filters = {
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
  };

  const setFilter = (key: keyof Filters, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("/products");
  };

  return { filters, setFilter, clearFilters };
}
