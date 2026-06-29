"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, LogOut, LogIn } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const totalItems = useCartStore((s) => s.totalItems());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  function handleLogout() {
    logout();
    router.push("/products");
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/products"
          className="text-xl font-bold text-gray-900 shrink-0 hover:text-blue-600 transition-colors"
        >
          ShopNext
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link
            href="/products"
            className={pathname.startsWith("/products") ? "text-blue-600" : "hover:text-gray-900"}
          >
            Products
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Cart */}
          <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 font-semibold">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-700">
                <User className="w-4 h-4" />
                <span className="font-medium">{user.name?.split(" ")[0] ?? user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-blue-50"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
