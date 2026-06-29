"use client";

import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return { user, token, login, logout, isAuthenticated };
}
