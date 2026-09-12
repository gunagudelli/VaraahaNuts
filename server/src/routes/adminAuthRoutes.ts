import { Router } from "express";
import * as adminAuthController from "../controllers/adminAuthController";
import { authLimiter } from "../middleware/rateLimiters";

const router = Router();

router.post("/login", authLimiter, adminAuthController.login);

export default router;
