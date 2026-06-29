"use client";

import { Category, Filters } from "@/types";
import { useFilters } from "@/hooks/useFilters";
import SearchInput from "./SearchInput";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  categories: Category[];
  currentFilters: Filters;
}

export default function FilterSidebar({ categories, currentFilters }: Props) {
  const { filters, setFilter, clearFilters } = useFilters();

  const hasActiveFilters =
    filters.search || filters.category || filters.minPrice || filters.maxPrice;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-gray-900">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <SearchInput
        value={filters.search || currentFilters.search}
        onChange={(v) => setFilter("search", v)}
      />

      <CategoryFilter
        categories={categories}
        selected={filters.category || currentFilters.category}
        onChange={(v) => setFilter("category", v)}
      />

      <PriceRangeFilter
        minPrice={filters.minPrice || currentFilters.minPrice}
        maxPrice={filters.maxPrice || currentFilters.maxPrice}
        onMinChange={(v) => setFilter("minPrice", v)}
        onMaxChange={(v) => setFilter("maxPrice", v)}
      />
    </div>
  );
}
