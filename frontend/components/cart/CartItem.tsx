"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 bg-white rounded-xl border border-gray-200 p-4">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
        {item.thumbnail ? (
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover" sizes="96px" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 text-2xl">📦</div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-sm font-bold text-gray-800">{formatPrice(item.price)}</p>

        {/* Qty controls */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => updateQty(item.id, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-600 transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-sm font-semibold text-gray-900 w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQty(item.id, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-600 transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>

          <button
            onClick={() => removeItem(item.id)}
            className="ml-auto text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Line total */}
      <div className="hidden sm:flex flex-col items-end justify-center shrink-0">
        <span className="text-sm font-bold text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </span>
        <span className="text-xs text-gray-400">× {item.quantity}</span>
      </div>
    </div>
  );
}
