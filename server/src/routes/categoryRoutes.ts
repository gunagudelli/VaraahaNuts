import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import { requireProductAdmin } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/validate";
import { createCategorySchema, updateCategorySchema, categoryIdParamSchema } from "../validators/categoryValidators";

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
