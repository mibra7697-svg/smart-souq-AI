import Link from "next/link";
import DemoButton from "@/components/DemoButton";

export default function Home() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e40af] to-[#7c3aed] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            SmartSouq — منصة التسويق بالعمولة للسوق العربي
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            ربط البائعين والمسوقين والمشترين في منظومة متكاملة وآمنة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <DemoButton />
            <a 
              href="#investment-section"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#1e40af] transition-colors"
            >
              اقرأ عن الاستثمار
            </a>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="investment-section" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">أهدافنا خلال 12 شهراً</h2>
          <div className="grid md:grid-cols-3 gap-8 max-sm:flex max-sm:flex-col max-sm:space-y-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg max-sm:w-full max-sm:mx-auto">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">بائع مستهدف</h3>
              <p className="text-gray-600">نهدف لجذب أكثر من 500 بائع نشط</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg max-sm:w-full max-sm:mx-auto">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">مستخدم مستهدف</h3>
              <p className="text-gray-600">مجتمع يتجاوز 10,000 مستخدم نشط</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg max-sm:w-full max-sm:mx-auto">
              <div className="text-4xl font-bold text-green-600 mb-2">250,000$</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">GMV شهري مستهدف</h3>
              <p className="text-gray-600">حجم مبيعات يتجاوز 250,000 دولار شهرياً</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">كيف يعمل النظام؟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">1. سجّل كبائع وأضف منتجاتك</h3>
              <p className="text-gray-600">أنشئ متجرك الخاص وأضف منتجاتك مع تحديد عمولات المسوقين</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">2. انضم كمسوق واربح عمولات تصل 20%</h3>
              <p className="text-gray-600">اربط منتجات البائعين واربح عمولات على كل عملية بيع ناجحة</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">3. اشترِ بأمان عبر نظام الضمان</h3>
              <p className="text-gray-600">تسوق بأمان مع نظام Escrow الذي يضمن حماية أموالك حتى استلام المنتج</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">المميزات التقنية</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 text-3xl flex items-center justify-center mx-auto mb-6">🔒</div>
              <h3 className="text-lg font-semibold mb-4">نظام ضمان Escrow آمن</h3>
              <p className="text-gray-600 text-sm">حماية الأموال حتى اكتمال الصفقات بنجاح</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 text-3xl flex items-center justify-center mx-auto mb-6">💰</div>
              <h3 className="text-lg font-semibold mb-4">تتبع العمولات في الوقت الفعلي</h3>
              <p className="text-gray-600 text-sm">مراقبة الأرباح والإحصائيات لحظة بلحظة</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 text-3xl flex items-center justify-center mx-auto mb-6">📊</div>
              <h3 className="text-lg font-semibold mb-4">لوحة تحكم متكاملة</h3>
              <p className="text-gray-600 text-sm">إدارة كاملة للمنتجات والطلبات والمبيعات</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 text-3xl flex items-center justify-center mx-auto mb-6">🤖</div>
              <h3 className="text-lg font-semibold mb-4">مساعد ذكاء اصطناعي (قريباً)</h3>
              <p className="text-gray-600 text-sm">تحليلات ذكية وتوصيات مخصصة للمستخدمين</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">جرّب المنصة الآن</h2>
          <p className="text-xl mb-8">استخدم بيانات الدخول التالية لتجربة النظام من مختلف الزوايا</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 mt-8 mx-auto max-w-4xl">
            <div className="overflow-x-auto">
              <table className="w-full text-white" role="table" aria-label="بيانات الدخول التجريبية للمنصة">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="px-3 py-2 md:px-4 md:py-3 text-center w-1/4 sm:w-1/5" scope="col" role="columnheader">الدور</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-center w-2/4 sm:w-2/5" scope="col" role="columnheader">البريد الإلكتروني</th>
                    <th className="px-3 py-2 md:px-4 md:py-3 text-center w-1/4 sm:w-2/5" scope="col" role="columnheader">كلمة المرور</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 hover:bg-white/10 transition-all duration-150 cursor-pointer" role="row">
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center align-middle" role="cell">مدير النظام</td>
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center font-mono text-sm md:text-base" role="cell">admin@smartsouq.com</td>
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center font-mono text-sm md:text-base" role="cell">admin123</td>
                  </tr>
                  <tr className="border-b border-white/10 hover:bg-white/10 transition-all duration-150 cursor-pointer" role="row">
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center align-middle" role="cell">بائع</td>
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center font-mono text-sm md:text-base" role="cell">techstore@smartsouq.com</td>
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center font-mono text-sm md:text-base" role="cell">seller123</td>
                  </tr>
                  <tr className="hover:bg-white/10 transition-all duration-150 cursor-pointer" role="row">
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center align-middle" role="cell">مسوق</td>
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center font-mono text-sm md:text-base" role="cell">marketer1@smartsouq.com</td>
                    <td className="px-3 py-2 md:px-4 md:py-3 text-center font-mono text-sm md:text-base" role="cell">affiliate123</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <Link 
                href="/auth/login"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                الدخول إلى المنصة
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-lg">SmartSouq © 2026 — جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}