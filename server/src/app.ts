import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pinoHttp from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

export const app = express();

// Kill switch — flip to false and redeploy to restore service.
// Set true 2026-09-17: client withholding payment, storefront + admin
// panel both suspended until resolved.
const SERVICE_PAUSED = true;

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

if (SERVICE_PAUSED) {
  app.use("/api", (_req, res) => {
    res.status(402).json({ error: "Service suspended." });
  });
}

// Product images live in this same repo's /public/products - served
// directly by Vite (dev) / Vercel's static hosting (prod) at /products/<file>,
// same origin as this API. No static-serving code needed here.

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/uploads", uploadRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
