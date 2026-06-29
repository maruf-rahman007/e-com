import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
  code?: string;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);

  const status = err.status ?? 500;
  const code = err.code ?? "INTERNAL_ERROR";
  const message = err.message ?? "An unexpected error occurred";

  res.status(status).json({ error: { code, message } });
}
