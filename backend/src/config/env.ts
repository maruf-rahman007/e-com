import "dotenv/config";

function required(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}

export const env = {
  PORT: parseInt(process.env.PORT ?? "5000", 10),
  DATABASE_URL: required("DATABASE_URL"),
  JWT_SECRET: required("JWT_SECRET"),
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
