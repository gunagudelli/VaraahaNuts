import { Router } from "express";
import * as productController from "../controllers/productController.js";
import { requireProductAdmin, optionalProductAdmin } from "../middleware/auth.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import { createProductSchema, updateProductSchema, productIdParamSchema } from "../validators/productValidators.js";

const router = Router();

// Public - the storefront reads products with no auth. An admin token is
// accepted but optional here, so the same endpoints also power the admin
// UI's product list/edit views, which need to see inactive products too.
router.get("/", optionalProductAdmin, productController.listProducts);
router.get("/:slug", optionalProductAdmin, productController.getProductBySlug);

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
