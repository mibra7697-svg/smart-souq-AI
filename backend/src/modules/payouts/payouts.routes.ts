import { Router } from "express";
import { payoutController } from "./payouts.controller";
import { authGuard } from "../../core/middleware/authGuard";
import { requireRole } from "../../core/middleware/requireRole";
import { validate, createPayoutSchema } from "../../core/validation/schemas";

const router = Router();

// Seller routes
router.post("/request", authGuard, validate(createPayoutSchema), payoutController.requestPayout);
router.get("/my", authGuard, payoutController.getMyPayouts);

// Admin routes
router.get("/all", authGuard, requireRole(['ADMIN']), payoutController.getAllPayouts);
router.post("/:id/approve", authGuard, requireRole(['ADMIN']), payoutController.approvePayout);
router.post("/:id/reject", authGuard, requireRole(['ADMIN']), payoutController.rejectPayout);

export default router;
