import { Star, Package } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./AddToCartButton";

interface Props {
  product: Product;
}

export default function ProductDetailInfo({ product }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* Category */}
      {product.category && (
        <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-widest">
          {product.category.name}
        </span>
      )}

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Rating + stock */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(product.rating)
                  ? "fill-amber-400 stroke-amber-400"
                  : "stroke-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Package className="w-4 h-4 text-gray-400" />
          <span
            className={
              product.stock === 0
                ? "text-red-600 font-medium"
                : product.stock <= 10
                ? "text-orange-600 font-medium"
                : "text-green-600 font-medium"
            }
          >
            {product.stock === 0
              ? "Out of stock"
              : product.stock <= 10
              ? `Only ${product.stock} left`
              : `${product.stock} in stock`}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
      </div>

      {/* Description */}
      {product.description && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>
      )}

      {/* Add to cart */}
      <div className="pt-2">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
