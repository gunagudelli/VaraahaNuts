import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import adminAuthRoutes from "./routes/adminAuthRoutes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGINS.length > 0 ? env.CORS_ORIGINS : false,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(pinoHttp({ logger }));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(generalLimiter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Product images live in this same repo's /public/products - served
// directly by Vite (dev) / Vercel's static hosting (prod) at /products/<file>,
// same origin as this API. No static-serving code needed here.

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/auth", adminAuthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
