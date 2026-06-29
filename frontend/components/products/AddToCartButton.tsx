"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
        product.stock === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : added
          ? "bg-green-600 text-white"
          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
      }`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          Added to cart!
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </>
      )}
    </button>
  );
}
