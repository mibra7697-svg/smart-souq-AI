import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaAmazon, 
  FaEbay, 
  FaShopify, 
  FaStore, 
  FaPercentage, 
  FaShareAlt, 
  FaChartBar,
  FaShoppingCart,
  FaDollarSign,
  FaTag,
  FaFire,
  FaStar,
  FaShoppingBag,
  FaBoxOpen,
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaGamepad,
  FaHome,
  FaTshirt
} from 'react-icons/fa';

const EcommercePlatform = () => {
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Apple iPhone 15 Pro Max',
      price: 1099,
      originalPrice: 1199,
      discount: '8%',
      commission: '4.5%',
      store: 'Amazon',
      storeIcon: <FaAmazon />,
      rating: 4.8,
      image: <FaMobileAlt />,
      category: 'electronics',
      affiliateLink: '#',
      sales: 1245,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      price: 899,
      originalPrice: 999,
      discount: '10%',
      commission: '5%',
      store: 'Ebay',
      storeIcon: <FaEbay />,
      rating: 4.7,
      image: <FaMobileAlt />,
      category: 'electronics',
      affiliateLink: '#',
      sales: 987,
    },
    {
      id: 3,
      name: 'Sony WH-1000XM5 Headphones',
      price: 349,
      originalPrice: 399,
      discount: '12%',
      commission: '6%',
      store: 'Shopify',
      storeIcon: <FaShopify />,
      rating: 4.9,
      image: <FaHeadphones />,
      category: 'electronics',
      affiliateLink: '#',
      sales: 2156,
    },
    {
      id: 4,
      name: 'MacBook Pro 16" M3 Max',
      price: 2499,
      originalPrice: 2799,
      discount: '11%',
      commission: '3.5%',
      store: 'Amazon',
      storeIcon: <FaAmazon />,
      rating: 4.9,
      image: <FaLaptop />,
      category: 'electronics',
      affiliateLink: '#',
      sales: 743,
    },
    {
      id: 5,
      name: 'Dyson V15 Detect Vacuum',
      price: 699,
      originalPrice: 799,
      discount: '12%',
      commission: '7%',
      store: 'Noon',
      storeIcon: <FaStore />,
      rating: 4.6,
      image: <FaHome />,
      category: 'home',
      affiliateLink: '#',
      sales: 1123,
    },
    {
      id: 6,
      name: 'Nintendo Switch OLED',
      price: 349,
      originalPrice: 399,
      discount: '12%',
      commission: '6.5%',
      store: 'Ebay',
      storeIcon: <FaEbay />,
      rating: 4.8,
      image: <FaGamepad />,
      category: 'gaming',
      affiliateLink: '#',
      sales: 1854,
    },
    {
      id: 7,
      name: 'Nike Air Max 270',
      price: 149,
      originalPrice: 179,
      discount: '17%',
      commission: '8%',
      store: 'Amazon',
      storeIcon: <FaAmazon />,
      rating: 4.5,
      image: <FaTshirt />,
      category: 'fashion',
      affiliateLink: '#',
      sales: 3256,
    },
    {
      id: 8,
      name: 'PlayStation 5 Digital Edition',
      price: 449,
      originalPrice: 499,
      discount: '10%',
      commission: '5.5%',
      store: 'Shopify',
      storeIcon: <FaShopify />,
      rating: 4.8,
      image: <FaGamepad />,
      category: 'gaming',
      affiliateLink: '#',
      sales: 1643,
    },
  ];

  const stores = [
    { id: 'amazon', name: 'Amazon', icon: <FaAmazon />, commission: '3-10%', products: 1200 },
    { id: 'ebay', name: 'Ebay', icon: <FaEbay />, commission: '2-8%', products: 850 },
    { id: 'shopify', name: 'Shopify', icon: <FaShopify />, commission: '4-12%', products: 650 },
    { id: 'noon', name: 'Noon', icon: <FaStore />, commission: '5-15%', products: 750 },
  ];

  const categories = [
    { id: 'all', name: 'الكل', icon: <FaShoppingBag />, count: 1250 },
    { id: 'electronics', name: 'إلكترونيات', icon: <FaMobileAlt />, count: 450 },
    { id: 'home', name: 'أدوات منزلية', icon: <FaHome />, count: 280 },
    { id: 'gaming', name: 'ألعاب', icon: <FaGamepad />, count: 320 },
    { id: 'fashion', name: 'أزياء', icon: <FaTshirt />, count: 200 },
  ];

  const styles = {
    section: {
      padding: '2rem 1rem',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      marginBottom: '2rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.8rem',
      color: '#1e293b',
      marginBottom: '0.5rem',
      fontWeight: '700',
    },
    subtitle: {
      fontSize: '1rem',
      color: '#64748b',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    categories: {
      display: 'flex',
      gap: '0.75rem',
      marginBottom: '2rem',
      overflowX: 'auto',
      paddingBottom: '0.5rem',
    },
    categoryButton: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.25rem',
      backgroundColor: isActive ? '#3b82f6' : '#f8fafc',
      color: isActive ? 'white' : '#64748b',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease',
    }),
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem',
    },
    productCard: {
      backgroundColor: '#f8fafc',
      borderRadius: '12px',
      padding: '1.5rem',
      position: 'relative',
      transition: 'all 0.3s ease',
      border: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
    },
    productImage: {
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#3b82f6',
    },
    productName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
      lineHeight: '1.4',
      height: '2.8rem',
      overflow: 'hidden',
    },
    priceContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
    currentPrice: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#3b82f6',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    originalPrice: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      textDecoration: 'line-through',
    },
    discountBadge: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#ef4444',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
    storeInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      fontSize: '0.85rem',
      color: '#64748b',
    },
    commissionBadge: {
      backgroundColor: '#f0fdf4',
      color: '#166534',
      padding: '0.5rem 0.75rem',
      borderRadius: '8px',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
      width: 'fit-content',
    },
    ratingContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      marginBottom: '0.75rem',
      color: '#f59e0b',
    },
    salesInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.8rem',
      color: '#64748b',
      marginBottom: '1rem',
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: 'auto',
    },
    buyButton: {
      flex: 2,
      padding: '0.75rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    shareButton: {
      flex: 1,
      padding: '0.75rem',
      backgroundColor: '#f1f5f9',
      color: '#475569',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.85rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    storesSection: {
      marginTop: '3rem',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
    },
    storesTitle: {
      fontSize: '1.5rem',
      color: '#1e293b',
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    storesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
    },
    storeCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
    },
    storeIcon: {
      fontSize: '2rem',
      color: '#3b82f6',
      marginBottom: '1rem',
    },
    storeName: {
      fontSize: '1.1rem',
      fontWeight: '600',
      color: '#1e293b',
      marginBottom: '0.5rem',
    },
    storeCommission: {
      color: '#3b82f6',
      fontWeight: 'bold',
      fontSize: '1rem',
      marginBottom: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    storeProducts: {
      color: '#64748b',
      fontSize: '0.9rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    earningsCalculator: {
      marginTop: '3rem',
      padding: '2rem',
      backgroundColor: '#f0fdf4',
      borderRadius: '16px',
    },
    calculatorTitle: {
      fontSize: '1.5rem',
      color: '#166534',
      marginBottom: '1.5rem',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    calculatorContent: {
      maxWidth: '500px',
      margin: '0 auto',
      textAlign: 'center',
    },
    calculatorInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '2px solid #22c55e',
      borderRadius: '8px',
      fontSize: '1rem',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    calculatorResult: {
      fontSize: '1.5rem',
      color: '#166534',
      fontWeight: 'bold',
      marginTop: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    trendingBadge: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#f59e0b',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
    },
  };

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  const calculateEarnings = (sales) => {
    const avgCommission = 0.05; // 5% average
    return (sales * avgCommission).toFixed(2);
  };

  const isTrending = (product) => product.sales > 1500;

  return (
    <section id="ecommerce" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>منصة الوساطة التجارية</h2>
          <p style={styles.subtitle}>
            وسيط بينك وبين منصات التجارة الإلكترونية العالمية. اختر المنتج، شارك الرابط، واربح عمولة من كل عملية بيع!
          </p>
        </div>

        {/* فئات المنتجات */}
        <div style={styles.categories}>
          {categories.map((category) => (
            <button 
              key={category.id}
              style={styles.categoryButton(activeTab === category.id)}
              onClick={() => setActiveTab(category.id)}
            >
              {category.icon}
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* شبكة المنتجات */}
        <div style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              style={styles.productCard}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
              <div style={styles.discountBadge}>
                <FaTag /> خصم {product.discount}
              </div>
              
              {isTrending(product) && (
                <div style={styles.trendingBadge}>
                  <FaFire /> ترند
                </div>
              )}
              
              <div style={styles.productImage}>{product.image}</div>
              
              <h3 style={styles.productName}>{product.name}</h3>
              
              <div style={styles.priceContainer}>
                <div style={styles.currentPrice}>
                  <FaDollarSign /> {product.price}
                </div>
                <div style={styles.originalPrice}>${product.originalPrice}</div>
              </div>
              
              <div style={styles.storeInfo}>
                {product.storeIcon} متوفر على {product.store}
              </div>
              
              <div style={styles.commissionBadge}>
                <FaPercentage /> عمولة: {product.commission}
              </div>
              
              <div style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} style={{ color: i < Math.floor(product.rating) ? '#f59e0b' : '#e2e8f0' }} />
                ))}
                <span style={{ color: '#64748b', marginRight: '0.5rem' }}>{product.rating}</span>
              </div>
              
              <div style={styles.salesInfo}>
                <FaShoppingCart /> تم بيع {product.sales} قطعة
              </div>
              
              <div style={styles.actionButtons}>
                <button 
                  style={styles.buyButton}
                  onClick={() => window.open(product.affiliateLink, '_blank')}
                >
                  <FaShoppingCart /> شراء والربح
                </button>
                <button 
                  style={styles.shareButton}
                  title="مشاركة الرابط"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + product.affiliateLink);
                    alert('تم نسخ رابط المنتج!');
                  }}
                >
                  <FaShareAlt />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* المتاجر الشريكة */}
        <div style={styles.storesSection}>
          <h3 style={styles.storesTitle}>متاجرنا الشريكة</h3>
          <div style={styles.storesGrid}>
            {stores.map((store) => (
              <motion.div 
                key={store.id} 
                style={styles.storeCard}
                whileHover={{ y: -3 }}
              >
                <div style={styles.storeIcon}>{store.icon}</div>
                <h4 style={styles.storeName}>{store.name}</h4>
                <div style={styles.storeCommission}>
                  <FaPercentage /> عمولة: {store.commission}
                </div>
                <div style={styles.storeProducts}>
                  <FaBoxOpen /> +{store.products} منتج
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* حاسبة الأرباح */}
        <div style={styles.earningsCalculator}>
          <h3 style={styles.calculatorTitle}>
            <FaChartBar /> احسب أرباحك
          </h3>
          <div style={styles.calculatorContent}>
            <input
              type="number"
              placeholder="أدخل مبيعاتك المتوقعة ($)"
              style={styles.calculatorInput}
              onChange={(e) => {
                const sales = parseFloat(e.target.value) || 0;
                document.getElementById('earningsResult').textContent = 
                  `أرباحك التقريبية: $${calculateEarnings(sales)}`;
              }}
            />
            <div id="earningsResult" style={styles.calculatorResult}>
              <FaDollarSign /> أرباحك التقريبية: $0.00
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '1rem' }}>
              بمعدل عمولة 5% من كل عملية بيع. العمولة تختلف حسب المتجر والمنتج.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcommercePlatform;