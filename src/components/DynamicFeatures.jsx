import React from 'react';
import { 
  FaMobileAlt, 
  FaChartLine, 
  FaRobot, 
  FaShieldAlt, 
  FaBolt, 
  FaSyncAlt,
  FaNewspaper,
  FaUserTie,
  FaLightbulb,
  FaDatabase
} from 'react-icons/fa';

const DynamicFeatures = () => {
  const features = [
    {
      icon: <FaMobileAlt />,
      title: 'مقارنة ذكية',
      description: 'قارن أسعار الموبايلات والمنتجات لحظياً'
    },
    {
      icon: <FaRobot />,
      title: 'ذكاء اصطناعي',
      description: 'تحليل وتوقعات باستخدام أحدث خوارزميات الذكاء الاصطناعي'
    },
    {
      icon: <FaChartLine />,
      title: 'تحليلات الأسهم',
      description: 'متابعة وتحليل أسعار الأسهم والعملات الرقمية'
    },
    {
      icon: <FaUserTie />,
      title: 'نظام الوكالة',
      description: 'كن وكيلاً واربح عمولات مجزية من المبيعات'
    },
    {
      icon: <FaNewspaper />,
      title: 'أخبار متجددة',
      description: 'أحدث أخبار التكنولوجيا والاقتصاد من مصادر موثوقة'
    },
    {
      icon: <FaShieldAlt />,
      title: 'بيانات آمنة',
      description: 'حماية كاملة لبياناتك باستخدام أحدث تقنيات التشفير'
    },
    {
      icon: <FaBolt />,
      title: 'سرعة فائقة',
      description: 'واجهة سريعة وتجربة مستخدم ممتازة'
    },
    {
      icon: <FaSyncAlt />,
      title: 'تحديث مستمر',
      description: 'تحديث البيانات والمحتوى بشكل مستمر'
    },
    {
      icon: <FaLightbulb />,
      title: 'توصيات ذكية',
      description: 'توصيات مخصصة بناءً على اهتماماتك'
    },
    {
      icon: <FaDatabase />,
      title: 'قاعدة بيانات',
      description: 'قاعدة بيانات شاملة لألاف المنتجات والأخبار'
    }
  ];

  const styles = {
    section: {
      padding: '2rem 1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      marginBottom: '2rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.5rem',
      color: '#1e293b',
      marginBottom: '0.5rem',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: '0.95rem',
      color: '#64748b',
      maxWidth: '500px',
      margin: '0 auto',
      lineHeight: '1.5',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
    },
    featureCard: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      transition: 'all 0.3s ease',
    },
    iconContainer: {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      backgroundColor: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#3b82f6',
      fontSize: '0.9rem',
    },
    featureContent: {
      flex: 1,
    },
    featureTitle: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.25rem',
    },
    featureDescription: {
      fontSize: '0.8rem',
      color: '#64748b',
      lineHeight: '1.4',
    },
  };

  return (
    <section id="features" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>مميزات منصتنا</h2>
          <p style={styles.subtitle}>
            منصة متكاملة تقدم كل ما تحتاجه في عالم التكنولوجيا والتجارة الإلكترونية
          </p>
        </div>
        
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index}
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            >
              <div style={styles.iconContainer}>
                {feature.icon}
              </div>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicFeatures;