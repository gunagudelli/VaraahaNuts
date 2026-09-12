import rateLimit from "express-rate-limit";

// Tighter than the app-wide limiter - the login endpoint is a brute-force target.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts, please try again later." },
});
