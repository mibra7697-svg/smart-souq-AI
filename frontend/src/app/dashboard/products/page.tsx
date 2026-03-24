"use client";

import { useEffect, useState } from "react";
import { productsService } from "@/services/products.service";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productsService.getProducts();
        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6 text-center">جاري تحميل المنتجات...</div>;
  if (error) return <div className="p-6 text-center text-red-500">خطأ: {error}</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">المنتجات المتاحة</h1>
        <Link 
          href="/dashboard"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          العودة للوحة التحكم
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description || "لا يوجد وصف متوفر"}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-2xl font-bold text-green-600">
                  ${Number(product.price).toFixed(2)}
                </span>
                <button
                  onClick={async () => {
                    try {
                      const res = await productsService.generateAffiliateLink(product.id);
                      alert(`رابط الأفلييت الخاص بك: ${res.link.code}`);
                    } catch (err) {
                      alert("فشل في إنشاء الرابط");
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  إنشاء رابط تسويق
                </button>
              </div>
            </div>
          </div>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">لا توجد منتجات متاحة حالياً.</p>
          </div>
        )}
      </div>
    </div>
  );
}
