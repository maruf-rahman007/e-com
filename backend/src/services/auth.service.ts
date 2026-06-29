import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";

export interface AuthPayload {
  sub: number;
  email: string;
}

function signToken(userId: number, email: string): string {
  return jwt.sign({ sub: userId, email } satisfies AuthPayload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

function formatUser(user: { id: number; email: string; name: string }) {
  return { id: user.id, email: user.email, name: user.name };
}

export async function register(email: string, name: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = Object.assign(new Error("Email already in use"), {
      status: 409,
      code: "EMAIL_IN_USE",
    });
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });

  return { token: signToken(user.id, user.email), user: formatUser(user) };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = Object.assign(new Error("Invalid email or password"), {
      status: 401,
      code: "INVALID_CREDENTIALS",
    });
    throw err;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const err = Object.assign(new Error("Invalid email or password"), {
      status: 401,
      code: "INVALID_CREDENTIALS",
    });
    throw err;
  }

  return { token: signToken(user.id, user.email), user: formatUser(user) };
}
