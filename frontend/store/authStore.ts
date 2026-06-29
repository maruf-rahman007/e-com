"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthStore {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const COOKIE_NAME = "auth-token";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

function setCookie(value: string) {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

function clearCookie() {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: (token, user) => {
        setCookie(token);
        set({ token, user });
      },

      logout: () => {
        clearCookie();
        set({ token: null, user: null });
      },

      isAuthenticated: () => get().token !== null,
    }),
    { name: "auth-storage" }
  )
);
