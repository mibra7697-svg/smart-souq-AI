"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Order = {
  id: string;
  sellerName: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  async function fetchOrders() {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/admin/orders", {
        params: { page, limit: 20, status: status === "ALL" ? undefined : status },
      });

      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>

        <div className="flex gap-2">
          <select
            className="px-3 py-2 border rounded-md text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="REFUNDED">Refunded</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-md" />
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-gray-500">
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Seller</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              )}

              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="py-2">{order.id}</td>
                  <td className="py-2">{order.sellerName}</td>
                  <td className="py-2 text-right text-gray-800">
                    ${order.amount.toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        order.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "REFUNDED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 text-right text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
