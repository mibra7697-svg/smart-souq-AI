import api from "@/lib/axios";

export type PayoutPreference = "BANK" | "SOLANA";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  role: string;
  isActive: boolean;
  solanaAddress: string | null;
  payoutPreference: PayoutPreference;
  createdAt: string;
  updatedAt: string;
}

interface GetProfileResponse {
  success: boolean;
  user: UserProfile;
}

interface UpdateProfilePayload {
  solanaAddress?: string | null;
  payoutPreference?: PayoutPreference;
}

interface UpdateProfileResponse {
  success: boolean;
  user: UserProfile;
}

export const profileService = {
  async getProfile(): Promise<GetProfileResponse> {
    const res = await api.get<GetProfileResponse>("/auth/me");
    return res.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UpdateProfileResponse> {
    const res = await api.patch<UpdateProfileResponse>("/auth/profile", payload);
    return res.data;
  }
};
