import { Router } from "express";
import { commissionController } from "./commissions.controller";
import { authGuard } from "../../core/middleware/authGuard";

const router = Router();

// Seller routes
router.get("/my", authGuard, commissionController.getMyCommissions);
router.get("/my/total", authGuard, commissionController.getMyTotal);

// Platform routes
router.get("/platform", authGuard, commissionController.getPlatformCommissions);
router.get("/platform/total", authGuard, commissionController.getPlatformTotal);

// Order commission
router.get("/order/:id", authGuard, commissionController.getCommissionByOrder);

export default router;
