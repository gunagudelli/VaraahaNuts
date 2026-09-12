import { Router } from "express";
import * as categoryController from "../controllers/categoryController.js";
import { requireProductAdmin } from "../middleware/auth.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { createCategorySchema, updateCategorySchema, categoryIdParamSchema } from "../validators/categoryValidators.js";

const router = Router();

// Public - the storefront reads categories with no auth.
router.get("/", categoryController.listCategories);

// Admin-only writes.
router.post("/", requireProductAdmin, validateBody(createCategorySchema), categoryController.createCategory);
router.put(
  "/:id",
  requireProductAdmin,
  validateParams(categoryIdParamSchema),
  validateBody(updateCategorySchema),
  categoryController.updateCategory
);
router.delete("/:id", requireProductAdmin, validateParams(categoryIdParamSchema), categoryController.deleteCategory);

export default router;
