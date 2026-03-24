'use client';
import { useState } from 'react';
import { MessageSquare, Send, Award } from 'lucide-react';

export default function ChallengeModal({ product, onClose }: { product: { name: string; [key: string]: any }; onClose: () => void }) {
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = async () => {
    // محاكاة تقييم الذكاء الاصطناعي حالياً
    const success = prompt.length > 20 && (prompt.includes('ضمان') || prompt.includes('جودة'));
    setFeedback(success ? ' أحسنت! أسلوبك مقنع ومهني.' : ' العميل لا يزال متردداً، حاول التركيز على القيمة والضمان.');
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '500px', textAlign: 'right', direction: 'rtl' }}>
        <h2> تحدي الإقناع: {product.name}</h2>
        <p>العميل يقول: &quot;السعر مرتفع جداً، لماذا يجب أن أشتري منك؟&quot;</p>
        
        <textarea 
          placeholder="اكتب رسالتك الاحترافية هنا لإقناع العميل..."
          style={{ width: '100%', height: '120px', marginTop: '10px', padding: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <button onClick={handleSubmit} style={{ width: '100%', padding: '15px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', marginTop: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
          إرسال الـ Prompt للتقييم
        </button>
        
        {feedback && (
          <div style={{ marginTop: '20px', padding: '15px', borderRadius: '10px', background: feedback.includes('') ? '#e9f7ef' : '#fef9e7' }}>
            {feedback}
          </div>
        )}
        
        <button onClick={onClose} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#7f8c8d', cursor: 'pointer' }}>إغلاق التحدي</button>
      </div>
    </div>
  );
}
