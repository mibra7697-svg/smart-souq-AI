import api from "@/lib/axios";

export const ordersService = {
  getMyOrders: async () => {
    const res = await api.get("/orders/my");
    return res.data;
  }
};
