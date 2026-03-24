"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import { WalletConnectButton } from "@/components/web3/WalletConnectButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { profileService, UserProfile } from "@/services/profile.service";
import { AxiosError } from "axios";

export default function DashboardSettingsPage() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [savingWallet, setSavingWallet] = useState(false);
  const [walletMessage, setWalletMessage] = useState<string | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { publicKey, connected } = useWallet();

  const connectedAddress = useMemo(() => publicKey?.toBase58() ?? "", [publicKey]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileService.getProfile();
        setProfile(response.user);
      } catch (_error) {
        setWalletError("تعذّر تحميل ملفك الشخصي، يرجى المحاولة مرة أخرى.");
      }
    };

    loadProfile();
  }, []);

  const handleTestNotification = async () => {
    try {
      setSending(true);
      setMessage(null);
      await api.post("/telegram/test", {
        message: "🔔 رسالة تجريبية من وضع العرض في SmartSouq (حساب البائع/المسوّق).",
      });
      setMessage("تم إرسال الإشعار التجريبي إلى تيليجرام بنجاح.");
    } catch (error) {
      setMessage("تعذّر إرسال الإشعار. يرجى التحقق من إعدادات تيليجرام في ملف البيئة.");
    } finally {
      setSending(false);
    }
  };

  const handleSaveWallet = async () => {
    if (!connected || !connectedAddress) {
      setWalletError("يرجى ربط المحفظة أولًا.");
      setWalletMessage(null);
      return;
    }

    let walletPublicKey: PublicKey;
    try {
      walletPublicKey = new PublicKey(connectedAddress);
    } catch (_error) {
      setWalletError("عنوان المحفظة غير صالح.");
      setWalletMessage(null);
      return;
    }

    if (!PublicKey.isOnCurve(walletPublicKey.toBytes())) {
      setWalletError("عنوان Solana غير صالح (ليس على المنحنى).");
      setWalletMessage(null);
      return;
    }

    setSavingWallet(true);
    setWalletError(null);
    setWalletMessage(null);

    try {
      const response = await profileService.updateProfile({
        solanaAddress: walletPublicKey.toBase58(),
        payoutPreference: "SOLANA"
      });
      setProfile(response.user);
      setWalletMessage("تم حفظ عنوان محفظة Solana في الملف الشخصي بنجاح.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setWalletError(axiosError.response?.data?.message ?? "تعذّر حفظ عنوان المحفظة.");
    } finally {
      setSavingWallet(false);
    }
  };

  const handleCopySavedAddress = async () => {
    if (!profile?.solanaAddress) {
      return;
    }

    try {
      await navigator.clipboard.writeText(profile.solanaAddress);
      setWalletError(null);
      setWalletMessage("تم نسخ عنوان Solana المحفوظ.");
    } catch (_error) {
      setWalletMessage(null);
      setWalletError("تعذّر نسخ العنوان. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">محفظة سحب الأرباح (Solana)</h2>
        <p className="text-sm text-gray-600">
          اربط محفظتك ثم احفظ العنوان لاستخدامه في السحب عبر عملة USDC على شبكة Solana.
        </p>

        <div className="w-full sm:w-auto">
          <WalletConnectButton />
        </div>

        <div className="text-sm text-gray-700 space-y-1 break-all">
          <p>
            <span className="font-medium">العنوان المرتبط الآن:</span>{" "}
            {connectedAddress || "لا يوجد عنوان متصل"}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium">العنوان المحفوظ في الملف الشخصي:</span>{" "}
            {profile?.solanaAddress || "غير محفوظ"}
            {profile?.solanaAddress && (
              <button
                type="button"
                onClick={handleCopySavedAddress}
                className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                aria-label="نسخ عنوان Solana"
                title="نسخ"
              >
                📋 نسخ
              </button>
            )}
          </p>
        </div>

        {walletError && (
          <div className="text-sm px-4 py-2 rounded border border-red-200 bg-red-50 text-red-700">
            {walletError}
          </div>
        )}
        {walletMessage && (
          <div className="text-sm px-4 py-2 rounded border border-green-200 bg-green-50 text-green-700">
            {walletMessage}
          </div>
        )}

        <button
          onClick={handleSaveWallet}
          disabled={!connected || savingWallet}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {savingWallet ? "جاري الحفظ..." : "حفظ في الملف الشخصي"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          إشعارات تيليجرام (وضع العرض)
        </h2>
        <p className="text-sm text-gray-600">
          استخدم هذا الزر لإرسال رسالة تجريبية إلى بوت تيليجرام المتصل بحساب العرض.
        </p>

        {message && (
          <div className="text-sm px-4 py-2 rounded border border-gray-200 bg-gray-50 text-gray-700">
            {message}
          </div>
        )}

        <button
          onClick={handleTestNotification}
          disabled={sending}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? "جاري إرسال الإشعار..." : "إرسال إشعار تجريبي إلى تيليجرام"}
        </button>
      </div>
    </div>
  );
}

