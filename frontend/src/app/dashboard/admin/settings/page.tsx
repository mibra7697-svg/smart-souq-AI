"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function AdminSettingsPage() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleTestNotification = async () => {
    try {
      setSending(true);
      setMessage(null);
      await api.post("/telegram/test", {
        message: "🔔 رسالة تجريبية من وضع العرض في SmartSouq (حساب المشرف).",
      });
      setMessage("تم إرسال الإشعار التجريبي إلى تيليجرام بنجاح.");
    } catch (error) {
      setMessage("تعذّر إرسال الإشعار. يرجى التحقق من إعدادات تيليجرام في ملف البيئة.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">إعدادات المشرف</h1>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          اختبار إشعارات تيليجرام
        </h2>
        <p className="text-sm text-gray-600">
          يسمح لك هذا الزر بإرسال رسالة تجريبية إلى بوت تيليجرام المتصل بالنظام لعرض
          التنبيهات الفورية أمام المستثمر.
        </p>

        {message && (
          <div className="text-sm px-4 py-2 rounded border border-gray-200 bg-gray-50 text-gray-700">
            {message}
          </div>
        )}

        <button
          onClick={handleTestNotification}
          disabled={sending}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? "جاري إرسال الإشعار..." : "إرسال إشعار تجريبي الآن"}
        </button>
      </div>
    </div>
  );
}

