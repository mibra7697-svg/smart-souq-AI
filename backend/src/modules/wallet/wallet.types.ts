export interface DepositDTO {
  amount: number;
}

export interface WithdrawDTO {
  amount: number;
}

export interface TransferDTO {
  amount: number;
  toUserId: string;
}
