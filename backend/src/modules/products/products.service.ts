import { prisma } from "../../core/prisma/client";
import { Prisma } from "@prisma/client";

export class ProductsService {
  async createProduct(sellerId: string, data: { name: string; description?: string; price: number; currency?: string }) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: new Prisma.Decimal(data.price),
        sellerId,
      },
    });
  }

  async listActiveProducts(params: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  } = {}) {
    const { page = 1, limit = 10, search, sort, minPrice, maxPrice } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      isActive: true,
    };
    
    const andConditions: Prisma.ProductWhereInput[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (minPrice !== undefined) {
      andConditions.push({ price: { gte: new Prisma.Decimal(minPrice) } });
    }

    if (maxPrice !== undefined) {
      andConditions.push({ price: { lte: new Prisma.Decimal(maxPrice) } });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sort === "price_asc") orderBy.price = "asc";
    else if (sort === "price_desc") orderBy.price = "desc";
    else if (sort === "name_asc") orderBy.name = "asc";
    else if (sort === "name_desc") orderBy.name = "desc";
    else orderBy.createdAt = "desc"; // Default

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // --- Affiliate Methods ---

  async generateAffiliateLink(userId: string, productId: string) {
    // Check if product exists and is active
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      throw new Error("PRODUCT_NOT_AVAILABLE");
    }

    // Check if link already exists
    const existingLink = await prisma.affiliateLink.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (existingLink) {
      return existingLink;
    }

    // Generate unique code (e.g., productID-userID-random)
    // Simple implementation: random string
    const code = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

    return prisma.affiliateLink.create({
      data: {
        userId,
        productId,
        code,
      },
    });
  }

  async getAffiliateLinkByCode(code: string) {
    const link = await prisma.affiliateLink.findUnique({
      where: { code },
      include: {
        product: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true
          }
        }
      }
    });
    
    if (!link) throw new Error("INVALID_LINK");
    return link;
  }

  async trackAffiliateClick(code: string) {
    const link = await prisma.affiliateLink.findUnique({ where: { code } });
    if (!link) throw new Error("INVALID_LINK");

    return prisma.affiliateLink.update({
      where: { code },
      data: { clicks: { increment: 1 } },
    });
  }
  
  async getMyAffiliateLinks(userId: string) {
    return prisma.affiliateLink.findMany({
      where: { userId },
      include: {
        product: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async listSellerProducts(sellerId: string) {
    return prisma.product.findMany({
      where: { sellerId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getProductById(productId: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error("PRODUCT_NOT_FOUND");
    return product;
  }

  async updateProduct(sellerId: string, productId: string, data: { name?: string; description?: string; price?: number; isActive?: boolean }) {
    const product = await prisma.product.findFirst({
      where: { id: productId, sellerId },
    });
    if (!product) throw new Error("PRODUCT_NOT_FOUND_OR_FORBIDDEN");

    return prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name ?? product.name,
        description: data.description ?? product.description,
        price: data.price !== undefined ? new Prisma.Decimal(data.price) : product.price,
        isActive: data.isActive ?? product.isActive,
      },
    });
  }

  async deleteProduct(sellerId: string, productId: string) {
    const product = await prisma.product.findFirst({
      where: { id: productId, sellerId },
    });
    if (!product) throw new Error("PRODUCT_NOT_FOUND_OR_FORBIDDEN");

    return prisma.product.update({
      where: { id: productId },
      data: { isActive: false },
    });
  }
}
