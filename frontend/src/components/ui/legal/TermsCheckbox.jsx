import React, { useState } from 'react';

export default function TermsCheckbox({ onAccept, required = true }) {
  const [accepted, setAccepted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAccept = (checked) => {
    setAccepted(checked);
    if (onAccept) {
      onAccept(checked);
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-start space-x-3 space-x-reverse">
        <input
          type="checkbox"
          id="terms"
          checked={accepted}
          onChange={(e) => handleAccept(e.target.checked)}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          required={required}
        />
        <div className="flex-1">
          <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
            أوافق على 
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 underline mx-1"
            >
              الشروط والأحكام
            </button>
            و 
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 underline mx-1"
            >
              سياسة الخصوصية
            </button>
            لـ Smart Souq
          </label>
          
          {required && !accepted && (
            <p className="text-red-500 text-xs mt-1">
              ⚠️ يجب الموافقة على الشروط والأحكام للمتابعة
            </p>
          )}

          {showDetails && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded text-xs text-gray-600">
              <h4 className="font-semibold mb-2">نقاط رئيسية:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>نحن وسيط تجاري بينك والمتاجر العالمية</li>
                <li>جميع المعاملات مؤمنة عبر نظام Escrow</li>
                <li>البيانات الشخصية محمية ومشفرة</li>
                <li>الشحن والتوصيل مسؤولية المتجر الأصلي</li>
                <li>يمكن استرجاع الأموال ضمن شروط محددة</li>
              </ul>
              <div className="mt-2 flex space-x-2 space-x-reverse">
                <a 
                  href="/legal/terms" 
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  الشروط الكاملة
                </a>
                <span>|</span>
                <a 
                  href="/legal/privacy" 
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  سياسة الخصوصية
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* إشعار قانوني إضافي */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          بالضغط على &quot;موافق&quot;، تقر بأنك قرأت وفهمت الشروط والأحكام وتوافق على معالجة بياناتك وفقاً للوائح GDPR وسياسة الخصوصية الخاصة بنا.
        </p>
      </div>
    </div>
  );
}
