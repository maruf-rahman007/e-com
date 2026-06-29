import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
          </div>
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
