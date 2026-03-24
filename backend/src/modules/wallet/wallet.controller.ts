import { Request, Response } from 'express';
import { WalletService } from './wallet.service';

export class WalletController {
  private service = new WalletService();

  // يفترض أن userId يأتي من middleware للـ Auth
  private getUserId(req: Request): string {
    // استخدم userId من middleware authGuard
    return req.userId || 'demo-user-id';
  }

  deposit = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      const { amount, metadata } = req.body;

      const tx = await this.service.deposit(userId, Number(amount), metadata);
      res.status(201).json({ success: true, transaction: tx });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  withdraw = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      const { amount } = req.body;

      const tx = await this.service.withdraw(userId, Number(amount));
      res.status(201).json({ success: true, transaction: tx });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  transfer = async (req: Request, res: Response) => {
    try {
      const fromUserId = this.getUserId(req);
      const { toUserId, amount } = req.body;

      const result = await this.service.transfer(
        fromUserId,
        toUserId,
        Number(amount),
      );

      res.status(201).json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  listTransactions = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      const { limit } = req.query;

      const txs = await this.service.listTransactions(
        userId,
        limit ? Number(limit) : 50,
      );

      res.json({ success: true, transactions: txs });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getWallet = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      const wallet = await this.service.getWallet(userId);
      res.json({ success: true, wallet });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
