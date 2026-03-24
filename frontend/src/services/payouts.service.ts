import api from "@/lib/axios";

export type PayoutMethod = "BANK_TRANSFER" | "PAYPAL" | "VODAFONE_CASH" | "INSTAPAY" | "USDC_SOLANA";
export type PayoutStatus = "PENDING" | "APPROVED" | "REJECTED" | "PROCESSED";

export interface Payout {
  id: string;
  userId: string;
  amount: string;
  status: PayoutStatus;
  method: PayoutMethod;
  details: {
    destination?: string;
    token?: string;
    network?: string;
  } | null;
  processedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface MyPayoutsResponse {
  success: boolean;
  payouts: Payout[];
}

interface RequestPayoutPayload {
  amount: number;
  method: PayoutMethod;
}

interface RequestPayoutResponse {
  success: boolean;
  payout: Payout;
}

export const payoutsService = {
  getMyPayouts: async (): Promise<MyPayoutsResponse> => {
    const res = await api.get<MyPayoutsResponse>("/payouts/my");
    return res.data;
  },

  requestPayout: async (payload: RequestPayoutPayload): Promise<RequestPayoutResponse> => {
    const res = await api.post<RequestPayoutResponse>("/payouts/request", payload);
    return res.data;
  }
};
