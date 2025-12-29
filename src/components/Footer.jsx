import React from 'react';
import { FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import LogoSimple from './LogoSimple';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#1e293b',
      color: 'white',
      padding: '3rem 1rem 2rem',
      marginTop: '2rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
    },
    section: {
      marginBottom: '1.5rem',
    },
    title: {
      fontSize: '1.2rem',
      marginBottom: '1rem',
      color: '#22c55e',
      fontWeight: '600',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    link: {
      color: '#cbd5e1',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.3s ease',
    },
    contactInfo: {
      color: '#cbd5e1',
      fontSize: '0.9rem',
      lineHeight: '1.6',
    },
    address: {
      backgroundColor: '#2d3748',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem',
    },
    addressTitle: {
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#22c55e',
    },
    addressText: {
      fontSize: '0.85rem',
      color: '#94a3b8',
      lineHeight: '1.5',
    },
    bottomBar: {
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #334155',
      textAlign: 'center',
      color: '#94a3b8',
      fontSize: '0.85rem',
    },
    currencyNote: {
      backgroundColor: '#374151',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      marginTop: '0.5rem',
      fontSize: '0.8rem',
    },
  };

  const quickLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'منصة الوساطة', href: '#ecommerce' },
    { name: 'مقارنة الأسعار', href: '#mobiles' },
    { name: 'أخبار التكنولوجيا', href: '#tech-news' },
    { name: 'أخبار الاقتصاد', href: '#economy-news' },
    { name: 'الذكاء الاصطناعي', href: '#ai' },
  ];

  const legalLinks = [
    { name: 'سياسة العمولة', href: '#' },
    { name: 'شروط الاستخدام', href: '#' },
    { name: 'سياسة الخصوصية', href: '#' },
    { name: 'سياسة الإرجاع', href: '#' },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* عن الشركة */}
        <div style={styles.section}>
          <div style={{ marginBottom: '1rem' }}>
            <LogoSimple type="horizontal" size="normal" color="gradient" />
          </div>
          <p style={styles.contactInfo}>
            منصة وساطة تجارية ذكية تربط بين العملاء ومنصات التجارة الإلكترونية العالمية
          </p>
          <div style={styles.currencyNote}>
            💵 جميع الأسعار بالدولار الأمريكي (USD)
          </div>
        </div>

        {/* روابط سريعة */}
        <div style={styles.section}>
          <h3 style={styles.title}>روابط سريعة</h3>
          <ul style={styles.list}>
            {quickLinks.map((link, index) => (
              <li key={index} style={styles.listItem}>
                <a href={link.href} style={styles.link}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* معلومات الاتصال */}
        <div style={styles.section}>
          <h3 style={styles.title}>اتصل بنا</h3>
          <div style={styles.contactInfo}>
            <div style={styles.listItem}>
              <FaEnvelope />
              <a href="mailto:info@smartsouq-ai.com" style={styles.link}>
                info@smartsouq-ai.com
              </a>
            </div>
            <div style={styles.listItem}>
              <FaGlobe />
              <a href="https://www.smartsouq-ai.com" style={styles.link}>
                www.smartsouq-ai.com
              </a>
            </div>
          </div>
          
          <div style={styles.address}>
            <div style={styles.addressTitle}>
              <FaMapMarkerAlt style={{ marginLeft: '0.25rem' }} /> العنوان الجغرافي:
            </div>
            <div style={styles.addressText}>
              الإمارات العربية المتحدة<br />
              أبو ظبي - آل نهيان<br />
              المنطقة الشرقية 25<br />
              مركز الأعمال الذكي
            </div>
          </div>
        </div>

        {/* روابط قانونية */}
        <div style={styles.section}>
          <h3 style={styles.title}>روابط قانونية</h3>
          <ul style={styles.list}>
            {legalLinks.map((link, index) => (
              <li key={index} style={styles.listItem}>
                <a href={link.href} style={styles.link}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p>
          © {new Date().getFullYear()} <strong>سمارت سوق AI | Smart Souq AI</strong>. جميع الحقوق محفوظة.
          <span style={{ marginRight: '1rem', marginLeft: '1rem' }}>|</span>
          منصة وساطة تجارية مرخصة في الإمارات العربية المتحدة
        </p>
      </div>
    </footer>
  );
};

export default Footer;