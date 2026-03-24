import { Router } from "express";
import { ProductsController } from "./products.controller";
import { authGuard } from "../../core/middleware/authGuard";

const router = Router();
const controller = new ProductsController();

// عامة (بدون تسجيل دخول إن أحببت)
router.get("/", controller.listActiveProducts);
router.get("/:productId", controller.getProduct);
router.get("/affiliate/click/:code", controller.trackClick); // Public track

// محمية للمسوقين
router.post("/:productId/affiliate", authGuard, controller.generateAffiliateLink);
router.get("/affiliate/my-links", authGuard, controller.getMyAffiliateLinks); // Specific path before :productId to avoid conflict? No, my-links is distinct enough if placed carefully, but :productId is generic. 
// Actually :productId is below.
// But wait, `router.get("/:productId", ...)` will match "affiliate".
// So I should put specific routes BEFORE generic parameters.

// Reordering:

// 1. Specific static routes
router.get("/", controller.listActiveProducts);
router.get("/affiliate/click/:code", controller.trackClick);

// 2. Protected routes
router.get("/me/list", authGuard, controller.listMyProducts);
router.get("/me/affiliate-links", authGuard, controller.getMyAffiliateLinks); // Moved here to be safe
router.post("/", authGuard, controller.createProduct);

// 3. Dynamic routes (Generic params last)
router.post("/:productId/affiliate", authGuard, controller.generateAffiliateLink);
router.get("/:productId", controller.getProduct);
router.put("/:productId", authGuard, controller.updateProduct);
router.delete("/:productId", authGuard, controller.deleteProduct);

export default router;
