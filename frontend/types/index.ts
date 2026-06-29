export interface Category {
  slug: string;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  description: string | null;
  price: number;
  thumbnail: string | null;
  images: string[];
  stock: number;
  rating: number;
  category: Category | null;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string | null;
  quantity: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface Filters {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
