import { Request, Response } from "express";
import { commissionService } from "./commissions.service";

export class CommissionController {
  // 1) عمولات البائع
  getMyCommissions = async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const commissions = await commissionService.getMyCommissions(userId);
      res.json({ success: true, commissions });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 2) عمولات المنصة
  getPlatformCommissions = async (req: Request, res: Response) => {
    try {
      const commissions = await commissionService.getPlatformCommissions();
      res.json({ success: true, commissions });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 3) عمولة طلب معين
  getCommissionByOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const commission = await commissionService.getCommissionByOrder(id as string);
      res.json({ success: true, commission });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 4) إجمالي أرباح المنصة
  getPlatformTotal = async (req: Request, res: Response) => {
    try {
      const total = await commissionService.getPlatformTotal();
      res.json({ success: true, total });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 5) إجمالي أرباح البائع
  getMyTotal = async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const total = await commissionService.getMyTotal(userId);
      res.json({ success: true, total });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}

export const commissionController = new CommissionController();
