import React from 'react';
import LogoSimple from './LogoSimple';

const Navbar = () => {
  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    navLinks: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
    },
    navLink: {
      color: '#333',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '1rem',
      transition: 'color 0.3s ease',
    },
    authButtons: {
      display: 'flex',
      gap: '1rem',
    },
    button: {
      padding: '0.6rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
    },
    loginBtn: {
      backgroundColor: 'transparent',
      color: '#22c55e',
      border: '2px solid #22c55e',
    },
    registerBtn: {
      backgroundColor: '#22c55e',
      color: 'white',
    },
  };

  return (
    <nav style={styles.navbar}>
      <LogoSimple type="horizontal" size="normal" />
      
      <ul style={styles.navLinks}>
        <li><a href="#home" style={styles.navLink}>الرئيسية</a></li>
        <li><a href="#mobiles" style={styles.navLink}>مقارنة الأسعار</a></li>
        <li><a href="#products-agency" style={styles.navLink}>وكالة المنتجات</a></li>
        <li><a href="#tech-news" style={styles.navLink}>أخبار التكنولوجيا</a></li>
        <li><a href="#economy-news" style={styles.navLink}>أخبار الاقتصاد</a></li>
        <li><a href="#ai" style={styles.navLink}>الذكاء الاصطناعي</a></li>
      </ul>
      
      <div style={styles.authButtons}>
        <button style={{...styles.button, ...styles.loginBtn}}>
          تسجيل الدخول
        </button>
        <button style={{...styles.button, ...styles.registerBtn}}>
          إنشاء حساب
        </button>
      </div>
    </nav>
  );
};

export default Navbar;