"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type OverviewResponse = {
  stats: {
    totalOrders: number;
    completedOrders: number;
    refundedOrders: number;
    totalCommissions: number;
    totalPayouts: number;
    availableBalance: number;
    pendingBalance: number;
  };
  recentOrders: {
    id: string;
    sellerName: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
  topSellers: {
    id: string;
    name: string;
    totalSales: number;
    totalCommissions: number;
  }[];
  recentPayouts: {
    id: string;
    sellerName: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
};

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOverview() {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/admin/overview");
      setData(res.data);
    } catch (err: any) {
      console.error("Failed to load overview:", err);
      setError("Failed to load overview data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  const stats = data?.stats;

  // Prepare data for charts
  const ordersByStatusData = [
    { status: 'PENDING', count: data?.recentOrders.filter(o => o.status === 'PENDING').length || 0 },
    { status: 'PAID', count: data?.recentOrders.filter(o => o.status === 'PAID').length || 0 },
    { status: 'DELIVERED', count: data?.recentOrders.filter(o => o.status === 'DELIVERED').length || 0 },
    { status: 'CANCELLED', count: data?.recentOrders.filter(o => o.status === 'CANCELLED').length || 0 },
  ];

  // Mock data for commissions and payouts (6 months)
  const financialData = [
    { month: 'سبتمبر', commissions: stats?.totalCommissions ? stats.totalCommissions * 0.8 : 0, payouts: stats?.totalPayouts ? stats.totalPayouts * 0.7 : 0 },
    { month: 'أكتوبر', commissions: stats?.totalCommissions ? stats.totalCommissions * 0.9 : 0, payouts: stats?.totalPayouts ? stats.totalPayouts * 0.8 : 0 },
    { month: 'نوفمبر', commissions: stats?.totalCommissions ? stats.totalCommissions * 1.0 : 0, payouts: stats?.totalPayouts ? stats.totalPayouts * 0.9 : 0 },
    { month: 'ديسمبر', commissions: stats?.totalCommissions ? stats.totalCommissions * 1.1 : 0, payouts: stats?.totalPayouts ? stats.totalPayouts * 1.0 : 0 },
    { month: 'يناير', commissions: stats?.totalCommissions ? stats.totalCommissions * 1.2 : 0, payouts: stats?.totalPayouts ? stats.totalPayouts * 1.1 : 0 },
    { month: 'فبراير', commissions: stats?.totalCommissions || 0, payouts: stats?.totalPayouts || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-sm text-gray-500">
            High-level view of orders, commissions, payouts, and seller performance.
          </p>
        </div>
        <button
          onClick={fetchOverview}
          className="px-4 py-2 text-sm rounded-md bg-purple-600 text-white hover:bg-purple-700"
        >
          Refresh
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
          <div className="h-64 rounded-lg bg-gray-200 animate-pulse" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-48 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-48 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>
      )}

      {/* Content */}
      {!loading && data && (
        <>
          {/* Stats Cards */}
          <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <StatCard
              label="Total Orders"
              value={stats?.totalOrders ?? 0}
            />
            <StatCard
              label="Completed Orders"
              value={stats?.completedOrders ?? 0}
            />
            <StatCard
              label="Refunded Orders"
              value={stats?.refundedOrders ?? 0}
            />
            <StatCard
              label="Total Commissions"
              value={stats?.totalCommissions ?? 0}
              prefix="$"
            />
            <StatCard
              label="Total Payouts"
              value={stats?.totalPayouts ?? 0}
              prefix="$"
            />
            <StatCard
              label="Available Balance"
              value={stats?.availableBalance ?? 0}
              prefix="$"
              highlight
            />
            <StatCard
              label="Pending Balance"
              value={stats?.pendingBalance ?? 0}
              prefix="$"
            />
          </section>

          {/* Placeholder for Charts (structure جاهز لإضافة Recharts لاحقًا) */}
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">
                الطلبات حسب الحالة
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ordersByStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="count" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
              <h2 className="mb-2 text-sm font-semibold text-gray-700">
                العمولات والمدفوعات
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="commissions" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="العمولات"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="payouts" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    name="المدفوعات"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Tables */}
          <section className="grid gap-4 lg:grid-cols-2">
            {/* Recent Orders */}
            <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-gray-700">
                  Recent Orders
                </h2>
              </div>
              <div className="overflow-x-auto">
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
                    {data.recentOrders.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-4 text-center text-xs text-gray-400"
                        >
                          No recent orders.
                        </td>
                      </tr>
                    )}
                    {data.recentOrders.map((order) => (
                      <tr key={order.id} className="border-b last:border-0">
                        <td className="py-2 text-xs text-gray-700">
                          {order.id}
                        </td>
                        <td className="py-2 text-xs text-gray-700">
                          {order.sellerName}
                        </td>
                        <td className="py-2 text-xs text-right text-gray-800">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="py-2 text-xs text-center">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                              order.status === "COMPLETED"
                                ? "bg-green-100 text-green-700"
                                : order.status === "REFUNDED"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2 text-xs text-right text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Sellers & Recent Payouts */}
            <div className="space-y-4">
              {/* Top Sellers */}
              <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-700">
                    Top Sellers
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b text-xs text-gray-500">
                        <th className="py-2 text-left">Seller</th>
                        <th className="py-2 text-right">Sales</th>
                        <th className="py-2 text-right">Commissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topSellers.length === 0 && (
                        <tr>
                          <td
                            colSpan={3}
                            className="py-4 text-center text-xs text-gray-400"
                          >
                            No sellers data.
                          </td>
                        </tr>
                      )}
                      {data.topSellers.map((seller) => (
                        <tr key={seller.id} className="border-b last:border-0">
                          <td className="py-2 text-xs text-gray-700">
                            {seller.name}
                          </td>
                          <td className="py-2 text-xs text-right text-gray-800">
                            ${seller.totalSales.toFixed(2)}
                          </td>
                          <td className="py-2 text-xs text-right text-gray-800">
                            ${seller.totalCommissions.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Payouts */}
              <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-700">
                    Recent Payouts
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b text-xs text-gray-500">
                        <th className="py-2 text-left">Seller</th>
                        <th className="py-2 text-right">Amount</th>
                        <th className="py-2 text-center">Status</th>
                        <th className="py-2 text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentPayouts.length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-4 text-center text-xs text-gray-400"
                          >
                            No recent payouts.
                          </td>
                        </tr>
                      )}
                      {data.recentPayouts.map((payout) => (
                        <tr key={payout.id} className="border-b last:border-0">
                          <td className="py-2 text-xs text-gray-700">
                            {payout.sellerName}
                          </td>
                          <td className="py-2 text-xs text-right text-gray-800">
                            ${payout.amount.toFixed(2)}
                          </td>
                          <td className="py-2 text-xs text-center">
                            <span
                              className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                payout.status === "COMPLETED"
                                  ? "bg-green-100 text-green-700"
                                  : payout.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {payout.status}
                            </span>
                          </td>
                          <td className="py-2 text-xs text-right text-gray-500">
                            {new Date(payout.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  prefix,
  highlight,
}: {
  label: string;
  value: number;
  prefix?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border bg-white p-4 shadow-sm ${
        highlight ? "border-purple-500" : "border-gray-100"
      }`}
    >
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-gray-900">
        {prefix ? `${prefix}${value.toLocaleString()}` : value.toLocaleString()}
      </p>
    </div>
  );
}
