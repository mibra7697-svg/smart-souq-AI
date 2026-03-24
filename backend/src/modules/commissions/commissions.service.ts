import { prisma } from "../../core/prisma/client";

export class CommissionService {
  // 1) عمولات المستخدم (المسوق أو البائع)
  async getMyCommissions(userId: string) {
    return await prisma.commission.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" }
    });
  }

  // 2) عمولات المنصة
  async getPlatformCommissions() {
    return await prisma.commission.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  // 3) عمولة طلب معين
  async getCommissionByOrder(orderId: string) {
    return await prisma.commission.findFirst({
      where: { orderId }
    });
  }

  // 4) إجمالي أرباح المنصة
  async getPlatformTotal() {
    const result = await prisma.commission.aggregate({
      _sum: { amount: true }
    });

    return result._sum.amount || 0;
  }

  // 5) إجمالي أرباح المستخدم
  async getMyTotal(userId: string) {
    const result = await prisma.commission.aggregate({
      where: { userId: userId },
      _sum: { amount: true }
    });

    return result._sum.amount || 0;
  }
}

export const commissionService = new CommissionService();
