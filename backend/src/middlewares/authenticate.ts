import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthPayload } from "../services/auth.service";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; email: string };
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Missing or invalid token" } });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as unknown as AuthPayload;
    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch {
    res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid or expired token" } });
  }
}
