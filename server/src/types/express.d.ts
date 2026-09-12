import "express";

declare global {
  namespace Express {
    interface Request {
      isProductAdmin?: boolean;
    }
  }
}

export {};
