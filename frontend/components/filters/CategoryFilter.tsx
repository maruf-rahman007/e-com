"use client";

import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
  categories: Category[];
  selected: string;
  onChange: (slug: string) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Category
      </h3>
      <ul className="space-y-1">
        <li>
          <button
            onClick={() => onChange("")}
            className={cn(
              "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
              !selected
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            All categories
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <button
              onClick={() => onChange(cat.slug === selected ? "" : cat.slug)}
              className={cn(
                "w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
                selected === cat.slug
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
