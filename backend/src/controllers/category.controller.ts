import { Request, Response, NextFunction } from "express";
import { getCategories } from "../services/category.service";

export async function getCategoriesHandler(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await getCategories();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
