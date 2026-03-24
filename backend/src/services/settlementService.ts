import { prisma } from "../core/prisma/client";
import { CommissionStatus, TransactionStatus, TransactionType } from "@prisma/client";

export const cancelCommission = async (orderId: string) => {
  const commission = await prisma.commission.findFirst({
    where: { orderId },
  });

  if (!commission) return null;

  return prisma.commission.update({
    where: { id: commission.id },
    data: { status: CommissionStatus.CANCELLED },
  });
};

// Escrow release: when a commission is released, the affiliate wallet is credited
// and the commission is marked as PAID.
export const releaseCommission = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    const commission = await tx.commission.findUnique({
      where: { id },
    });

    if (!commission) {
      throw new Error("Commission not found");
    }

    if (commission.status === CommissionStatus.PAID) {
      return commission;
    }

    const wallet = await tx.wallet.findUnique({
      where: { userId: commission.userId },
    });

    if (!wallet) {
      throw new Error("Wallet not found for commission owner");
    }

    // Move commission from pending to available balance
    await tx.wallet.update({
      where: { id: wallet.id },
      data: {
        pendingBalance:
          wallet.pendingBalance.greaterThan(commission.amount)
            ? wallet.pendingBalance.minus(commission.amount)
            : wallet.pendingBalance,
        availableBalance: wallet.availableBalance.plus(commission.amount),
      },
    });

    await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        amount: commission.amount,
        type: TransactionType.COMMISSION,
        status: TransactionStatus.COMPLETED,
        referenceId: commission.id,
        description: "Commission released to affiliate wallet",
      },
    });

    const updated = await tx.commission.update({
      where: { id: commission.id },
      data: {
        status: CommissionStatus.PAID,
        paidAt: new Date(),
      },
    });

    return updated;
  });
};

export const releaseAllSellerCommissions = async (sellerId: string) => {
  const commissions = await prisma.commission.findMany({
    where: {
      status: CommissionStatus.APPROVED,
      userId: sellerId,
    },
  });

  let count = 0;
  for (const commission of commissions) {
    await releaseCommission(commission.id);
    count++;
  }

  return { sellerId, count };
};

export const getPendingCommissions = async (sellerId?: string) => {
  const where: any = {
    status: CommissionStatus.APPROVED,
  };

  if (sellerId) {
    where.userId = sellerId;
  }

  return prisma.commission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};
