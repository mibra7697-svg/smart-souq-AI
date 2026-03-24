import api from "@/lib/axios";

export const dashboardService = {
  getOverview: async () => {
    const [wallet, orders, commissionsTotal, commissionsList, payouts] = await Promise.all([
      api.get("/wallet"),
      api.get("/orders/my"),
      api.get("/commissions/my/total"),
      api.get("/commissions/my"),
      api.get("/payouts/my")
    ]);

    return {
      wallet: wallet.data.wallet,
      orders: orders.data.orders,
      commissionsTotal: commissionsTotal.data.total,
      commissions: commissionsList.data.commissions,
      payouts: payouts.data.payouts
    };
  }
};
