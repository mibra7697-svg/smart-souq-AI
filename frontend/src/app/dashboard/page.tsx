"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { dashboardService } from "@/services/dashboard.service";

type GrowthPoint = { month: string; sales: number; commissions: number };
type TopProductPoint = { name: string; total: number; orders: number };

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await dashboardService.getOverview();
        setData(result);
      } catch (err: any) {
        setError(err.message || "فشل في تحميل بيانات لوحة التحكم");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) return <div className="p-6 text-center text-red-500">خطأ: {error}</div>;
  if (!data) return <div className="p-6 text-center">لا توجد بيانات متاحة حالياً</div>;

  const { wallet, orders, commissions, commissionsTotal, payouts } = data;

  const completedOrders = orders.filter((o: any) => o.status === "DELIVERED").length;
  const refundedOrders = orders.filter((o: any) => o.status === "REFUNDED").length;

  const totalWithdrawn = payouts
    .filter((p: any) => p.status === "PROCESSED" || p.status === "APPROVED")
    .reduce((sum: number, p: any) => sum + Number(p.amount), 0);

  const pendingPayouts = payouts.filter((p: any) => p.status === "PENDING").length;

  // 3-month growth (sales + commissions) grouped by month
  const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const monthLabel = (d: Date) =>
    d.toLocaleDateString("ar-EG", { month: "long" });

  const salesByMonth = new Map<string, number>();
  (orders as any[]).forEach((o) => {
    if (o.status !== "DELIVERED") return;
    const d = new Date(o.createdAt);
    const key = monthKey(d);
    salesByMonth.set(key, (salesByMonth.get(key) || 0) + Number(o.amount));
  });

  const commissionsByMonth = new Map<string, number>();
  (commissions as any[]).forEach((c) => {
    const d = new Date(c.createdAt);
    const key = monthKey(d);
    commissionsByMonth.set(key, (commissionsByMonth.get(key) || 0) + Number(c.amount));
  });

  const allMonthKeys = Array.from(
    new Set([...salesByMonth.keys(), ...commissionsByMonth.keys()]),
  ).sort((a, b) => (a < b ? -1 : 1));

  const last3Keys = allMonthKeys.slice(-3);
  const growthPoints: GrowthPoint[] = last3Keys.map((k) => {
    const [y, m] = k.split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    return {
      month: monthLabel(d),
      sales: salesByMonth.get(k) || 0,
      commissions: commissionsByMonth.get(k) || 0,
    };
  });

  // Top products by delivered order amount
  const productMap = new Map<string, TopProductPoint>();
  (orders as any[]).forEach((o) => {
    if (o.status !== "DELIVERED") return;
    const name = o.product?.name || "منتج غير معروف";
    const current = productMap.get(name) || { name, total: 0, orders: 0 };
    current.total += Number(o.amount);
    current.orders += 1;
    productMap.set(name, current);
  });

  const topProducts: TopProductPoint[] = Array.from(productMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">نظرة عامة على لوحة التحكم</h1>

      {/* Wallet Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">محفظتي</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="الرصيد المتاح" value={`${wallet.availableBalance} ر.س`} color="green" />
          <Card title="الرصيد المعلق" value={`${wallet.pendingBalance} ر.س`} color="yellow" />
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">ملخص الطلبات</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="إجمالي الطلبات" value={orders.length} color="purple" />
          <Card title="الطلبات المكتملة" value={completedOrders} color="green" />
          <Card title="الطلبات المسترجعة" value={refundedOrders} color="red" />
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">الملخص المالي</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="إجمالي العمولات" value={`${commissionsTotal} ر.س`} color="indigo" />
          <Card title="إجمالي المسحوبات" value={`${totalWithdrawn} ر.س`} color="blue" />
          <Card title="طلبات سحب قيد الانتظار" value={pendingPayouts} color="orange" />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              نمو المبيعات والعمولات خلال ٣ أشهر
            </h2>
            <span className="text-xs text-gray-400">
              بيانات العرض (Offline) من قاعدة البيانات
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={growthPoints}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: any) => [`${Number(v).toFixed(0)} ر.س`, ""]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#7c3aed"
                strokeWidth={2}
                name="إجمالي المبيعات"
              />
              <Line
                type="monotone"
                dataKey="commissions"
                stroke="#f97316"
                strokeWidth={2}
                name="إجمالي العمولات"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              أفضل المنتجات أداءً
            </h2>
            <span className="text-xs text-gray-400">
              مرتّبة حسب إجمالي المبيعات في الفترة الأخيرة
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v: any) => `${Number(v).toFixed(0)} ر.س`} />
              <Legend />
              <Bar
                dataKey="total"
                fill="#22c55e"
                name="إجمالي المبيعات"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendation technical hint */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            التوصيات الذكية للمسوّقين
          </h2>
          <span
            className="text-xs text-gray-400 cursor-help"
            title="يقوم المحرك الذكي بتحليل فئات المنتجات، هامش العمولة، وسلوك الطلبات خلال آخر ٣٠ يوماً لإنشاء ترتيب ربحية محدث في الزمن شبه الحقيقي. هذا ما يجعل SmartSouq قادراً على توجيه المسوّق لأعلى المنتجات ربحيةً في كل لحظة."
          >
            ⓘ لماذا يعمل هذا؟
          </span>
        </div>
        <p className="text-sm text-gray-600">
          في وضع العرض، يتم استخدام بيانات حقيقية من قاعدة البيانات لمحاكاة كيفية اختيار النظام
          لأفضل المنتجات من حيث العمولة المتوقعة ومعدل التحويل، بحيث يمكن للمستثمر رؤية القيمة
          العملية لمحرك التوصيات.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value, color }: { title: string; value: string | number; color: string }) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    red: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <div className={`p-4 border rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
