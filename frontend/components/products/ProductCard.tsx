import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-4xl">📦</div>
        )}

        {/* Stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            Out of stock
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        {product.category && (
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">
            {product.category.name}
          </span>
        )}
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mt-auto pt-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
          <span className="text-xs text-gray-600">{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-base font-bold text-gray-900">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
