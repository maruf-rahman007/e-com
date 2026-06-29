import { Request, Response, NextFunction } from "express";
import { register, login } from "../services/auth.service";

export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, name, password } = req.body as { email: string; name: string; password: string };

    if (!email || !name || !password) {
      res.status(400).json({
        error: { code: "MISSING_FIELDS", message: "email, name, and password are required" },
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        error: { code: "WEAK_PASSWORD", message: "password must be at least 6 characters" },
      });
      return;
    }

    const result = await register(email.toLowerCase().trim(), name.trim(), password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function loginHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      res.status(400).json({
        error: { code: "MISSING_FIELDS", message: "email and password are required" },
      });
      return;
    }

    const result = await login(email.toLowerCase().trim(), password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
