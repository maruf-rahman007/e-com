import { AuthResponse, Filters, Product, ProductsResponse } from "@/types";

const CLIENT_API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const SERVER_API = process.env.API_BASE_URL ?? "http://localhost:5000";

function base(isServer = false) {
  return isServer ? SERVER_API : CLIENT_API;
}

// ── Products ──────────────────────────────────────────────────────────────────

export async function fetchProducts(
  params: Partial<Filters & { page: number; limit: number }>,
  isServer = false
): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== "" && v !== undefined && v !== null) query.set(k, String(v));
  });
  const res = await fetch(`${base(isServer)}/api/products?${query}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductById(
  id: number,
  isServer = false
): Promise<{ data: Product }> {
  const res = await fetch(`${base(isServer)}/api/products/${id}`, {
    next: { revalidate: 3600 },
  });
  if (res.status === 404) throw new Error("PRODUCT_NOT_FOUND");
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function fetchAllProductIds(isServer = false): Promise<number[]> {
  const res = await fetch(`${base(isServer)}/api/products?limit=1000`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product IDs");
  const json: ProductsResponse = await res.json();
  return json.data.map((p) => p.id);
}

export async function fetchCategories(
  isServer = false
): Promise<{ data: { slug: string; name: string }[] }> {
  const res = await fetch(`${base(isServer)}/api/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function apiRegister(body: {
  email: string;
  name: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${CLIENT_API}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Registration failed");
  return data;
}

export async function apiLogin(body: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${CLIENT_API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message ?? "Login failed");
  return data;
}
