import { Router } from "express";
import { OrdersController } from "./orders.controller";
import { authGuard } from "../../core/middleware/authGuard";
import { validateQuery, paginationSchema } from "../../core/validation/schemas";

const router = Router();
const controller = new OrdersController();

router.post("/", authGuard, controller.createOrder);
router.get("/my", authGuard, controller.getMyOrders);
router.get("/my/paginated", authGuard, validateQuery(paginationSchema), controller.getMyOrdersPaginated);
router.get("/", authGuard, validateQuery(paginationSchema), controller.getAllOrdersPaginated);
router.get("/revenue/monthly", authGuard, controller.getMonthlyRevenue);
router.get("/:orderId", authGuard, controller.getOrderById);
router.post("/:orderId/complete", authGuard, controller.completeOrder);
router.post("/:orderId/cancel", authGuard, controller.cancelOrder);

export default router;
