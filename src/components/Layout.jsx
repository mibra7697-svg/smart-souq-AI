import React, { useState } from 'react';
import { 
  FaHome, 
  FaShoppingBag, 
  FaMobileAlt, 
  FaNewspaper, 
  FaChartLine,
  FaBrain,
  FaCog,
  FaBell,
  FaSearch,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import LogoSimple from './LogoSimple';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: <FaHome />, label: 'الرئيسية', color: '#3b82f6' },
    { id: 'ecommerce', icon: <FaShoppingBag />, label: 'الوساطة التجارية', color: '#10b981' },
    { id: 'mobiles', icon: <FaMobileAlt />, label: 'مقارنة الأسعار', color: '#8b5cf6' },
    { id: 'tech-news', icon: <FaNewspaper />, label: 'أخبار التكنولوجيا', color: '#f59e0b' },
    { id: 'economy-news', icon: <FaChartLine />, label: 'أخبار الاقتصاد', color: '#ef4444' },
    { id: 'ai', icon: <FaBrain />, label: 'الذكاء الاصطناعي', color: '#ec4899' },
  ];

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
    },
    sidebar: {
      width: sidebarOpen ? '220px' : '60px',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #e2e8f0',
    },
    mainContent: {
      flex: 1,
      padding: '1rem',
      overflowY: 'auto',
    },
    logoContainer: {
      padding: sidebarOpen ? '1.5rem 1rem' : '1rem 0.5rem',
      textAlign: 'center',
      borderBottom: '1px solid #f1f5f9',
    },
    navItems: {
      flex: 1,
      padding: '1rem 0',
    },
    navItem: (isActive, color) => ({
      display: 'flex',
      alignItems: 'center',
      padding: '0.75rem 1rem',
      margin: '0.25rem 0.5rem',
      borderRadius: '8px',
      backgroundColor: isActive ? `${color}15` : 'transparent',
      color: isActive ? color : '#64748b',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      borderRight: isActive ? `3px solid ${color}` : '3px solid transparent',
    }),
    navIcon: {
      fontSize: '1.1rem',
      minWidth: '24px',
    },
    navLabel: {
      fontSize: '0.85rem',
      fontWeight: '500',
      marginRight: sidebarOpen ? '0.75rem' : '0',
      opacity: sidebarOpen ? 1 : 0,
      transition: 'opacity 0.3s ease',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    toggleButton: {
      position: 'absolute',
      top: '1rem',
      right: sidebarOpen ? 'calc(220px - 1.5rem)' : 'calc(60px - 1.5rem)',
      width: '30px',
      height: '30px',
      borderRadius: '6px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      zIndex: 100,
    },
    userSection: {
      padding: '1rem',
      borderTop: '1px solid #f1f5f9',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 'bold',
    },
    userInfo: {
      opacity: sidebarOpen ? 1 : 0,
      transition: 'opacity 0.3s ease',
      overflow: 'hidden',
    },
    userName: {
      fontSize: '0.85rem',
      fontWeight: '600',
      color: '#1e293b',
    },
    userRole: {
      fontSize: '0.7rem',
      color: '#64748b',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem 1.5rem',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      borderRadius: '12px',
      marginBottom: '1.5rem',
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#f8fafc',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      width: '300px',
    },
    searchInput: {
      border: 'none',
      backgroundColor: 'transparent',
      width: '100%',
      fontSize: '0.9rem',
      color: '#475569',
      outline: 'none',
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    actionButton: {
      background: 'none',
      border: 'none',
      color: '#64748b',
      fontSize: '1.1rem',
      cursor: 'pointer',
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      width: '8px',
      height: '8px',
      backgroundColor: '#ef4444',
      borderRadius: '50%',
    },
  };

  return (
    <div style={styles.layout}>
      {/* زر تبديل الشريط الجانبي */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={styles.toggleButton}
        title={sidebarOpen ? 'تصغير الشريط الجانبي' : 'تكبير الشريط الجانبي'}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* الشريط الجانبي */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <LogoSimple 
            type={sidebarOpen ? 'horizontal' : 'icon'} 
            size="normal" 
            color="gradient" 
          />
        </div>

        <nav style={styles.navItems}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              style={styles.navItem(activeSection === item.id, item.color)}
              onClick={() => setActiveSection(item.id)}
              title={!sidebarOpen ? item.label : ''}
            >
              <div style={styles.navIcon}>{item.icon}</div>
              <div style={styles.navLabel}>{item.label}</div>
            </a>
          ))}
        </nav>

        <div style={styles.userSection}>
          <div style={styles.avatar}>م</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>محمد العتيبي</div>
            <div style={styles.userRole}>وسيط تجاري</div>
          </div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main style={styles.mainContent}>
        {/* شريط البحث والإشعارات */}
        <div style={styles.topBar}>
          <div style={styles.searchBox}>
            <FaSearch style={{ color: '#94a3b8', fontSize: '0.9rem' }} />
            <input 
              type="text" 
              placeholder="ابحث عن منتج، خبر، أو تحليل..." 
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.actions}>
            <button style={styles.actionButton}>
              <FaBell />
              <span style={styles.notificationBadge}></span>
            </button>
            <button style={styles.actionButton}>
              <FaCog />
            </button>
          </div>
        </div>

        {/* محتوى الصفحات */}
        {children}
      </main>
    </div>
  );
};

export default Layout;