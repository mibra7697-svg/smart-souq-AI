import { PrismaClient, Prisma, UserRole, OrderStatus, CommissionStatus, PayoutStatus, TransactionType, TransactionStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting professional database seeding...');

  // Clear existing data
  await prisma.walletTransaction.deleteMany();
  await prisma.payoutRequest.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.order.deleteMany();
  await prisma.affiliateLink.deleteMany();
  await prisma.product.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️ Cleared existing data');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@smartsouq.com',
      username: 'admin',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      name: 'System Administrator',
      role: UserRole.ADMIN,
      isActive: true,
    },
  });

  // Create seller users (5 demo sellers)
  const sellerInfos = [
    { email: 'techstore@smartsouq.com', username: 'techstore', name: 'Tech Store' },
    { email: 'fashionhub@smartsouq.com', username: 'fashionhub', name: 'Fashion Hub' },
    { email: 'homelife@smartsouq.com', username: 'homelife', name: 'Home & Living' },
    { email: 'gadgetworld@smartsouq.com', username: 'gadgetworld', name: 'Gadget World' },
    { email: 'beautycorner@smartsouq.com', username: 'beautycorner', name: 'Beauty Corner' },
  ];

  const sellers: any[] = [];
  for (const info of sellerInfos) {
    const passwordHash = await bcrypt.hash('seller123', 10);
    const seller = await prisma.user.create({
      data: {
        email: info.email,
        username: info.username,
        password: passwordHash,
        firstName: info.name.split(' ')[0],
        lastName: info.name.split(' ')[1] || '',
        name: info.name,
        role: UserRole.SELLER,
        isActive: true,
      },
    });
    sellers.push(seller);
  }

  const seller1 = sellers[0];

  // Create affiliate users (10 active affiliates)
  const affiliateBase = [
    'marketer1',
    'marketer2',
    'marketer3',
    'influencer1',
    'influencer2',
    'creator1',
    'creator2',
    'blogger1',
    'blogger2',
    'mediahub',
  ];

  const affiliates: any[] = [];
  for (const handle of affiliateBase) {
    const passwordHash = await bcrypt.hash('affiliate123', 10);
    const affiliate = await prisma.user.create({
      data: {
        email: `${handle}@smartsouq.com`,
        username: handle,
        password: passwordHash,
        firstName: handle,
        lastName: 'Affiliate',
        name: `Affiliate ${handle}`,
        role: UserRole.AFFILIATE,
        isActive: true,
      },
    });
    affiliates.push(affiliate);
  }

  const affiliate1 = affiliates[0];

  // Create buyer users
  const buyer1Password = await bcrypt.hash('buyer123', 10);
  const buyer1 = await prisma.user.create({
    data: {
      email: 'customer1@smartsouq.com',
      username: 'customer1',
      password: buyer1Password,
      firstName: 'Mohammed',
      lastName: 'Customer',
      name: 'Mohammed Customer',
      role: UserRole.BUYER,
      isActive: true,
    },
  });

  const buyer2Password = await bcrypt.hash('buyer123', 10);
  const buyer2 = await prisma.user.create({
    data: {
      email: 'customer2@smartsouq.com',
      username: 'customer2',
      password: buyer2Password,
      firstName: 'Fatima',
      lastName: 'Shopper',
      name: 'Fatima Shopper',
      role: UserRole.BUYER,
      isActive: true,
    },
  });

  console.log(`✅ Created users: Admin, ${sellers.length} Sellers, ${affiliates.length} Affiliates, 2 Buyers`);

  // Create wallets for all users
  const users = [admin, ...sellers, ...affiliates, buyer1, buyer2];
  for (const user of users) {
    await prisma.wallet.create({
      data: {
        userId: user.id,
        currency: 'SAR',
        availableBalance:
          user.role === UserRole.AFFILIATE
            ? new Prisma.Decimal(250)
            : user.role === UserRole.SELLER
            ? new Prisma.Decimal(500)
            : new Prisma.Decimal(200),
        pendingBalance:
          user.role === UserRole.AFFILIATE
            ? new Prisma.Decimal(150)
            : user.role === UserRole.SELLER
            ? new Prisma.Decimal(300)
            : new Prisma.Decimal(0),
      },
    });
  }

  console.log('✅ Created wallets for all users');

  // Create demo products for multiple categories
  const products: any[] = [];
  const productData = [
    { name: 'Smart Phone Pro', price: 999.99, commissionRate: 0.08, seller: sellers[0] },
    { name: 'Laptop Ultra', price: 1499.99, commissionRate: 0.1, seller: sellers[0] },
    { name: '4K Smart TV', price: 1899.99, commissionRate: 0.07, seller: sellers[1] },
    { name: 'Premium Headphones', price: 249.99, commissionRate: 0.12, seller: sellers[3] },
    { name: 'Designer Sneakers', price: 179.99, commissionRate: 0.15, seller: sellers[1] },
    { name: 'Home Coffee Machine', price: 399.99, commissionRate: 0.09, seller: sellers[2] },
  ];

  for (const p of productData) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        description: `${p.name} demo product`,
        price: p.price,
        // Stored as percentage in schema (Decimal(5,2)), e.g. 8 => 8%
        commissionRate: p.commissionRate * 100,
        sellerId: p.seller.id,
        isActive: true,
        stock: 20,
      },
    });
    products.push(product);
  }

  console.log(`✅ Created products: ${products.length}`);

  // Create 90 days (3 months) of orders, commissions, and wallet transactions with precise 30% growth
  const now = new Date();
  const orders: any[] = [];
  const commissions: any[] = [];

  // Define month ranges with precise multipliers
  const monthConfigs = [
    { startDay: 61, endDay: 90, multiplier: 1.00 }, // Month 1: Baseline (days 61-90)
    { startDay: 31, endDay: 60, multiplier: 1.15 }, // Month 2: 15% growth (days 31-60)
    { startDay: 1, endDay: 30, multiplier: 1.30 }   // Month 3: 30% growth (days 1-30)
  ];

  // Calculate baseline order count for uniform distribution
  const totalDays = 90;
  const targetTotalOrders = 450; // 5 orders per day average
  const baselineOrdersPerDay = Math.round(targetTotalOrders / totalDays / 1.15); // Adjusted for growth

  for (let dayOffset = 89; dayOffset >= 0; dayOffset--) {
    const day = new Date(now);
    day.setDate(now.getDate() - dayOffset);

    const currentDay = 90 - dayOffset; // 1..90 (day 1 = oldest, day 90 = newest)
    
    // Find which month configuration applies to this day
    const monthConfig = monthConfigs.find(config => 
      currentDay >= config.startDay && currentDay <= config.endDay
    ) || monthConfigs[0]; // Fallback to baseline

    // Calculate orders for this day with precise multiplier
    const ordersForDay = Math.max(1, Math.round(baselineOrdersPerDay * monthConfig.multiplier));

    for (let i = 0; i < ordersForDay; i++) {
      const buyer = i % 2 === 0 ? buyer1 : buyer2;
      const product = products[(dayOffset + i) % products.length];
      const affiliate = affiliates[(dayOffset + i) % affiliates.length];

      const amount = new Prisma.Decimal(product.price);
      const orderNumber = `ORD-${day.toISOString().slice(0, 10).replace(/-/g, '')}-${i + 1}`;

      const status =
        i === 0 && dayOffset % 13 === 0
          ? OrderStatus.REFUNDED
          : OrderStatus.DELIVERED;

      const order = await prisma.order.create({
        data: {
          orderNumber,
          buyerId: buyer.id,
          productId: product.id,
          amount,
          status,
          affiliateId: affiliate.id,
          createdAt: day,
          updatedAt: day,
        },
      });
      orders.push(order);

      if (status === OrderStatus.DELIVERED) {
        // Commission only for delivered orders
        const ratePercent =
          product.commissionRate ?? new Prisma.Decimal(10); // fallback to 10%
        const rateDecimal = (ratePercent as Prisma.Decimal).div(100);
        const commissionAmount = amount.mul(rateDecimal);

        // Demo statuses:
        // - Last ~7 days: PENDING (tracked but not earned)
        // - Last ~30 days: APPROVED (earned)
        // - Older: PAID (withdrawn)
        const commissionStatus =
          dayOffset <= 7
            ? CommissionStatus.PENDING
            : dayOffset <= 30
            ? CommissionStatus.APPROVED
            : CommissionStatus.PAID;

        const commission = await prisma.commission.create({
          data: {
            orderId: order.id,
            productId: product.id,
            userId: affiliate.id,
            amount: commissionAmount,
            rate: ratePercent,
            status: commissionStatus,
            createdAt: day,
            paidAt:
              commissionStatus === CommissionStatus.PAID ? now : null,
          },
        });
        commissions.push(commission);

        // Update affiliate wallet + transaction
        const wallet = await prisma.wallet.findUnique({
          where: { userId: affiliate.id },
        });
        if (wallet) {
          const walletUpdate: any = {};
          if (commissionStatus === CommissionStatus.PENDING || commissionStatus === CommissionStatus.APPROVED) {
            walletUpdate.pendingBalance = wallet.pendingBalance.plus(
              commissionAmount,
            );
          } else if (commissionStatus === CommissionStatus.PAID) {
            walletUpdate.availableBalance = wallet.availableBalance.plus(
              commissionAmount,
            );
          }

          await prisma.wallet.update({
            where: { id: wallet.id },
            data: walletUpdate,
          });

          await prisma.walletTransaction.create({
            data: {
              walletId: wallet.id,
              amount: commissionAmount,
              type: TransactionType.COMMISSION,
              status:
                commissionStatus === CommissionStatus.PAID
                  ? TransactionStatus.COMPLETED
                  : TransactionStatus.PENDING,
              referenceId: commission.id,
              description: 'Affiliate commission',
              createdAt: day,
            },
          });
        }
      }
    }
  }

  console.log(`✅ Created demo orders: ${orders.length}`);
  console.log(`✅ Created demo commissions: ${commissions.length}`);

  // Create payout requests and withdrawal transactions for top affiliates
  for (const affiliate of affiliates.slice(0, 3)) {
    const wallet = await prisma.wallet.findUnique({
      where: { userId: affiliate.id },
    });
    if (!wallet) continue;

    const payoutAmount = new Prisma.Decimal(100);
    await prisma.payoutRequest.create({
      data: {
        userId: affiliate.id,
        amount: payoutAmount,
        status: PayoutStatus.PROCESSED,
        method: 'bank_transfer',
        details: { iban: 'SA1234567890123456789012' },
        processedAt: now,
      },
    });

    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        availableBalance: wallet.availableBalance.minus(payoutAmount),
      },
    });

    await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        amount: payoutAmount.negated(),
        type: TransactionType.WITHDRAWAL,
        status: TransactionStatus.COMPLETED,
        referenceId: `PAYOUT-${affiliate.id}`,
        description: 'Demo payout withdrawal',
        createdAt: now,
      },
    });
  }

  console.log('✅ Created payout requests and withdrawal transactions');

  console.log('🎉 Database seeding completed successfully!');
  console.log('✅ Seeding complete – 90-day growth data applied');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
