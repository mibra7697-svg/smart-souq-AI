import React, { useState, useEffect } from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaSyncAlt, FaBitcoin, FaDollarSign, FaGem } from 'react-icons/fa';

const StockTracker = () => {
  const [stocks, setStocks] = useState([
    { symbol: 'AAPL', name: 'أبل', price: 189.25, change: 2.34, changePercent: 1.25, volume: '45.2M' },
    { symbol: 'TSLA', name: 'تسلا', price: 240.50, change: -5.75, changePercent: -2.34, volume: '102.5M' },
    { symbol: 'MSFT', name: 'مايكروسوفت', price: 374.51, change: 3.21, changePercent: 0.86, volume: '28.7M' },
    { symbol: 'GOOGL', name: 'جوجل', price: 136.22, change: 1.45, changePercent: 1.08, volume: '32.1M' },
    { symbol: 'AMZN', name: 'أمازون', price: 145.80, change: -0.75, changePercent: -0.51, volume: '48.9M' },
    { symbol: 'META', name: 'ميتا', price: 324.90, change: 4.20, changePercent: 1.31, volume: '18.3M' },
  ]);

  const [crypto, setCrypto] = useState([
    { symbol: 'BTC', name: 'بتكوين', price: 42950.75, change: 1250.25, changePercent: 2.99, icon: <FaBitcoin /> },
    { symbol: 'ETH', name: 'إيثيريوم', price: 2280.40, change: 45.60, changePercent: 2.04, icon: <FaGem /> },
    { symbol: 'ADA', name: 'كاردانو', price: 0.52, change: -0.02, changePercent: -3.70, icon: <FaDollarSign /> },
    { symbol: 'SOL', name: 'سولانا', price: 98.75, change: 3.25, changePercent: 3.40, icon: <FaChartLine /> },
  ]);

  const [selectedMarket, setSelectedMarket] = useState('stocks');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refreshData = () => {
    // محاكاة تحديث البيانات
    const updatedStocks = stocks.map(stock => ({
      ...stock,
      price: stock.price + (Math.random() - 0.5) * 2,
      change: stock.change + (Math.random() - 0.5) * 0.5,
    }));
    
    const updatedCrypto = crypto.map(coin => ({
      ...coin,
      price: coin.price + (Math.random() - 0.5) * 200,
      change: coin.change + (Math.random() - 0.5) * 50,
    }));

    setStocks(updatedStocks);
    setCrypto(updatedCrypto);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000); // تحديث كل 30 ثانية
    return () => clearInterval(interval);
  }, []);

  const styles = {
    section: {
      padding: '5rem 2rem',
      backgroundColor: '#f1f5f9',
      textAlign: 'center',
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem',
      color: '#1e293b',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto 2rem',
      lineHeight: '1.6',
    },
    marketTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '3rem',
    },
    marketTab: {
      padding: '1rem 2rem',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    tableContainer: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      maxWidth: '1200px',
      margin: '0 auto',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      textAlign: 'right',
    },
    tableHeader: {
      backgroundColor: '#f8fafc',
      padding: '1rem',
      fontWeight: '600',
      color: '#475569',
      borderBottom: '2px solid #e2e8f0',
    },
    tableCell: {
      padding: '1.2rem 1rem',
      borderBottom: '1px solid #e2e8f0',
      color: '#1e293b',
    },
    positiveChange: {
      color: '#22c55e',
      fontWeight: '600',
    },
    negativeChange: {
      color: '#ef4444',
      fontWeight: '600',
    },
    updateInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: '#f8fafc',
      borderRadius: '10px',
      color: '#64748b',
    },
    refreshButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#22c55e',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
    },
    cryptoIcon: {
      fontSize: '1.2rem',
    },
    marketOverview: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    overviewCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      minWidth: '200px',
      textAlign: 'center',
    },
    overviewTitle: {
      fontSize: '0.9rem',
      color: '#64748b',
      marginBottom: '0.5rem',
    },
    overviewValue: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#1e293b',
    },
  };

  const currentData = selectedMarket === 'stocks' ? stocks : crypto;
  const totalChange = currentData.reduce((sum, item) => sum + item.changePercent, 0);
  const avgChange = (totalChange / currentData.length).toFixed(2);

  return (
    <section id="stocks" style={styles.section}>
      <h2 style={styles.title}>متابعة البورصة والأسهم</h2>
      <p style={styles.subtitle}>
        تابع أسعار الأسهم والعملات الرقمية لحظة بلحظة مع تحليلات ذكية وتوقعات دقيقة
      </p>

      <div style={styles.marketOverview}>
        <div style={styles.overviewCard}>
          <div style={styles.overviewTitle}>السوق الحالي</div>
          <div style={styles.overviewValue}>{selectedMarket === 'stocks' ? 'الأسهم' : 'العملات الرقمية'}</div>
        </div>
        <div style={styles.overviewCard}>
          <div style={styles.overviewTitle}></div>
          <div style={{
            ...styles.overviewValue,
            color: avgChange >= 0 ? '#22c55e' : '#ef4444',
          }}>
            {avgChange >= 0 ? '+' : ''}{avgChange}%
          </div>
          <div style={styles.overviewTitle}>متوسط التغير</div>
        </div>
        <div style={styles.overviewCard}>
          <div style={styles.overviewTitle}>عدد الأصول</div>
          <div style={styles.overviewValue}>{currentData.length}</div>
        </div>
      </div>

      <div style={styles.marketTabs}>
        <button
          style={{
            ...styles.marketTab,
            backgroundColor: selectedMarket === 'stocks' ? '#22c55e' : '#e2e8f0',
            color: selectedMarket === 'stocks' ? 'white' : '#475569',
          }}
          onClick={() => setSelectedMarket('stocks')}
        >
          <FaChartLine />
          أسهم البورصة
        </button>
        <button
          style={{
            ...styles.marketTab,
            backgroundColor: selectedMarket === 'crypto' ? '#22c55e' : '#e2e8f0',
            color: selectedMarket === 'crypto' ? 'white' : '#475569',
          }}
          onClick={() => setSelectedMarket('crypto')}
        >
          <FaBitcoin />
          العملات الرقمية
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>الرمز</th>
              <th style={styles.tableHeader}>الاسم</th>
              <th style={styles.tableHeader}>السعر الحالي</th>
              <th style={styles.tableHeader}>التغير</th>
              <th style={styles.tableHeader}>النسبة المئوية</th>
              {selectedMarket === 'stocks' && <th style={styles.tableHeader}>الحجم</th>}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td style={styles.tableCell}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {selectedMarket === 'crypto' && <span style={styles.cryptoIcon}>{item.icon}</span>}
                    {item.symbol}
                  </div>
                </td>
                <td style={styles.tableCell}>{item.name}</td>
                <td style={styles.tableCell}>
                  ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td style={{
                  ...styles.tableCell,
                  ...(item.change >= 0 ? styles.positiveChange : styles.negativeChange),
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    {item.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                  </div>
                </td>
                <td style={{
                  ...styles.tableCell,
                  ...(item.changePercent >= 0 ? styles.positiveChange : styles.negativeChange),
                }}>
                  {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                </td>
                {selectedMarket === 'stocks' && (
                  <td style={styles.tableCell}>{item.volume}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.updateInfo}>
          <div>
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
          </div>
          <button style={styles.refreshButton} onClick={refreshData}>
            <FaSyncAlt />
            تحديث البيانات
          </button>
        </div>
      </div>
    </section>
  );
};

export default StockTracker;