import { prisma } from "../../core/prisma/client";
import { Prisma, OrderStatus } from "@prisma/client";
import { createCommissionForOrder } from "../../services/commissionService";
import { cancelCommission } from "../../services/settlementService";
import { 
  PaginationParams, 
  PaginatedResponse, 
  parsePaginationParams, 
  createPaginatedResponse 
} from "../../core/utils/pagination";

export class OrdersService {
  private async generateOrderNumber(): Promise<string> {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const orderNumber = `ORD-${timestamp}-${random}`;
    
    // Check for uniqueness
    const exists = await prisma.order.findUnique({
      where: { orderNumber }
    });
    
    if (exists) {
      return this.generateOrderNumber();
    }
    
    return orderNumber;
  }

  async createOrder(buyerId: string, productId: string) {
    return await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId } });
      if (!product) throw new Error("Product not found");

      const buyerWallet = await tx.wallet.findUnique({ where: { userId: buyerId } });
      if (!buyerWallet) throw new Error("Buyer wallet not found");

      if (buyerWallet.availableBalance.lessThan(product.price)) {
        throw new Error("Insufficient balance");
      }

      // 1) خصم من المشتري
      await tx.wallet.update({
        where: { userId: buyerId },
        data: {
          availableBalance: buyerWallet.availableBalance.minus(product.price)
        }
      });

      // 2) حجز المبلغ للبائع (pendingBalance)
      await tx.wallet.update({
        where: { userId: product.sellerId },
        data: {
          pendingBalance: { increment: product.price }
        }
      });

      // 3) إنشاء الطلب
      const orderNumber = await this.generateOrderNumber();
      const order = await tx.order.create({
        data: {
          orderNumber,
          buyerId,
          productId,
          amount: product.price,
          status: "PAID"
        }
      });

      return order;
    });
  }

  async completeOrder(orderId: string) {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { product: true }
      });

      if (!order) throw new Error("Order not found");
      if (order.status !== "PAID") throw new Error("Order not eligible for completion");

      const sellerId = order.product.sellerId;
      const price = order.amount;
      const rate = order.product.commissionRate || new Prisma.Decimal(0.1); // 10% default
      const commissionAmount = price.mul(rate);
      const sellerEarning = price.minus(commissionAmount);

      // 1) خصم من pendingBalance
      await tx.wallet.update({
        where: { userId: sellerId },
        data: {
          pendingBalance: { decrement: price },
          availableBalance: { increment: sellerEarning }
        }
      });

      // 2) تسجيل العمولة
      await tx.commission.create({
        data: {
          orderId,
          productId: order.productId,
          userId: sellerId,
          amount: commissionAmount,
          rate,
          status: "APPROVED"
        }
      });

      // 3) تحديث حالة الطلب
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: "DELIVERED" }
      });

      // 4) إنشاء العمولة باستخدام الخدمة الجديدة
      try {
        await createCommissionForOrder(orderId);
      } catch (error) {
        console.error("Failed to create commission:", error);
        // لا نوقف العملية إذا فشلت إنشاء العمولة
      }

      return updatedOrder;
    });
  }

  async cancelOrder(orderId: string) {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { product: true }
      });

      if (!order) throw new Error("Order not found");
      if (order.status !== "PAID") throw new Error("Order cannot be canceled");

      const buyerId = order.buyerId;
      const sellerId = order.product.sellerId;
      const price = order.amount;

      // 1) إعادة المبلغ للمشتري
      await tx.wallet.update({
        where: { userId: buyerId },
        data: {
          availableBalance: { increment: price }
        }
      });

      // 2) خصم من pendingBalance للبائع
      await tx.wallet.update({
        where: { userId: sellerId },
        data: {
          pendingBalance: { decrement: price }
        }
      });

      // 3) تحديث حالة الطلب
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: "REFUNDED" }
      });

      // 4) إلغاء العمولة إذا كانت موجودة
      try {
        await cancelCommission(orderId);
      } catch (error) {
        console.error("Failed to cancel commission:", error);
        // لا نوقف العملية إذا فشل إلغاء العمولة
      }

      return updatedOrder;
    });
  }

  // تحديث حالة الطلب بشكل عام
  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { product: true }
    });

    if (!order) throw new Error("Order not found");

    let updatedOrder;
    
    switch (status) {
      case OrderStatus.DELIVERED:
        updatedOrder = await this.completeOrder(orderId);
        break;
      case OrderStatus.REFUNDED:
        updatedOrder = await this.cancelOrder(orderId);
        break;
      default:
        updatedOrder = await prisma.order.update({
          where: { id: orderId },
          data: { status }
        });
    }

    return updatedOrder;
  }

  async getOrdersByUser(userId: string) {
    return prisma.order.findMany({
      where: { buyerId: userId },
      include: {
        product: true
      },
      orderBy: { createdAt: "desc" }
    });
  }

  async getOrdersByUserPaginated(userId: string, paginationParams: PaginationParams): Promise<PaginatedResponse<any>> {
    const { page, limit } = paginationParams;
    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: { buyerId: userId },
        include: {
          product: true
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit
      }),
      prisma.order.count({
        where: { buyerId: userId }
      })
    ]);

    return createPaginatedResponse(orders, totalCount, paginationParams);
  }

  async getAllOrdersPaginated(paginationParams: PaginationParams, filters?: {
    status?: OrderStatus;
    sellerId?: string;
    buyerId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<PaginatedResponse<any>> {
    const { page, limit } = paginationParams;
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (filters?.status) where.status = filters.status;
    if (filters?.sellerId) where.product = { sellerId: filters.sellerId };
    if (filters?.buyerId) where.buyerId = filters.buyerId;
    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) where.createdAt.gte = filters.startDate;
      if (filters.endDate) where.createdAt.lte = filters.endDate;
    }

    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          product: {
            include: {
              seller: true
            }
          },
          buyer: true
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit
      }),
      prisma.order.count({ where })
    ]);

    return createPaginatedResponse(orders, totalCount, paginationParams);
  }

  async getOrderById(orderId: string) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        buyer: true,
        product: true
      }
    });
  }

  async getMonthlyRevenue(year?: number, month?: number): Promise<{
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    monthlyBreakdown: Array<{ month: number; year: number; revenue: number; orders: number }>;
  }> {
    const targetYear = year || new Date().getFullYear();
    
    // Get monthly breakdown for the year
    const monthlyData = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        status: 'DELIVERED',
        createdAt: {
          gte: new Date(targetYear, 0, 1),
          lt: new Date(targetYear + 1, 0, 1)
        }
      },
      _sum: {
        amount: true
      },
      _count: true
    });

    // Process monthly data
    const monthlyBreakdown = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      year: targetYear,
      revenue: 0,
      orders: 0
    }));

    monthlyData.forEach(data => {
      const month = new Date(data.createdAt).getMonth();
      monthlyBreakdown[month].revenue += Number(data._sum.amount || 0);
      monthlyBreakdown[month].orders += data._count;
    });

    // Get total revenue and orders
    const totalRevenue = monthlyBreakdown.reduce((sum, month) => sum + month.revenue, 0);
    const totalOrders = monthlyBreakdown.reduce((sum, month) => sum + month.orders, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      monthlyBreakdown
    };
  }
}
