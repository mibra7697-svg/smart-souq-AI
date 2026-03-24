"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type Commission = {
  id: string;
  orderId: string;
  sellerName: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  async function fetchCommissions() {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/admin/commissions", {
        params: { page, limit: 20 },
      });

      setCommissions(res.data.commissions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load commissions.");
    } finally {
      setLoading(false);
    }
  }

  async function releaseCommission(id: string) {
    try {
      await api.post(`/admin/commissions/${id}/release`);
      fetchCommissions();
    } catch (err) {
      console.error(err);
      alert("Failed to release commission.");
    }
  }

  useEffect(() => {
    fetchCommissions();
  }, [page]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Commissions</h1>
        <button
          onClick={fetchCommissions}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Refresh
        </button>
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
                <th className="py-2 text-left">Commission ID</th>
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Seller</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-right">Date</th>
                <th className="py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {commissions.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-gray-400">
                    No commissions found.
                  </td>
                </tr>
              )}

              {commissions.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="py-2">{c.id}</td>
                  <td className="py-2">{c.orderId}</td>
                  <td className="py-2">{c.sellerName}</td>
                  <td className="py-2 text-right text-gray-800">
                    ${c.amount.toFixed(2)}
                  </td>
                  <td className="py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        c.status === "RELEASED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-2 text-right text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 text-center">
                    {c.status === "PENDING" ? (
                      <button
                        onClick={() => releaseCommission(c.id)}
                        className="px-3 py-1 bg-purple-600 text-white rounded-md text-xs hover:bg-purple-700"
                      >
                        Release
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
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
