import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";

type PayoutMethod = "BANK_TRANSFER" | "PAYPAL" | "VODAFONE_CASH" | "INSTAPAY" | "USDC_SOLANA";

interface PayoutDetails {
  destination?: string;
  token?: string;
  network?: string;
}

export class PayoutService {
  // 1) البائع يطلب سحب مبلغ
  async requestPayout(
    userId: string,
    amount: number,
    method: PayoutMethod = "BANK_TRANSFER",
    details?: PayoutDetails
  ) {
    return await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.findUnique({
        where: { userId }
      });

      if (!wallet) throw new Error("Wallet not found");

      if (wallet.availableBalance.lessThan(new Prisma.Decimal(amount))) {
        throw new Error("Insufficient available balance");
      }

      let payoutDetails: Prisma.InputJsonValue | undefined = details as Prisma.InputJsonValue | undefined;

      if (method === "USDC_SOLANA") {
        const user = await tx.user.findUnique({
          where: { id: userId },
          select: { solanaAddress: true }
        });

        if (!user?.solanaAddress) {
          throw new Error("Solana address is required for USDC Solana payouts");
        }

        let publicKey: PublicKey;
        try {
          publicKey = new PublicKey(user.solanaAddress);
        } catch (_error) {
          throw new Error("Invalid saved Solana address format");
        }

        if (!PublicKey.isOnCurve(publicKey.toBytes())) {
          throw new Error("Saved Solana address is not on curve");
        }

        payoutDetails = {
          destination: publicKey.toBase58(),
          token: "USDC",
          network: "SOLANA"
        };
      }

      // خصم من availableBalance
      await tx.wallet.update({
        where: { userId },
        data: {
          availableBalance: { decrement: new Prisma.Decimal(amount) }
        }
      });

      // إنشاء طلب السحب
      const payout = await tx.payoutRequest.create({
        data: {
          userId,
          amount: new Prisma.Decimal(amount),
          status: "PENDING",
          method,
          details: payoutDetails
        }
      });

      return payout;
    });
  }

  // 2) عرض طلبات السحب الخاصة بالبائع
  async getMyPayouts(userId: string) {
    return await prisma.payoutRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  // 3) عرض جميع طلبات السحب (للمنصة)
  async getAllPayouts() {
    return await prisma.payoutRequest.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  // 4) موافقة الإدارة على السحب
  async approvePayout(payoutId: string) {
    return await prisma.$transaction(async (tx) => {
      const payout = await tx.payoutRequest.findUnique({
        where: { id: payoutId },
        include: { user: true }
      });

      if (!payout) throw new Error("Payout request not found");
      if (payout.status !== "PENDING") {
        throw new Error("Payout request already processed");
      }

      // الحصول على wallet ID
      const wallet = await tx.wallet.findUnique({
        where: { userId: payout.userId }
      });

      if (!wallet) throw new Error("Wallet not found");

      // تحديث حالة الطلب
      const updated = await tx.payoutRequest.update({
        where: { id: payoutId },
        data: {
          status: "APPROVED",
          processedAt: new Date()
        }
      });

      // تسجيل عملية السحب كـ WalletTransaction
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: "WITHDRAWAL",
          amount: payout.amount,
          status: "COMPLETED",
          referenceId: payoutId,
          description: `Payout approved - ${payout.method}`
        }
      });

      return updated;
    });
  }

  // 5) رفض طلب السحب
  async rejectPayout(payoutId: string) {
    return await prisma.$transaction(async (tx) => {
      const payout = await tx.payoutRequest.findUnique({
        where: { id: payoutId }
      });

      if (!payout) throw new Error("Payout request not found");
      if (payout.status !== "PENDING") {
        throw new Error("Payout request already processed");
      }

      // الحصول على wallet ID
      const wallet = await tx.wallet.findUnique({
        where: { userId: payout.userId }
      });

      if (!wallet) throw new Error("Wallet not found");

      // إعادة المبلغ إلى availableBalance
      await tx.wallet.update({
        where: { userId: payout.userId },
        data: {
          availableBalance: { increment: payout.amount }
        }
      });

      // تحديث حالة الطلب
      return await tx.payoutRequest.update({
        where: { id: payoutId },
        data: {
          status: "REJECTED",
          processedAt: new Date()
        }
      });
    });
  }
}

export const payoutService = new PayoutService();
