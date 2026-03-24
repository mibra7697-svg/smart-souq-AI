"use client";

export default function TechnicalOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">الملخص التقني (للمستثمر)</h1>
        <p className="text-sm text-gray-600 mt-2">
          صفحة مختصرة لعرض قوة المنصة بشكل سريع أثناء الديمو.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="درجة الأمان"
          value="10/10"
          description="JWT + Helmet + Rate Limiting + CORS مضبوط"
          accent="from-emerald-500 to-emerald-600"
        />
        <Card
          title="المعمارية"
          value="قابلة للتوسع"
          description="Node.js + Next.js + Prisma + PostgreSQL"
          accent="from-violet-500 to-violet-600"
        />
        <Card
          title="الوحدات"
          value="7 وحدات مكتملة"
          description="Micro‑Monolith بهيكل واضح وقابل للتوسع"
          accent="from-orange-500 to-orange-600"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">نقاط القوة في وضع العرض</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>
            - بيانات نمو واقعية لآخر 3 أشهر (اتجاه تصاعدي ~30%) لعرض الرسوم البيانية بشكل جذاب.
          </li>
          <li>
            - تدفقات مالية واضحة: Pending / Earned / Withdrawn مع سجل معاملات قابل للتدقيق.
          </li>
          <li>
            - إشعارات تيليجرام فورية قابلة للاختبار عبر زر واحد داخل لوحة التحكم.
          </li>
        </ul>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  description,
  accent,
}: {
  title: string;
  value: string;
  description: string;
  accent: string;
}) {
  return (
    <div className={`rounded-lg p-[1px] bg-gradient-to-r ${accent}`}>
      <div className="bg-white rounded-lg p-5 h-full">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
        <div className="text-xs text-gray-600 mt-2">{description}</div>
      </div>
    </div>
  );
}

