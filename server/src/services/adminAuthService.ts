import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { HttpError } from "../middleware/errorHandler.js";
import { signProductAdminToken } from "./tokenService.js";

export async function loginProductAdmin(email: string, password: string): Promise<{ accessToken: string }> {
  // Same generic error for unknown email vs wrong password - this is a
  // publicly reachable login endpoint, so no account enumeration.
  if (email !== env.PRODUCT_ADMIN_EMAIL.toLowerCase()) {
    throw new HttpError(401, "Incorrect email or password");
  }

  const valid = await bcrypt.compare(password, env.PRODUCT_ADMIN_PASSWORD_HASH).catch(() => false);
  if (!valid) {
    throw new HttpError(401, "Incorrect email or password");
  }

  return { accessToken: signProductAdminToken(email) };
}
