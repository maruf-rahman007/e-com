"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);

  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate order placement (no order API in this assignment)
    await new Promise((r) => setTimeout(r, 1200));
    clearCart();
    setPlaced(true);
    setLoading(false);
  }

  if (placed) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 flex flex-col items-center text-center gap-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-900">Order placed!</h1>
        <p className="text-gray-500">Thanks {user?.name}! Your order has been received.</p>
        <button
          onClick={() => router.push("/products")}
          className="mt-2 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Delivery details</h2>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">First name</label>
                <input
                  type="text"
                  required
                  defaultValue={user?.name?.split(" ")[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Last name</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                defaultValue={user?.email}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Address</label>
              <input type="text" required placeholder="123 Main St" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">City</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">ZIP code</label>
                <input type="text" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <h2 className="font-semibold text-gray-900">Payment</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3 border border-dashed border-gray-300">
              <CreditCard className="w-4 h-4" />
              <span>Payment integration not included in this demo</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || items.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-sm py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Placing order…" : `Place order — ${formatPrice(totalPrice)}`}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 h-fit">
          <h2 className="font-semibold text-gray-900">Order summary</h2>
          <ul className="space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-600">
                <span className="truncate mr-2">{item.title} × {item.quantity}</span>
                <span className="shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
