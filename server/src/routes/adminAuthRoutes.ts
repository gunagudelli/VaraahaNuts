import { Router } from "express";
import * as adminAuthController from "../controllers/adminAuthController.js";
import { authLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.post("/login", authLimiter, adminAuthController.login);

export default router;
