import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger.js";

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: "Not found" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const status = err instanceof HttpError ? err.status : 500;
  const message = err instanceof HttpError ? err.message : "Internal server error";

  if (status >= 500) {
    logger.error({ err }, "Unhandled request error");
  }

  res.status(status).json({ error: message });
}
