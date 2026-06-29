import { prisma } from "../lib/prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { slug: true, name: true },
  });
  return { data: categories };
}
