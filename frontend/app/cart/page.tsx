"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const totalItems = useCartStore((s) => s.totalItems());

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-4">
        <ShoppingBag className="w-16 h-16 text-gray-300" />
        <h1 className="text-2xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="text-gray-500">Add some products to get started.</p>
        <Link
          href="/products"
          className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <div>
          <CartSummary totalPrice={totalPrice} itemCount={totalItems} />
        </div>
      </div>
    </div>
  );
}
