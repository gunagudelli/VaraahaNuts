import { Router } from "express";
import * as bannerController from "../controllers/bannerController.js";
import { requireProductAdmin } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { setBannerSchema } from "../validators/bannerValidators.js";

const router = Router();

// Public - the storefront checks for a banner with no auth.
router.get("/active", bannerController.getActiveBanner);

// Admin-only writes. PUT replaces the (singleton) banner outright.
router.put("/", requireProductAdmin, validateBody(setBannerSchema), bannerController.setBanner);
router.delete("/", requireProductAdmin, bannerController.removeBanner);

export default router;
