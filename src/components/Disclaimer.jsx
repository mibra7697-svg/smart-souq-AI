import React from 'react';

const Disclaimer = () => {
  const styles = {
    disclaimer: {
      backgroundColor: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '12px',
      padding: '1rem',
      margin: '1.5rem 0',
      fontSize: '0.85rem',
      color: '#92400e',
      boxShadow: '0 2px 10px rgba(245, 158, 11, 0.1)',
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      fontSize: '0.9rem',
    },
    content: {
      lineHeight: '1.5',
    },
    important: {
      fontWeight: 'bold',
      marginTop: '0.5rem',
    },
    link: {
      color: '#1e40af',
      textDecoration: 'underline',
      fontWeight: '500',
    }
  };

  return (
    <div style={styles.disclaimer}>
      <div style={styles.title}>
        <span>⚠️</span> إخلاء مسؤولية مهم
      </div>
      <div style={styles.content}>
        <p>
          <strong>سمارت سوق AI</strong> هي منصة وساطة تجارية تربط بين المستخدمين ومنصات التجارة الإلكترونية العالمية. 
          نحن <strong>لسنا شركاء رسميين</strong> لهذه المنصات، ولا نملك أو نتحكم في المنتجات المعروضة.
        </p>
        <p style={styles.important}>
          ⚖️ ملاحظات مهمة:
        </p>
        <ul style={{ paddingRight: '1.5rem', marginTop: '0.5rem' }}>
          <li>جميع المعاملات تتم مباشرة عبر المنصات الأصلية</li>
          <li>الأسعار والعروض قابلة للتغيير بدون إشعار</li>
          <li>نحن مسؤولون فقط عن عرض المنتجات وليس عن جودتها أو توصيلها</li>
          <li>العمولة تدفع من قبل المتاجر وفقاً لسياساتها الخاصة</li>
        </ul>
        <p style={{ marginTop: '0.75rem' }}>
          للمزيد من التفاصيل، يرجى قراءة 
          <a href="/terms" style={styles.link}> شروط الاستخدام </a>
          و <a href="/privacy" style={styles.link}>سياسة الخصوصية</a>
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;