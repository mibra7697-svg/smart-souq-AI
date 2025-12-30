import React from 'react';
import { FaMobileAlt, FaChartLine, FaRobot, FaShieldAlt, FaBolt, FaSyncAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaMobileAlt />,
      title: 'مقارنة ذكية',
      description: 'قارن أسعار الموبايلات من جميع المتاجر في مكان واحد'
    },
    {
      icon: <FaChartLine />,
      title: 'متابعة الأسهم',
      description: 'تابع أسعار الأسهم والبيتكوين لحظة بلحظة'
    },
    {
      icon: <FaRobot />,
      title: 'ذكاء صناعي',
      description: 'تحليل وتوقعات ذكية بناءً على البيانات'
    },
    {
      icon: <FaShieldAlt />,
      title: 'آمن وسري',
      description: 'بياناتك محمية بأحدث تقنيات التشفير'
    },
    {
      icon: <FaBolt />,
      title: 'سريع وفعال',
      description: 'واجهة سريعة وتحديثات فورية'
    },
    {
      icon: <FaSyncAlt />,
      title: 'تحديثات مستمرة',
      description: 'نقوم بتحديث البيانات كل دقيقة'
    }
  ];

  const styles = {
    section: {
      padding: '5rem 2rem',
      backgroundColor: '#f8fafc',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#1e293b',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto 3rem',
      lineHeight: '1.6',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      textAlign: 'center',
    },
    icon: {
      fontSize: '3rem',
      color: '#22c55e',
      marginBottom: '1rem',
    },
    featureTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      color: '#1e293b',
    },
    featureDescription: {
      color: '#64748b',
      lineHeight: '1.6',
    },
  };

  return (
    <section id="features" style={styles.section}>
      <h2 style={styles.title}>مميزات سمارت سوق</h2>
      <p style={styles.subtitle}>
        منصة متكاملة تجمع لك كل ما تحتاجه في عالم التكنولوجيا والاستثمار
      </p>
      
      <div style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            style={styles.featureCard}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
          >
            <div style={styles.icon}>{feature.icon}</div>
            <h3 style={styles.featureTitle}>{feature.title}</h3>
            <p style={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;