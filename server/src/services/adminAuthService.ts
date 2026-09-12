import argon2 from "argon2";
import { env } from "../config/env";
import { HttpError } from "../middleware/errorHandler";
import { signProductAdminToken } from "./tokenService";

export async function loginProductAdmin(email: string, password: string): Promise<{ accessToken: string }> {
  // Same generic error for unknown email vs wrong password - this is a
  // publicly reachable login endpoint, so no account enumeration.
  if (email !== env.PRODUCT_ADMIN_EMAIL.toLowerCase()) {
    throw new HttpError(401, "Incorrect email or password");
  }

  const valid = await argon2.verify(env.PRODUCT_ADMIN_PASSWORD_HASH, password).catch(() => false);
  if (!valid) {
    throw new HttpError(401, "Incorrect email or password");
  }

  return { accessToken: signProductAdminToken(email) };
}
