import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { HttpError } from "./errorHandler";

export function validateBody<T>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join("; ");
      next(new HttpError(400, message));
      return;
    }
    req.body = result.data;
    next();
  };
}

export function validateParams<T extends Record<string, string>>(schema: ZodType<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join("; ");
      next(new HttpError(400, message));
      return;
    }
    req.params = result.data;
    next();
  };
}
