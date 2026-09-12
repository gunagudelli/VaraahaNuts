import { RequestHandler } from "express";
import * as adminAuthService from "../services/adminAuthService";
import { adminLoginSchema } from "../validators/adminValidators";
import { HttpError } from "../middleware/errorHandler";

export const login: RequestHandler = async (req, res, next) => {
  try {
    const parsed = adminLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues.map((i) => i.message).join("; "));
    }
    const { accessToken } = await adminAuthService.loginProductAdmin(parsed.data.email, parsed.data.password);
    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};
