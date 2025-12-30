import React from 'react';

// جميع الاستيرادات مطابقة 100% لأسماء الملفات الحقيقية (بدون .jsx ضروري في Vite)
import EnhancedHero from '../components/EnhancedHero';
import DynamicFeatures from '../components/DynamicFeatures';
import EnhancedEcommercePlatform from '../components/EnhancedEcommercePlatform'; // ← الأفضل استخدام النسخة المعززة
import MobileComparison from '../components/MobileComparison';
import TechNews from '../components/TechNews';
import EconomyNews from '../components/EconomyNews';
import AISection from '../components/AISection';
import EnhancedFooter from '../components/EnhancedFooter';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <EnhancedHero />

        <DynamicFeatures />

        <div className="h-16 md:h-20" />

        <EnhancedEcommercePlatform />

        <div className="h-16 md:h-20" />

        <MobileComparison />

        <div className="h-16 md:h-20" />

        <TechNews />

        <div className="h-16 md:h-20" />

        <EconomyNews />

        <div className="h-16 md:h-20" />

        <AISection />
      </main>

      <EnhancedFooter />
    </div>
  );
};

export default Home;