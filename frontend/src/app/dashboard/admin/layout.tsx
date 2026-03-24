"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const menu = [
    { name: "نظرة عامة", href: "/dashboard/admin" },
    { name: "المستخدمون", href: "/dashboard/admin/users" },
    { name: "الطلبات", href: "/dashboard/admin/orders" },
    { name: "العمولات", href: "/dashboard/admin/commissions" },
    { name: "السحوبات", href: "/dashboard/admin/payouts" },
    { name: "الملخص التقني", href: "/dashboard/admin/technical-overview" },

  ];

  return (
    <div className="flex min-h-screen bg-gray-100" dir="rtl">
      
      {/* Sidebar */}
      <aside className={`bg-white shadow-md transition-all ${open ? "w-64" : "w-20"} p-4`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">{open ? "لوحة إدارة SmartSouq" : "SS"}</h1>
          <button onClick={() => setOpen(!open)} className="text-gray-600">
            {open ? "⟨" : "⟩"}
          </button>
        </div>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium 
                ${pathname === item.href ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-10">
          <button 
            onClick={handleLogout}
            className="w-full border border-red-500 text-red-500 py-2 
                       rounded-md hover:bg-red-50 transition-colors"
          >
            🚪 تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
