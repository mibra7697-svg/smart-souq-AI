import React from 'react';

// استيراد المكونات مع إضافة .jsx لضمان التعرف عليها في بيئة لينكس (Vercel)
// وتطابق حالة الأحرف مع ما هو موجود في مجلد components الخاص بك
import Hero from '../components/Hero.jsx';
import DynamicFeatures from '../components/DynamicFeatures.jsx';
import EcommercePlatform from '../components/EcommercePlatform.jsx';
import MobileComparison from '../components/MobileComparison.jsx';
import TechNews from '../components/TechNews.jsx';
import EconomyNews from '../components/EconomyNews.jsx';
import AISection from '../components/AISection.jsx';
import EnhancedFooter from '../components/EnhancedFooter.jsx';

const Home = () => {
  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#ffffff', // يمكنك تعديل اللون حسب هوية سمارت سوق
    },
    sectionSpacer: {
      height: '4rem',
    },
  };

  return (
    <div style={styles.page}>
      {/* القسم الرئيسي */}
      <Hero />

      {/* قسم المميزات الديناميكية */}
      <DynamicFeatures />

      <div style={styles.sectionSpacer} />

      {/* منصة التجارة الإلكترونية المعززة */}
      <EcommercePlatform />

      <div style={styles.sectionSpacer} />

      {/* مقارنة الجوالات الذكية */}
      <MobileComparison />

      <div style={styles.sectionSpacer} />

      {/* قسم أخبار التكنولوجيا والذكاء الاصطناعي */}
      <TechNews />
      
      <div style={styles.sectionSpacer} />
      
      <EconomyNews />

      <div style={styles.sectionSpacer} />

      {/* قسم الـ AI المتطور */}
      <AISection />

      {/* تذييل الصفحة المعزز */}
      <EnhancedFooter />
    </div>
  );
};

export default Home;