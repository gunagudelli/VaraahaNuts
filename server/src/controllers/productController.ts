import { RequestHandler } from "express";
import * as productService from "../services/productService";
import { HttpError } from "../middleware/errorHandler";
import { listProductsQuerySchema } from "../validators/productValidators";

export const listProducts: RequestHandler = async (req, res, next) => {
  try {
    const parsed = listProductsQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      throw new HttpError(400, parsed.error.issues.map((i) => i.message).join("; "));
    }
    const products = await productService.listProducts(parsed.data);
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

export const getProductBySlug: RequestHandler = async (req, res, next) => {
  try {
    const product = await productService.getProductBySlug(String(req.params.slug));
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await productService.createProductEntry(req.body);
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const product = await productService.updateProductEntry(String(req.params.id), req.body);
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    await productService.deleteProductEntry(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
