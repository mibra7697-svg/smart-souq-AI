"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../providers/AuthProvider";

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: "🏠", exact: true },
  { href: "/dashboard/orders", label: "طلباتي", icon: "📦" },
  { href: "/dashboard/commissions", label: "عمولاتي", icon: "💰" },
  { href: "/dashboard/payouts", label: "المدفوعات", icon: "💳" },
  { href: "/dashboard/products", label: "المنتجات", icon: "🛍️" },
  { href: "/dashboard/settings", label: "الإعدادات", icon: "⚙️" },
];

const adminItems = [
  { href: "/dashboard/admin", label: "نظرة عامة", icon: "📊", exact: true },
  { href: "/dashboard/admin/users", label: "المستخدمون", icon: "👥" },
  { href: "/dashboard/admin/orders", label: "الطلبات", icon: "📋" },
  { href: "/dashboard/admin/commissions", label: "العمولات", icon: "💵" },
  { href: "/dashboard/admin/payouts", label: "السحوبات", icon: "💸" },
  { href: "/dashboard/admin/settings", label: "إعدادات المشرف", icon: "⚙️" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const isActive = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const NavItem = ({ href, label, icon, exact = false }: { href: string; label: string; icon: string; exact?: boolean }) => (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive(href, exact)
          ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
      onClick={() => setIsSidebarOpen(false)}
    >
      <span className="ml-3 text-lg">{icon}</span>
      <span className="mr-2">{label}</span>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center" dir="rtl">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header with logo */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">🛍️ SmartSouq</h1>
            </div>
            
            {/* User info */}
            <div className="flex items-center">
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  {user?.name || "مستخدم"}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.role === "ADMIN" ? "مدير النظام" : 
                   user?.role === "SELLER" ? "بائع" : 
                   user?.role === "AFFILIATE" ? "مسوّق" : "مستخدم"}
                </p>
                <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}

            {/* Admin section */}
            {user?.role === "ADMIN" && (
              <>
                <div className="px-4 py-2 mt-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    إدارة النظام
                  </h3>
                </div>
                {adminItems.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </>
            )}
          </nav>

          {/* Logout button */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors duration-200"
            >
              <span className="ml-3 text-lg">🚪</span>
              <span className="mr-2">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <span className="text-xl">☰</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {user?.name || "لوحة التحكم"}
            </h1>
            <div className="w-8"></div> {/* Spacer for balance */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
