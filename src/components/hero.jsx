import React from 'react';
import LogoSimple from './LogoSimple';
import { FaShoppingCart, FaDollarSign, FaChartLine, FaRobot } from 'react-icons/fa';

const Hero = () => {
  const styles = {
    hero: {
      padding: "2rem 1rem 3rem",
      textAlign: "center",
      background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
      borderRadius: "16px",
      marginBottom: "2rem",
      position: "relative",
      overflow: "hidden",
      border: "1px solid #e2e8f0",
    },
    logoContainer: {
      marginBottom: "1.5rem",
      display: "flex",
      justifyContent: "center",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "1rem",
      fontWeight: "800",
      color: "#1e293b",
      lineHeight: "1.3",
    },
    subtitle: {
      fontSize: "1rem",
      marginBottom: "2rem",
      color: "#64748b",
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "1.6",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      flexWrap: "wrap",
      marginTop: "2rem",
    },
    statItem: {
      textAlign: "center",
      padding: "1rem",
      backgroundColor: "white",
      borderRadius: "12px",
      minWidth: "120px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.5rem",
    },
    statIcon: {
      fontSize: "1.5rem",
      color: "#3b82f6",
    },
    statNumber: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#3b82f6",
    },
    statLabel: {
      fontSize: "0.8rem",
      color: "#64748b",
    },
    ctaButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "2rem",
    },
    primaryButton: {
      padding: "0.75rem 1.5rem",
      fontSize: "0.95rem",
      backgroundColor: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    secondaryButton: {
      padding: "0.75rem 1.5rem",
      fontSize: "0.95rem",
      backgroundColor: "white",
      color: "#3b82f6",
      border: "1px solid #3b82f6",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
  };

  return (
    <section id="home" style={styles.hero}>
      <div style={styles.logoContainer}>
        <LogoSimple type="horizontal" size="large" color="gradient" />
      </div>
      
      <h1 style={styles.title}>
        وسيطك الذكي للتجارة الإلكترونية
      </h1>
      
      <p style={styles.subtitle}>
        منصة وساطة تجارية تربطك بأفضل المنتجات العالمية. اختر، شارك، واربح عمولة من كل عملية بيع!
      </p>
      
      <div style={styles.ctaButtons}>
        <button 
          style={styles.primaryButton}
          onClick={() => document.getElementById('ecommerce').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaShoppingCart /> ابدأ الربح الآن
        </button>
        <button 
          style={styles.secondaryButton}
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
        >
          <FaRobot /> استعرض المميزات
        </button>
      </div>
      
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <FaShoppingCart style={styles.statIcon} />
          <div style={styles.statNumber}>+5,000</div>
          <div style={styles.statLabel}>منتج متوفر</div>
        </div>
        <div style={styles.statItem}>
          <FaDollarSign style={styles.statIcon} />
          <div style={styles.statNumber}>5%</div>
          <div style={styles.statLabel}>متوسط العمولة</div>
        </div>
        <div style={styles.statItem}>
          <FaChartLine style={styles.statIcon} />
          <div style={styles.statNumber}>24/7</div>
          <div style={styles.statLabel}>تحديث مستمر</div>
        </div>
        <div style={styles.statItem}>
          <FaRobot style={styles.statIcon} />
          <div style={styles.statNumber}>95%</div>
          <div style={styles.statLabel}>دقة التوصيات</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;