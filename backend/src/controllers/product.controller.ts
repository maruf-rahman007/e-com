import { Request, Response, NextFunction } from "express";
import { getProducts, getProductById } from "../services/product.service";

export async function getProductsHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit, search, category, minPrice, maxPrice } = req.query as Record<string, string>;
    const result = await getProducts({ page, limit, search, category, minPrice, maxPrice });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getProductByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: { code: "INVALID_PARAM", message: "id must be an integer" } });
      return;
    }
    const result = await getProductById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
