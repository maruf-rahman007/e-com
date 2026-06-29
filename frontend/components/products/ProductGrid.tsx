import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
