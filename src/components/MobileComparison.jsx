import React from 'react';
import { FaMobileAlt, FaStore, FaTag, FaStar } from 'react-icons/fa';

const MobileComparison = () => {
  const mobiles = [
    {
      name: 'آيفون 15 برو',
      image: '📱',
      prices: [
        { store: 'سوق كوم', price: '4,650 ريال' },
        { store: 'نون', price: '4,800 ريال' },
        { store: 'إكسترا', price: '4,550 ريال' },
      ],
      rating: 4.8,
      features: ['شريحة A17 برو', 'كاميرا 48 ميجابكسل', 'بطارية 3650 مللي أمبير']
    },
    {
      name: 'سامسونج S24 Ultra',
      image: '📱',
      prices: [
        { store: 'سوق كوم', price: '4,200 ريال' },
        { store: 'نون', price: '4,350 ريال' },
        { store: 'إكسترا', price: '4,150 ريال' },
      ],
      rating: 4.7,
      features: ['شريحة Snapdragon 8', 'كاميرا 200 ميجابكسل', 'قلم S-Pen']
    },
    {
      name: 'شاومي 13 برو',
      image: '📱',
      prices: [
        { store: 'سوق كوم', price: '2,300 ريال' },
        { store: 'نون', price: '2,450 ريال' },
        { store: 'إكسترا', price: '2,200 ريال' },
      ],
      rating: 4.5,
      features: ['شريحة Snapdragon 8', 'كاميرا 50 ميجابكسل', 'شحن 120 واط']
    }
  ];

  const styles = {
    section: {
      padding: '5rem 2rem',
      backgroundColor: '#f8fafc',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '3rem',
    },
    title: {
      fontSize: '2.5rem',
      color: '#1e293b',
      marginBottom: '1rem',
    },
    subtitle: {
      color: '#64748b',
      fontSize: '1.1rem',
      maxWidth: '600px',
      margin: '0 auto',
    },
    mobilesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
      marginTop: '3rem',
    },
    mobileCard: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
    },
    mobileHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    mobileIcon: {
      fontSize: '3rem',
    },
    mobileName: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1e293b',
    },
    priceSection: {
      marginBottom: '1.5rem',
    },
    priceTitle: {
      fontSize: '1rem',
      color: '#64748b',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    priceItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      marginBottom: '0.5rem',
    },
    storeName: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#475569',
    },
    price: {
      fontWeight: '600',
      color: '#22c55e',
    },
    bestPrice: {
      backgroundColor: '#f0fdf4',
      border: '2px solid #22c55e',
    },
    featuresList: {
      marginTop: '1.5rem',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      color: '#475569',
    },
    rating: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '1rem',
      color: '#f59e0b',
    },
  };

  const findBestPrice = (prices) => {
    return prices.reduce((min, price) => {
      const priceNum = parseInt(price.price.replace(/[^\d]/g, ''));
      const minNum = parseInt(min.price.replace(/[^\d]/g, ''));
      return priceNum < minNum ? price : min;
    });
  };

  return (
    <section id="mobiles" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>مقارنة أسعار الموبايلات</h2>
          <p style={styles.subtitle}>
            قارن أسعار أحدث الموبايلات بين مختلف المتاجر الإلكترونية ووفر حتى 30%
          </p>
        </div>

        <div style={styles.mobilesGrid}>
          {mobiles.map((mobile, index) => {
            const bestPrice = findBestPrice(mobile.prices);
            
            return (
              <div 
                key={index}
                style={styles.mobileCard}
                className="card-hover"
              >
                <div style={styles.mobileHeader}>
                  <div style={styles.mobileIcon}>{mobile.image}</div>
                  <div>
                    <h3 style={styles.mobileName}>{mobile.name}</h3>
                    <div style={styles.rating}>
                      <FaStar />
                      <span>{mobile.rating}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.priceSection}>
                  <h4 style={styles.priceTitle}>
                    <FaTag /> الأسعار بين المتاجر
                  </h4>
                  {mobile.prices.map((price, idx) => (
                    <div 
                      key={idx}
                      style={{
                        ...styles.priceItem,
                        ...(price.store === bestPrice.store ? styles.bestPrice : {})
                      }}
                    >
                      <div style={styles.storeName}>
                        <FaStore />
                        {price.store}
                      </div>
                      <div style={styles.price}>{price.price}</div>
                    </div>
                  ))}
                </div>

                <div style={styles.featuresList}>
                  <h4 style={styles.priceTitle}>
                    <FaMobileAlt /> المميزات الرئيسية
                  </h4>
                  {mobile.features.map((feature, idx) => (
                    <div key={idx} style={styles.featureItem}>
                      <span style={{ color: '#22c55e' }}>✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MobileComparison;