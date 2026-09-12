import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireProductAdmin } from "../middleware/auth";
import { validateBody, validateParams } from "../middleware/validate";
import { createProductSchema, updateProductSchema, productIdParamSchema } from "../validators/productValidators";

const router = Router();

// Public - the storefront reads products with no auth.
router.get("/", productController.listProducts);
router.get("/:slug", productController.getProductBySlug);

// Admin-only writes.
router.post("/", requireProductAdmin, validateBody(createProductSchema), productController.createProduct);
router.put(
  "/:id",
  requireProductAdmin,
  validateParams(productIdParamSchema),
  validateBody(updateProductSchema),
  productController.updateProduct
);
router.delete("/:id", requireProductAdmin, validateParams(productIdParamSchema), productController.deleteProduct);

export default router;
