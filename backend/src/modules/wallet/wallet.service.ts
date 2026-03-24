import { prisma } from '../../core/prisma/client';
import { Prisma } from '@prisma/client';

export class WalletService {
  async getOrCreateWallet(userId: string, currency = 'USD') {
    let wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      // Check if user exists first
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        throw new Error('User not found');
      }

      wallet = await prisma.wallet.create({
        data: { 
          userId, 
          currency, 
          availableBalance: new Prisma.Decimal(0),
          pendingBalance: new Prisma.Decimal(0) 
        },
      });
    }

    return wallet;
  }

  async deposit(userId: string, amount: number, metadata?: any) {
    return prisma.$transaction(async (tx) => {
      const wallet = await this.getOrCreateWallet(userId);

      const txRecord = await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'DEPOSIT',
          amount: new Prisma.Decimal(amount),
          status: 'COMPLETED',
          description: metadata?.description || 'Deposit',
        },
      });

      await tx.wallet.update({
        where: { id: wallet.id },
        data: {
          availableBalance: wallet.availableBalance.plus(new Prisma.Decimal(amount)),
        },
      });

      return txRecord;
    });
  }

  async withdraw(userId: string, amount: number) {
    return prisma.$transaction(async (tx) => {
      const wallet = await this.getOrCreateWallet(userId);

      if (wallet.availableBalance.lessThan(new Prisma.Decimal(amount))) {
        throw new Error('INSUFFICIENT_BALANCE');
      }

      const txRecord = await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'WITHDRAWAL',
          amount: new Prisma.Decimal(amount),
          status: 'PENDING',
        },
      });

      return txRecord;
    });
  }

  async transfer(fromUserId: string, toUserId: string, amount: number) {
    return prisma.$transaction(async (tx) => {
      const fromWallet = await this.getOrCreateWallet(fromUserId);
      const toWallet = await this.getOrCreateWallet(toUserId);

      if (fromWallet.availableBalance.lessThan(new Prisma.Decimal(amount))) {
        throw new Error('INSUFFICIENT_BALANCE');
      }

      const debitTx = await tx.walletTransaction.create({
        data: {
          walletId: fromWallet.id,
          type: 'TRANSFER',
          amount: new Prisma.Decimal(amount),
          status: 'COMPLETED',
        },
      });

      const creditTx = await tx.walletTransaction.create({
        data: {
          walletId: toWallet.id,
          type: 'TRANSFER',
          amount: new Prisma.Decimal(amount),
          status: 'COMPLETED',
        },
      });

      await tx.wallet.update({
        where: { id: fromWallet.id },
        data: { availableBalance: fromWallet.availableBalance.minus(new Prisma.Decimal(amount)) },
      });

      await tx.wallet.update({
        where: { id: toWallet.id },
        data: { availableBalance: toWallet.availableBalance.plus(new Prisma.Decimal(amount)) },
      });

      return { debitTx, creditTx };
    });
  }

  async listTransactions(userId: string, limit = 50) {
    const wallet = await this.getOrCreateWallet(userId);

    return prisma.walletTransaction.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getWallet(userId: string) {
    return this.getOrCreateWallet(userId);
  }
}
