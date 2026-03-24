"use client";

import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { payoutsService, Payout, PayoutMethod, PayoutStatus } from "@/services/payouts.service";
import { profileService } from "@/services/profile.service";

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<PayoutMethod>("BANK_TRANSFER");
  const [solanaAddress, setSolanaAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchPayouts();
    fetchProfile();
  }, []);

  const fetchPayouts = async () => {
    try {
      const data = await payoutsService.getMyPayouts();
      setPayouts(data.payouts || []);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "فشل في تحميل طلبات السحب");
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await profileService.getProfile();
      const savedAddress = data.user.solanaAddress;
      if (savedAddress) {
        setSolanaAddress(savedAddress);
        setMethod("USDC_SOLANA");
      }
    } catch (_error) {
      // Keep backward compatibility: payouts still work without wallet profile.
    }
  };

  const handleRequest = async () => {
    if (!amount || Number(amount) <= 0) {
      setError("يرجى إدخال مبلغ صحيح");
      return;
    }

    if (method === "USDC_SOLANA" && !solanaAddress) {
      setError("يرجى حفظ عنوان محفظة Solana من صفحة الإعدادات أولًا.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await payoutsService.requestPayout({ amount: Number(amount), method });
      setSuccess(`تم تقديم طلب السحب بقيمة $${amount} بنجاح!`);
      setAmount("");
      await fetchPayouts(); // Refresh the list
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || "فشل في طلب السحب");
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalRequested = payouts.reduce((sum, p) => sum + Number(p.amount), 0);
  const approvedAmount = payouts
    .filter(p => p.status === "APPROVED")
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingAmount = payouts
    .filter(p => p.status === "PENDING")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">طلبات السحب</h1>
        <div className="text-sm text-gray-600">
          الإجمالي: {payouts.length} طلب
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">إجمالي المطلوبات</p>
              <p className="text-3xl font-bold mt-2">${totalRequested}</p>
            </div>
            <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">مقبولة</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${approvedAmount}</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">${pendingAmount}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">مرفوضة</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {payouts.filter(p => p.status === "REJECTED").length}
              </p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Request Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">طلب سحب جديد</h2>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {success}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="flex-1 w-full">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              المبلغ ($)
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="أدخل المبلغ المراد سحبه"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="1"
              step="0.01"
            />
          </div>
          <div className="flex-1 w-full">
            <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-2">
              طريقة السحب
            </label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="BANK_TRANSFER">تحويل بنكي</option>
              <option value="PAYPAL">باي بال</option>
              <option value="VODAFONE_CASH">فودافون كاش</option>
              <option value="INSTAPAY">إنستا باي</option>
              <option value="USDC_SOLANA">سحب USDC عبر شبكة Solana 🔵</option>
            </select>
          </div>
          {method === "USDC_SOLANA" && (
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان الاستلام عبر Solana
              </label>
              <input
                type="text"
                value={solanaAddress ?? ""}
                readOnly
                placeholder="احفظ عنوانك من صفحة الإعدادات"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            </div>
          )}
          <button
            onClick={handleRequest}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "جاري المعالجة..." : "طلب السحب"}
          </button>
        </div>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-right text-sm font-medium text-gray-900">المبلغ</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">تاريخ الطلب</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">تاريخ المعالجة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      ${payout.amount}
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={payout.status} />
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">
                      {new Date(payout.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(payout.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="p-4">
                    {payout.processedAt ? (
                      <>
                        <div className="text-sm text-gray-900">
                          {new Date(payout.processedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(payout.processedAt).toLocaleTimeString()}
                        </div>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {payouts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                No payout requests found.
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Request your first payout above!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PayoutStatus }) {
  const colors: Record<PayoutStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    REJECTED: "bg-red-100 text-red-800 border-red-200",
    PROCESSED: "bg-blue-100 text-blue-800 border-blue-200"
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${colors[status]}`}
    >
      {status}
    </span>
  );
}
