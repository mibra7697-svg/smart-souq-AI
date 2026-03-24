"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.message || "بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (role: "admin" | "seller" | "affiliate") => {
    const creds = {
      admin: { email: "admin@smartsouq.com", password: "admin123" },
      seller: { email: "techstore@smartsouq.com", password: "seller123" },
      affiliate: { email: "marketer1@smartsouq.com", password: "affiliate123" },
    };
    setEmail(creds[role].email);
    setPassword(creds[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🛍️ SmartSouq</h1>
          <p className="text-gray-500 mt-2">سجّل دخولك للمتابعة</p>
        </div>

        {/* Quick fill buttons */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-2 text-center">دخول سريع للتجربة:</p>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={() => fillCredentials("admin")}
              className="flex-1 py-2 text-xs bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 font-medium transition-colors"
            >
              🔑 أدمن
            </button>
            <button 
              type="button" 
              onClick={() => fillCredentials("seller")}
              className="flex-1 py-2 text-xs bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors"
            >
              🏪 بائع
            </button>
            <button 
              type="button" 
              onClick={() => fillCredentials("affiliate")}
              className="flex-1 py-2 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium transition-colors"
            >
              📢 مسوّق
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة المرور
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          SmartSouq © 2026 — منصة التسويق بالعمولة
        </p>
      </div>
    </div>
  );
}