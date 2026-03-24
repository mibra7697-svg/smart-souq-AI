export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1e40af] to-[#7c3aed] py-12 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">مستندات المستثمر - SmartSouq</h1>
          <p className="text-xl">ملخص شامل عن منصة التسويق بالعمولة للسوق العربي</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Executive Summary */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">نظرة عامة</h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              SmartSouq هي منصة تسويق بالعمولة متكاملة مصممة خصيصاً للسوق العربي، 
              تهدف إلى ربط البائعين والمسوقين والمشترين في منظومة آمنة ومربحة للجميع.
            </p>
            <p>
              المنصة توفر نظام ضمان (Escrow) يحمي جميع الأطراف، مع تتبع في الوقت الحقيقي 
              للعمولات والمبيعات، ولوحة تحكم متكاملة لإدارة جميع جوانب العمل.
            </p>
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">أبرز مزايا الاستثمار</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">💰 نمو سريع</h3>
              <p className="text-gray-700">سوق التسويق بالعمولة ينمو بنسبة 10% سنوياً في العالم العربي</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">📈 إيرادات متعددة</h3>
              <p className="text-gray-700">عمولات من المبيعات، اشتراكات البائعين، وخدمات قيمة مضافة</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">🔒 تقنية آمنة</h3>
              <p className="text-gray-700">نظام دفعات مؤقتة (Escrow) يحمي الأموال حتى اكتمال الصفقات</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">🤖 ذكاء اصطناعي</h3>
              <p className="text-gray-700">تحليلات وتوصيات ذكية لزيادة المبيعات والعمولات</p>
            </div>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">فرصة السوق</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">500M+</div>
              <p className="text-gray-600">عدد السكان في العالم العربي</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-2">$100B+</div>
              <p className="text-gray-600">حجم سوق التجارة الإلكترونية</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-2">10%</div>
              <p className="text-gray-600">نمو سنوي في التسويق بالعمولة</p>
            </div>
          </div>
        </div>

        {/* Financial Projections */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">توقعات مالية (12 شهراً)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-gray-700">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-right">المؤشر</th>
                  <th className="px-4 py-3 text-right">المستهدف</th>
                  <th className="px-4 py-3 text-right">القيمة المتوقعة</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 font-semibold">البائعين النشطين</td>
                  <td className="px-4 py-3">500+</td>
                  <td className="px-4 py-3 text-green-600">$50,000/شهر</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-semibold">المستخدمين</td>
                  <td className="px-4 py-3">10,000+</td>
                  <td className="px-4 py-3 text-green-600">$75,000/شهر</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3 font-semibold">حجم المبيعات (GMV)</td>
                  <td className="px-4 py-3">$250,000</td>
                  <td className="px-4 py-3 text-green-600">$30,000/شهر عمولات</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">إجمالي الإيرادات</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3 text-blue-600 font-bold">$155,000/شهر</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Investment Ask */}
        <div className="bg-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">طلب الاستثمار</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">💼 حجم الاستثمار المطلوب</h3>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 mb-2">$50,000 - $75,000</div>
                <p className="text-gray-600">للتوسع والتسويق وتطوير الميزات</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-4">🎯 الاستخدام المتوقع</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>تطوير منصة الذكاء الاصطناعي</li>
                <li>حملات تسويقية مستهدفة</li>
                <li>توسيع الفريق التقني</li>
                <li>ضمان النمو المستمر</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="/auth/login"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              جرّب المنصة الآن
            </a>
            <a 
              href="mailto:mibra7697@gmail.com?subject=Investment%20Inquiry%20-%20SmartSouq&body=أرجو%20إرسال%20ملف%20PDF%20الاستثماري%20الكامل"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg 
                         font-semibold hover:bg-gray-900 transition-colors inline-block"
            >
              📥 طلب ملف PDF الكامل
            </a>
          </div>
          
          <p className="text-gray-600">
            للاستفسارات أو طلب ملف PDF مفصل، يرجى التواصل على: 
            <span className="font-semibold"> investors@smartsouq.com</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg">SmartSouq © 2026 — مستندات استثمارية سرية</p>
        </div>
      </footer>
    </div>
  );
}