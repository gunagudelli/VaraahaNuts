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

// Never rejects - just flags res.locals.isProductAdmin when a valid admin
// token is present, so a single public endpoint (product list/detail) can
// also serve the admin's own management UI, which additionally needs to
// see inactive products the storefront should never show. Using
// res.locals instead of a custom req property avoids depending on an
// ambient Express.Request type augmentation (that approach silently broke
// a previous deploy - Vercel's build didn't pick up the .d.ts file).
export function optionalProductAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    try {
      verifyProductAdminToken(header.slice("Bearer ".length));
      res.locals.isProductAdmin = true;
    } catch {
      // invalid/expired token on an optional-auth route just means "not admin"
    }
  }
  next();
}
