"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

interface Payout {
  id: string;
  amount: number;
  status: string;
  seller?: {
    username: string;
    email: string;
  };
  method: string;
  iban?: string;
  walletAddress?: string;
}

interface Pagination {
  page: number;
  pages: number;
  total: number;
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  async function fetchPayouts(p = 1, s = "", st = "") {
    setLoading(true);
    const res = await api.get("/admin/payouts", {
      params: {
        page: p,
        limit: 20,
        search: s || undefined,
        status: st || undefined,
      },
    });

    setPayouts(res.data.data.payouts);
    setPagination(res.data.data.pagination);
    setLoading(false);
  }

  useEffect(() => {
    fetchPayouts(page, search, status);
  }, [page]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    fetchPayouts(1, search, status);
  }



  async function approvePayout(id: string) {
    try {
      setActionLoading(true);
      await api.post(`/admin/payouts/${id}/approve`);
      // Show success toast
      alert("Payout Approved: The payout request has been approved");
      fetchPayouts(page, search, status);
    } catch (err: any) {
      // Show error toast
      alert(`Error: ${err.response?.data?.message || "Failed to approve payout"}`);
    } finally {
      setActionLoading(false);
    }
  }

  async function rejectPayout(id: string) {
    try {
      setActionLoading(true);
      await api.post(`/admin/payouts/${id}/reject`);
      // Show success toast
      alert("Payout Rejected: The payout request has been rejected");
      fetchPayouts(page, search, status);
    } catch (err: any) {
      // Show error toast
      alert(`Error: ${err.response?.data?.message || "Failed to reject payout"}`);
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search payouts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="PROCESSING">Processing</option>
              <option value="PAID">Paid</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Apply
          </button>
        </form>
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 border">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Payout ID</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {payouts.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.id}</td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">${p.amount}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        p.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        p.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        p.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                        p.status === 'PAID' ? 'bg-teal-100 text-teal-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{p.seller?.username}</div>
                      <div className="text-xs text-gray-500">
                        {p.seller?.email}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {p.method === "BANK" ? (
                        <>
                          <div className="text-sm font-medium text-gray-900">Bank Transfer</div>
                          <div className="text-xs text-gray-500">
                            IBAN: {p.iban}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-sm font-medium text-gray-900">Crypto Wallet</div>
                          <div className="text-xs text-gray-500">
                            {p.walletAddress}
                          </div>
                        </>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => approvePayout(p.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading ? 'Processing...' : 'Approve'}
                        </button>

                        <button
                          onClick={() => rejectPayout(p.id)}
                          disabled={actionLoading}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {actionLoading ? 'Processing...' : 'Reject'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination && (
          <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{pagination.page}</span> of{' '}
                  <span className="font-medium">{pagination.pages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                    disabled={page === pagination.pages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
