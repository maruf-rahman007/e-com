import { Request, Response, NextFunction } from "express";

function badRequest(res: Response, message: string): void {
  res.status(400).json({ error: { code: "INVALID_PARAM", message } });
}

export function validateQuery(req: Request, res: Response, next: NextFunction): void {
  const { page, limit, minPrice, maxPrice } = req.query;

  if (page !== undefined) {
    const p = Number(page);
    if (!Number.isInteger(p) || p < 1) {
      badRequest(res, "page must be a positive integer");
      return;
    }
  }

  if (limit !== undefined) {
    const l = Number(limit);
    if (!Number.isInteger(l) || l < 1 || l > 100) {
      badRequest(res, "limit must be an integer between 1 and 100");
      return;
    }
  }

  if (minPrice !== undefined && isNaN(Number(minPrice))) {
    badRequest(res, "minPrice must be a number");
    return;
  }

  if (maxPrice !== undefined && isNaN(Number(maxPrice))) {
    badRequest(res, "maxPrice must be a number");
    return;
  }

  next();
}
