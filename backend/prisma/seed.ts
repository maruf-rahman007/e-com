import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface DummyProduct {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  stock: number;
  rating: number;
  category: string;
}

function toTitleCase(str: string): string {
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  console.log("Fetching products from DummyJSON...");

  const res = await fetch("https://dummyjson.com/products?limit=100&skip=0");
  const json = (await res.json()) as { products: DummyProduct[] };
  const products = json.products;

  // Extract unique categories
  const categoryMap = new Map<string, string>();
  for (const p of products) {
    if (!categoryMap.has(p.category)) {
      categoryMap.set(p.category, toTitleCase(p.category));
    }
  }

  console.log(`Upserting ${categoryMap.size} categories...`);

  // Upsert categories, collect slug → DB id map
  const categoryIdMap = new Map<string, number>();
  for (const [slug, name] of categoryMap) {
    const cat = await prisma.category.upsert({
      where: { slug },
      update: { name },
      create: { slug, name },
    });
    categoryIdMap.set(slug, cat.id);
  }

  console.log(`Seeding ${products.length} products...`);

  // Clear existing products to allow idempotent re-seeding
  await prisma.product.deleteMany();

  for (const p of products) {
    const categoryId = categoryIdMap.get(p.category)!;
    await prisma.product.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price,
        thumbnail: p.thumbnail,
        images: p.images,
        stock: p.stock,
        rating: p.rating,
        categoryId,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
