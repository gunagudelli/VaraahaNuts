import { RequestHandler } from "express";
import * as categoryService from "../services/categoryService.js";

export const listCategories: RequestHandler = async (_req, res, next) => {
  try {
    const categories = await categoryService.listCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await categoryService.createCategoryEntry(req.body);
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategoryEntry(String(req.params.id), req.body);
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    await categoryService.deleteCategoryEntry(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
