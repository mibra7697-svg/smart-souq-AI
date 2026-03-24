import api from "@/lib/axios";

export const productsService = {
  getProducts: async (params = {}) => {
    const res = await api.get("/products", { params });
    return res.data;
  },

  getProduct: async (id: string) => {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  generateAffiliateLink: async (productId: string) => {
    const res = await api.post(`/products/${productId}/affiliate`);
    return res.data;
  }
};
