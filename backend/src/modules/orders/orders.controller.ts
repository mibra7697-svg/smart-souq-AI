import { Request, Response } from "express";
import { OrdersService } from "./orders.service";
import { parsePaginationParams } from "../../core/utils/pagination";
import { OrderStatus } from "@prisma/client";
import { validateQuery, paginationSchema, dateRangeSchema } from "../../core/validation/schemas";

export class OrdersController {
  private service = new OrdersService();

  createOrder = async (req: Request, res: Response) => {
    try {
      const buyerId = req.userId!;
      const { productId } = req.body;

      const order = await this.service.createOrder(buyerId, productId);
      res.json({ success: true, order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  completeOrder = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const order = await this.service.completeOrder(orderId as string);
      res.json({ success: true, order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  cancelOrder = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const order = await this.service.cancelOrder(orderId as string);
      res.json({ success: true, order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getMyOrders = async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const orders = await this.service.getOrdersByUser(userId);
      res.json({ success: true, orders });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getMyOrdersPaginated = async (req: Request, res: Response) => {
    try {
      const userId = req.userId!;
      const paginationParams = parsePaginationParams(req.query);
      const result = await this.service.getOrdersByUserPaginated(userId, paginationParams);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getAllOrdersPaginated = async (req: Request, res: Response) => {
    try {
      const paginationParams = parsePaginationParams(req.query);
      const { status, sellerId, buyerId, startDate, endDate } = req.query;
      
      const filters = {
        status: status as OrderStatus,
        sellerId: sellerId as string,
        buyerId: buyerId as string,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined
      };

      const result = await this.service.getAllOrdersPaginated(paginationParams, filters);
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getMonthlyRevenue = async (req: Request, res: Response) => {
    try {
      const { year, month } = req.query;
      const yearNum = year ? parseInt(year as string) : undefined;
      const monthNum = month ? parseInt(month as string) : undefined;
      
      const revenueData = await this.service.getMonthlyRevenue(yearNum, monthNum);
      res.json({ success: true, ...revenueData });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const order = await this.service.getOrderById(orderId as string);
      res.json({ success: true, order });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
