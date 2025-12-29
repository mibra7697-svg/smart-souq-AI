import React from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaDollarSign, FaChartLine, FaRobot, FaRocket, FaStar } from 'react-icons/fa';
import LogoSimple from './LogoSimple';

const EnhancedHero = () => {
  const styles = {
    hero: {
      padding: "4rem 1rem",
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      position: "relative",
      overflow: "hidden",
      borderRadius: "0 0 30px 30px",
      marginBottom: "2rem",
    },
    particles: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
    },
    particle: {
      position: 'absolute',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
    },
    logoContainer: {
      marginBottom: "2rem",
      animation: "fadeIn 1s ease",
    },
    title: {
      fontSize: "3rem",
      marginBottom: "1rem",
      fontWeight: "800",
      textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
      background: "linear-gradient(135deg, #ffffff, #f1f5f9)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: "1.2rem",
      marginBottom: "2rem",
      opacity: "0.9",
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "1.6",
      textShadow: "1px 1px 5px rgba(0,0,0,0.1)",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "2rem",
      flexWrap: "wrap",
      marginTop: "3rem",
    },
    statItem: {
      textAlign: "center",
      padding: "1.5rem",
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      minWidth: "150px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    statIcon: {
      fontSize: "2rem",
      color: "white",
      marginBottom: "0.5rem",
    },
    statNumber: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    statLabel: {
      fontSize: "0.9rem",
      opacity: "0.8",
    },
    ctaButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "2rem",
    },
    primaryButton: {
      padding: "1rem 2rem",
      fontSize: "1rem",
      background: "linear-gradient(135deg, #22c55e, #16a34a)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)",
    },
    secondaryButton: {
      padding: "1rem 2rem",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      border: "2px solid white",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backdropFilter: "blur(10px)",
    },
    floatingElements: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      pointerEvents: "none",
    },
  };

  // إنشاء جزئيات عائمة
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      size: Math.random() * 10 + 5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
    });
  }

  return (
    <section id="home" style={styles.hero}>
      {/* جزئيات عائمة */}
      <div style={styles.floatingElements}>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            style={{
              ...styles.particle,
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: p.animationDelay,
            }}
          />
        ))}
      </div>

      <div style={styles.logoContainer}>
        <LogoSimple type="horizontal" size="xlarge" color="white" />
      </div>
      
      <h1 style={styles.title}>
        وسيطك الذكي نحو عالم التسوق الإلكتروني
      </h1>
      
      <p style={styles.subtitle}>
        اكتشف أفضل المنتجات العالمية، قارن الأسعار بذكاء، واربح عمولة من كل عملية بيع.
        منصة وساطة تجارية تعمل عبر برامج الشركاء التابعين.
      </p>
      
      <div style={styles.ctaButtons}>
        <motion.button 
          style={styles.primaryButton}
          onClick={() => document.getElementById('ecommerce').scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRocket /> ابدأ الربح الآن
        </motion.button>
        <motion.button 
          style={styles.secondaryButton}
          onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRobot /> استكشف المميزات
        </motion.button>
      </div>
      
      <div style={styles.stats}>
        <motion.div 
          style={styles.statItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FaShoppingCart style={styles.statIcon} />
          <div style={styles.statNumber}>+5,000</div>
          <div style={styles.statLabel}>منتج متوفر</div>
        </motion.div>
        
        <motion.div 
          style={styles.statItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaDollarSign style={styles.statIcon} />
          <div style={styles.statNumber}>5%</div>
          <div style={styles.statLabel}>متوسط العمولة</div>
        </motion.div>
        
        <motion.div 
          style={styles.statItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <FaChartLine style={styles.statIcon} />
          <div style={styles.statNumber}>24/7</div>
          <div style={styles.statLabel}>تحديث مستمر</div>
        </motion.div>
        
        <motion.div 
          style={styles.statItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <FaStar style={styles.statIcon} />
          <div style={styles.statNumber}>4.9/5</div>
          <div style={styles.statLabel}>تقييم المستخدمين</div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedHero;