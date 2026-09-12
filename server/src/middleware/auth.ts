import { NextFunction, Request, Response } from "express";
import { verifyProductAdminToken } from "../services/tokenService.js";
import { HttpError } from "./errorHandler.js";

// Gates the product-catalog admin endpoints (create/update/delete product or
// category). The storefront's public GET endpoints never use this.
export function requireProductAdmin(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    next(new HttpError(401, "Authentication required"));
    return;
  }

  try {
    verifyProductAdminToken(header.slice("Bearer ".length));
    next();
  } catch {
    next(new HttpError(401, "Invalid or expired token"));
  }
}
