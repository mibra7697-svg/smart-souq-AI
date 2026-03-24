import { Router } from "express";
import { releaseCommission, releaseAllSellerCommissions, getPendingCommissions } from "../../services/settlementService";
import { 
  adminOverview, 
  adminUsers, 
  adminOrders, 
  adminPayouts, 
  adminSecurityLogs, 
  adminFinancialLogs 
} from "../../controllers/adminOverviewController";
import { authGuard } from "../../core/middleware/authGuard";
import { sensitiveLimiter } from "../../core/middleware/rateLimiter";

const router = Router();

// Middleware: يجب أن يكون المستخدم مسجل دخوله
router.use(authGuard);
// Admin routes need stricter rate limiting
// router.use(sensitiveLimiter); // Disabled for testing

// === Commission Management ===
// تحرير عمولة واحدة
router.post('/commissions/:id/release', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await releaseCommission(id);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// تحرير جميع عمولات بائع معين
router.post('/commissions/seller/:sellerId/release-all', async (req, res) => {
  try {
    const { sellerId } = req.params;
    const result = await releaseAllSellerCommissions(sellerId);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// الحصول على جميع العمولات المعلقة
router.get('/commissions/pending', async (req, res) => {
  try {
    const { sellerId } = req.query;
    const commissions = await getPendingCommissions(sellerId as string);
    res.json({ success: true, data: commissions });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// === Admin Dashboard APIs ===

// Admin Overview - Main dashboard data
router.get('/overview', adminOverview);

// Users Management
router.get('/users', adminUsers);

// Orders Management
router.get('/orders', adminOrders);

// Payouts Management
router.get('/payouts', adminPayouts);

// Logs Management
router.get('/logs/security', adminSecurityLogs);
router.get('/logs/financial', adminFinancialLogs);

export default router;
