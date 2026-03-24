import { prisma } from "../core/prisma/client";
import { Prisma, TransactionStatus, TransactionType } from "@prisma/client";

// Create an affiliate commission for a given order and reflect it in the affiliate wallet.
// This is used in addition to the seller settlement logic to power affiliate analytics.
export const createCommissionForOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { product: true },
  });

  if (!order) {
    return null;
  }

  // If no affiliate is attached to the order, nothing to do.
  if (!order.affiliateId) {
    return null;
  }

  const product = order.product;
  const affiliateId = order.affiliateId;

  const ratePercent =
    (product.commissionRate as Prisma.Decimal | null) ??
    new Prisma.Decimal(10); // 10% default
  const rateDecimal = ratePercent.div(100);
  const amount = (order.amount as Prisma.Decimal).mul(rateDecimal);

  const commission = await prisma.commission.create({
    data: {
      orderId: order.id,
      productId: product.id,
      userId: affiliateId,
      amount,
      rate: ratePercent,
      status: "APPROVED",
    },
  });

  // Update affiliate wallet with pending commission and add a transaction record
  const wallet = await prisma.wallet.findUnique({
    where: { userId: affiliateId },
  });

  if (wallet) {
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        pendingBalance: wallet.pendingBalance.plus(amount),
      },
    });

    await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        amount,
        type: TransactionType.COMMISSION,
        status: TransactionStatus.PENDING,
        referenceId: commission.id,
        description: "Affiliate commission (pending)",
      },
    });
  }

  return commission;
};
