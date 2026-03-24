"use client";

import { useMemo } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export function WalletConnectButton() {
  const { publicKey } = useWallet();

  const truncatedAddress = useMemo(() => {
    const address = publicKey?.toBase58();
    if (!address) return null;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }, [publicKey]);

  return (
    <div className="wallet-adapter-wrapper space-y-2">
      <WalletMultiButton
        className="!h-11 !rounded-lg !bg-blue-600 !text-white !text-sm !font-medium hover:!bg-blue-700 !transition-colors !px-4 !inline-flex !items-center !justify-center !min-w-[160px]"
        labels={{
          "change-wallet": "تغيير المحفظة",
          connecting: "جاري الربط...",
          "copy-address": "نسخ العنوان",
          copied: "تم النسخ",
          disconnecting: "جاري قطع الاتصال...",
          "has-wallet": "ربط المحفظة",
          "no-wallet": "ربط المحفظة",
          disconnect: "قطع الاتصال"
        }}
      />
      {truncatedAddress && (
        <p className="text-xs text-gray-600" dir="ltr">
          {truncatedAddress}
        </p>
      )}
    </div>
  );
}
