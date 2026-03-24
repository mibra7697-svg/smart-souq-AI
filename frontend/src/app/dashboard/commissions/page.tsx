"use client";

import { useEffect, useState } from "react";
import { commissionsService } from "@/services/commissions.service";

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch both commissions and total in parallel
        const [commissionsData, totalData] = await Promise.all([
          commissionsService.getMyCommissions(),
          commissionsService.getMyTotal()
        ]);

        setCommissions(commissionsData.commissions || []);
        setTotal(totalData);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load commissions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">جاري تحميل العمولات...</div>;
  if (error) return <div className="p-6 text-center text-red-500">خطأ: {error}</div>;

  // Calculate statistics
  const approvedCommissions = commissions.filter(c => c.status === "APPROVED").length;
  const paidCommissions = commissions.filter(c => c.status === "PAID").length;
  const pendingCommissions = commissions.filter(c => c.status === "PENDING").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">عمولاتي</h1>
        <div className="text-sm text-gray-600">
          الإجمالي: {commissions.length} عمولة
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">إجمالي الأرباح</p>
              <p className="text-3xl font-bold mt-2">${total}</p>
            </div>
            <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">مقبولة</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{approvedCommissions}</p>
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
              <p className="text-gray-600 text-sm font-medium">مدفوعة</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{paidCommissions}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">قيد الانتظار</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCommissions}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Commissions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-right text-sm font-medium text-gray-900">رقم الطلب</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">المبلغ</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">النسبة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {commissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="text-sm font-mono text-gray-900">
                      {commission.orderId.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      ${commission.amount}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {(Number(commission.rate) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={commission.status} />
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">
                      {new Date(commission.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(commission.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {commissions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                لا توجد عمولات حالياً.
              </div>
              <p className="text-sm text-gray-400 mt-2">
                ابدأ في إكمال الطلبات لربح العمولات!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    APPROVED: "bg-green-100 text-green-800 border-green-200",
    PAID: "bg-blue-100 text-blue-800 border-blue-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${colors[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
    >
      {status}
    </span>
  );
}
