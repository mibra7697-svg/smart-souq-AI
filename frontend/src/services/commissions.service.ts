import api from "@/lib/axios";

export const commissionsService = {
  getMyCommissions: async () => {
    const res = await api.get("/commissions/my");
    return res.data;
  },

  getMyTotal: async () => {
    const res = await api.get("/commissions/my/total");
    return res.data.total;
  }
};
