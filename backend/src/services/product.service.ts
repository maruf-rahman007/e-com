import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

interface GetProductsParams {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

function buildWhere(params: GetProductsParams): Prisma.ProductWhereInput {
  const { search, category, minPrice, maxPrice } = params;

  return {
    ...(search && {
      title: { contains: search, mode: Prisma.QueryMode.insensitive },
    }),
    ...(category && { category: { slug: category } }),
    ...((minPrice || maxPrice) && {
      price: {
        ...(minPrice && { gte: new Prisma.Decimal(minPrice) }),
        ...(maxPrice && { lte: new Prisma.Decimal(maxPrice) }),
      },
    }),
  };
}

function formatProduct(
  product: Prisma.ProductGetPayload<{ include: { category: true } }>
) {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: parseFloat(product.price.toString()),
    thumbnail: product.thumbnail,
    images: product.images,
    stock: product.stock,
    rating: parseFloat(product.rating.toString()),
    category: product.category
      ? { slug: product.category.slug, name: product.category.name }
      : null,
  };
}

export async function getProducts(params: GetProductsParams) {
  const pageNum = Math.max(1, parseInt(params.page ?? "1", 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(params.limit ?? "12", 10)));
  const offset = (pageNum - 1) * limitNum;

  const where = buildWhere(params);

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip: offset,
      take: limitNum,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    data: products.map(formatProduct),
    meta: {
      total,
      page: pageNum,
      limit: limitNum,
      hasMore: offset + limitNum < total,
    },
  };
}

export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    const err = Object.assign(new Error(`Product with id ${id} not found`), {
      status: 404,
      code: "PRODUCT_NOT_FOUND",
    });
    throw err;
  }

  return { data: formatProduct(product) };
}

export async function getAllProductIds(): Promise<number[]> {
  const products = await prisma.product.findMany({ select: { id: true } });
  return products.map((p) => p.id);
}
