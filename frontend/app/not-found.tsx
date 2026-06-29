import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4 text-center px-4">
      <SearchX className="w-16 h-16 text-gray-300" />
      <h1 className="text-3xl font-bold text-gray-900">404 — Not found</h1>
      <p className="text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/products"
        className="mt-2 bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Back to products
      </Link>
    </div>
  );
}
