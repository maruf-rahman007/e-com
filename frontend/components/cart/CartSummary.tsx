"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface Props {
  totalPrice: number;
  itemCount: number;
}

export default function CartSummary({ totalPrice, itemCount }: Props) {
  const shipping = totalPrice > 50 ? 0 : 4.99;
  const total = totalPrice + shipping;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 sticky top-20">
      <h2 className="font-semibold text-gray-900 text-base">Order summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : formatPrice(shipping)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-gray-400">Free shipping on orders over $50</p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Link
        href="/checkout"
        className="block w-full text-center bg-blue-600 text-white font-semibold text-sm py-3 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Proceed to checkout
      </Link>

      <Link
        href="/products"
        className="block w-full text-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        Continue shopping
      </Link>
    </div>
  );
}
