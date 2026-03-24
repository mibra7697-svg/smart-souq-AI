import { Request, Response } from "express";
import { ProductsService } from "./products.service";

export class ProductsController {
  private service = new ProductsService();

  private getUserId(req: Request): string {
    return req.userId!;
  }

  createProduct = async (req: Request, res: Response) => {
    try {
      const sellerId = this.getUserId(req);
      const { name, description, price, currency } = req.body;

      const product = await this.service.createProduct(sellerId, {
        name,
        description,
        price: Number(price),
        currency,
      });

      res.status(201).json({ success: true, product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  listActiveProducts = async (req: Request, res: Response) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const search = req.query.search as string;
      const sort = req.query.sort as string;
      const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
      const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

      const result = await this.service.listActiveProducts({
        page,
        limit,
        search,
        sort,
        minPrice,
        maxPrice,
      });
      res.json({ success: true, ...result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  generateAffiliateLink = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      const { productId } = req.params;
      const link = await this.service.generateAffiliateLink(userId, productId);
      res.json({ success: true, link });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getMyAffiliateLinks = async (req: Request, res: Response) => {
    try {
      const userId = this.getUserId(req);
      const links = await this.service.getMyAffiliateLinks(userId);
      res.json({ success: true, links });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  trackClick = async (req: Request, res: Response) => {
    try {
      const { code } = req.params;
      await this.service.trackAffiliateClick(code);
      const link = await this.service.getAffiliateLinkByCode(code);
      // Redirect to product page or return info
      // Assuming frontend handles redirection, we return product info
      res.json({ success: true, product: link.product, link });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  listMyProducts = async (req: Request, res: Response) => {
    try {
      const sellerId = this.getUserId(req);
      const products = await this.service.listSellerProducts(sellerId);
      res.json({ success: true, products });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;
      const product = await this.service.getProductById(productId as string);
      res.json({ success: true, product });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    try {
      const sellerId = this.getUserId(req);
      const { productId } = req.params;
      const { name, description, price, isActive } = req.body;

      const product = await this.service.updateProduct(sellerId, productId as string, {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        isActive,
      });

      res.json({ success: true, product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    try {
      const sellerId = this.getUserId(req);
      const { productId } = req.params;

      const product = await this.service.deleteProduct(sellerId, productId as string);
      res.json({ success: true, product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}
