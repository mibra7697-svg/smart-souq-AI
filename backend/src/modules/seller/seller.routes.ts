import { Router } from "express";
import { sellerOverview, sellerPerformanceMetrics } from "./seller.controller";
import { authGuard } from "../../core/middleware/authGuard";

const router = Router();

// Middleware: يجب أن يكون المستخدم مسجل دخوله
router.use(authGuard);

// Get seller overview data
router.get("/overview", sellerOverview);

// Get seller performance metrics
router.get("/performance", sellerPerformanceMetrics);

export default router;
