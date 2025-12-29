import React from 'react';
import Hero from '../components/Hero';
import DynamicFeatures from '../components/DynamicFeatures';
import EnhancedEcommercePlatform from '../components/EnhancedEcommercePlatform';
import MobileComparison from '../components/MobileComparison';
import TechNews from '../components/TechNews';
import EconomyNews from '../components/EconomyNews';
import AISection from '../components/AISection';
import EnhancedFooter from '../components/EnhancedFooter';

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