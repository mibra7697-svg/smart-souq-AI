'use client';
import React from 'react';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export default function PublicPage() {
  return (
    <div dir="rtl" style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui', lineHeight: '1.8' }}>
      <button onClick={() => window.history.back()} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#27ae60', cursor: 'pointer', marginBottom: '20px' }}>
        <ChevronRight size={18} /> العودة للرئيسية
      </button>
      <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #27ae60', paddingBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ShieldCheck color="#27ae60" /> سياسة الإعلانات الرقمية
      </h1>
      <div style={{ marginTop: '30px', whiteSpace: 'pre-wrap', color: '#444', fontSize: '1.1rem' }}>
        نعرض إعلانات من منصات موثوقة مثل Bitmedia و CoinTraffic. \n- الدفع يتم بالعملات الرقمية (BTC, USDT). \n- الإعلانات تساعدنا في إبقاء الخدمة مجانية لك.
      </div>
    </div>
  );
}
