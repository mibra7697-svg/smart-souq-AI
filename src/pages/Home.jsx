import React from 'react';
// إضافة .jsx لضمان أن Vercel يجد الملفات المباشرة ولا يبحث عن مجلدات
import Hero from '../components/hero.jsx'; 
import DynamicFeatures from '../components/DynamicFeatures.jsx';
import EnhancedEcommercePlatform from '../components/EnhancedEcommercePlatform.jsx';
import MobileComparison from '../components/MobileComparison.jsx';
import TechNews from '../components/TechNews.jsx';
import EconomyNews from '../components/EconomyNews.jsx';
import AISection from '../components/AISection.jsx';
import EnhancedFooter from '../components/EnhancedFooter.jsx';

const Home = () => {
  const styles = {
    page: {
      minHeight: '100vh',
    },
    sectionSpacer: {
      height: '3rem',
    },
  };

  return (
    <div style={styles.page}>
      <Hero />
      <DynamicFeatures />
      <div style={styles.sectionSpacer} />
      <EnhancedEcommercePlatform />
      <div style={styles.sectionSpacer} />
      <MobileComparison />
      <div style={styles.sectionSpacer} />
      <TechNews />
      <div style={styles.sectionSpacer} />
      <EconomyNews />
      <div style={styles.sectionSpacer} />
      <AISection />
      <EnhancedFooter />
    </div>
  );
};

export default Home;