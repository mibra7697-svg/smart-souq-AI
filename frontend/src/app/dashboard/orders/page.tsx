"use client";

import { useEffect, useState } from "react";
import { ordersService } from "@/services/orders.service";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await ordersService.getMyOrders();
        setOrders(data.orders || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "فشل في تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((o) => o.status === filter);

  if (loading) return <div className="p-6 text-center">جاري تحميل الطلبات...</div>;
  if (error) return <div className="p-6 text-center text-red-500">خطأ: {error}</div>;

  const statusMap: any = {
    ALL: "الكل",
    PENDING: "قيد الانتظار",
    PROCESSING: "قيد المعالجة",
    SHIPPED: "تم الشحن",
    DELIVERED: "تم التوصيل",
    CANCELLED: "ملغي",
    REFUNDED: "مسترجع",
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">طلباتي</h1>
        <div className="text-sm text-gray-600">
          الإجمالي: {orders.length} طلب
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-3">
          {Object.keys(statusMap).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                filter === s
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {statusMap[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-right text-sm font-medium text-gray-900">رقم الطلب</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">المنتج</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">المبلغ</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">الحالة</th>
                <th className="p-4 text-right text-sm font-medium text-gray-900">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="text-sm font-mono text-gray-900">
                      {order.id.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.product?.name || "منتج غير معروف"}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {order.productId?.slice(0, 8)}...
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-gray-900">
                      ${order.amount}
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {filter === "ALL" ? "لا توجد طلبات." : `لا توجد طلبات بحالة ${statusMap[filter]}.`}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">إجمالي الطلبات</div>
          <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">تم التوصيل</div>
          <div className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === "DELIVERED").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">قيد الانتظار</div>
          <div className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === "PENDING").length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">ملغي</div>
          <div className="text-2xl font-bold text-red-600">
            {orders.filter(o => o.status === "CANCELLED").length}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: any = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PROCESSING: "bg-blue-100 text-blue-800 border-blue-200",
    SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-200",
    DELIVERED: "bg-green-100 text-green-800 border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border-red-200",
    REFUNDED: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${colors[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}
    >
      {status}
    </span>
  );
}
