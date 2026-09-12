import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface ProductAdminTokenPayload {
  sub: string;
  typ: "product_admin";
}

// Long-lived on purpose: this is a single-owner admin panel, not a
// multi-user session system, so there's no refresh-token dance for it.
const PRODUCT_ADMIN_TOKEN_TTL = "7d";

export function signProductAdminToken(adminEmail: string): string {
  return jwt.sign({ sub: adminEmail, typ: "product_admin" }, env.JWT_SECRET, {
    expiresIn: PRODUCT_ADMIN_TOKEN_TTL,
  });
}

export function verifyProductAdminToken(token: string): ProductAdminTokenPayload {
  const payload = jwt.verify(token, env.JWT_SECRET) as ProductAdminTokenPayload;
  if (payload.typ !== "product_admin") {
    throw new Error("Not a product admin token");
  }
  return payload;
}
