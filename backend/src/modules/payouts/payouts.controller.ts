import { Request, Response } from "express";
import { payoutService } from "./payouts.service";

export class PayoutController {
  // 1) البائع يطلب سحب مبلغ
  requestPayout = async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const { amount, method, details } = req.body;

      const payout = await payoutService.requestPayout(userId, Number(amount), method, details);
      res.status(201).json({ success: true, payout });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 2) عرض طلبات السحب الخاصة بالبائع
  getMyPayouts = async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const payouts = await payoutService.getMyPayouts(userId);
      res.json({ success: true, payouts });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 3) عرض جميع طلبات السحب (للمنصة)
  getAllPayouts = async (req: Request, res: Response) => {
    try {
      const payouts = await payoutService.getAllPayouts();
      res.json({ success: true, payouts });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 4) موافقة الإدارة على السحب
  approvePayout = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payout = await payoutService.approvePayout(id as string);
      res.json({ success: true, payout });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  // 5) رفض طلب السحب
  rejectPayout = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payout = await payoutService.rejectPayout(id as string);
      res.json({ success: true, payout });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}

export const payoutController = new PayoutController();
