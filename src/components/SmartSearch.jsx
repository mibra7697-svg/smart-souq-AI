import React, { useState, useEffect } from 'react';
import { sendToAI } from '../services/comparisonService';
import { LEGAL_DISCLAIMERS } from '../constants/commission';
import './SmartSearch.css';

const SmartSearch = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disclaimers, setDisclaimers] = useState([]);

    const categories = [
        { id: 'all', name: 'جميع الفئات' },
        { id: 'electronics', name: 'إلكترونيات' },
        { id: 'fashion', name: 'موضة' },
        { id: 'home', name: 'أجهزة منزلية' },
        { id: 'sports', name: 'رياضة' }
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (query.trim().length < 2) {
            setError('الرجاء إدخال كلمة بحث مكونة من حرفين على الأقل');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const searchResult = await sendToAI(query, category, {
                maxResults: 20,
                sortBy: 'rating'
            });

            switch (searchResult.status) {
                case 'success':
                    setResults(searchResult.data || []);
                    setDisclaimers(searchResult.disclaimers || [
                        LEGAL_DISCLAIMERS.PRICING,
                        LEGAL_DISCLAIMERS.AVAILABILITY
                    ]);
                    break;
                    
                case 'no_results':
                    setError(searchResult.message);
                    setDisclaimers(searchResult.disclaimers || []);
                    break;
                    
                case 'error':
                    setError(searchResult.message);
                    break;
                    
                default:
                    setError('حدث خطأ غير متوقع');
            }
        } catch (err) {
            console.error('Search failed:', err);
            setError('فشل الاتصال بالخادم، يرجى المحاولة لاحقاً');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price, currency = 'ريال') => {
        return new Intl.NumberFormat('ar-SA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price) + ` ${currency}`;
    };

    return (
        <div className="smart-search-container">
            {/* إخلاء المسؤولية الثابت */}
            <div className="legal-banner">
                <p>
                    <strong>ملاحظة هامة:</strong> {LEGAL_DISCLAIMERS.COMMISSION}
                </p>
            </div>

            {/* نموذج البحث */}
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="ماذا تبحث عن؟ (اسم المنتج، الماركة، الخصائص...)"
                        className="search-input"
                        disabled={loading}
                    />
                    
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="category-select"
                        disabled={loading}
                    >
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        type="submit" 
                        className="search-button"
                        disabled={loading || query.trim().length < 2}
                    >
                        {loading ? 'جاري البحث...' : 'بحث ذكي'}
                    </button>
                </div>
                
                <div className="search-tips">
                    <small>
                        💡 نصائح: استخدم كلمات محددة للحصول على نتائج أفضل
                    </small>
                </div>
            </form>

            {/* حالة التحميل */}
            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>جاري البحث في المتاجر الشريكة...</p>
                    <div className="loading-steps">
                        <span>✓ التحقق من الفئات</span>
                        <span>✓ البحث المحلي</span>
                        <span>⏳ مقارنة الأسعار</span>
                    </div>
                </div>
            )}

            {/* رسالة الخطأ */}
            {error && !loading && (
                <div className="error-state">
                    <div className="error-icon">⚠️</div>
                    <h3>{error}</h3>
                    <div className="suggestions">
                        <p>يمكنك تجربة:</p>
                        <ul>
                            <li>التأكد من تهجئة الكلمة بشكل صحيح</li>
                            <li>استخدام مصطلحات بحث أعم</li>
                            <li>البحث في فئة "جميع الفئات"</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* عرض النتائج */}
            {results.length > 0 && (
                <div className="results-section">
                    <div className="results-header">
                        <h2>
                            وجدنا {results.length} منتجاً لـ "{query}"
                        </h2>
                        <div className="commission-badge">
                            ⓘ جميع الأسعار تشمل عمولة وساطة
                        </div>
                    </div>

                    {/* إخلاءات المسؤولية الديناميكية */}
                    {disclaimers.length > 0 && (
                        <div className="dynamic-disclaimers">
                            {disclaimers.map((disclaimer, index) => (
                                <p key={index} className="disclaimer-item">
                                    ⚠️ {disclaimer}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* قائمة المنتجات */}
                    <div className="products-grid">
                        {results.map(product => (
                            <div key={product.id} className="product-card">
                                {/* صورة المنتج */}
                                <div className="product-image">
                                    <img 
                                        src={product.imageUrl || '/default-product.png'} 
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.src = '/default-product.png';
                                        }}
                                    />
                                    {/* الشارات الواقعية */}
                                    {product.badge && product.badge.length > 0 && (
                                        <div className="product-badges">
                                            {product.badge.map((badge, idx) => (
                                                <span 
                                                    key={idx}
                                                    className={`badge badge-${badge.type}`}
                                                    title={badge.verified ? 'موثق' : ''}
                                                >
                                                    {badge.text}
                                                    {badge.verified && ' ✓'}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* معلومات المنتج */}
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-brand">{product.brand || 'ماركة متنوعة'}</p>
                                    <p className="product-store">
                                        متوفر في: {product.store}
                                        {product.storeRating && (
                                            <span className="store-rating">
                                                ⭐ {product.storeRating}/5
                                            </span>
                                        )}
                                    </p>

                                    {/* العرض المالي الشفاف */}
                                    <div className="product-pricing">
                                        <div className="final-price">
                                            <span className="price-label">السعر النهائي:</span>
                                            <span className="price-value">
                                                {formatPrice(product.pricing.finalPrice)}
                                            </span>
                                        </div>
                                        
                                        <div className="price-breakdown">
                                            <details>
                                                <summary>تفاصيل السعر</summary>
                                                <ul>
                                                    <li>
                                                        السعر الأصلي: 
                                                        <span>{formatPrice(product.pricing.originalPrice)}</span>
                                                    </li>
                                                    <li>
                                                        عمولة الوساطة ({product.pricing.commissionRate}%): 
                                                        <span>{formatPrice(product.pricing.commissionAmount)}</span>
                                                    </li>
                                                    <li>
                                                        <strong>المجموع: </strong>
                                                        <strong>{formatPrice(product.pricing.finalPrice)}</strong>
                                                    </li>
                                                </ul>
                                            </details>
                                        </div>
                                    </div>

                                    {/* معلومات الشحن والتوفر */}
                                    <div className="product-meta">
                                        <span className={`shipping ${product.shippingInfo.includes('مجاني') ? 'free' : 'paid'}`}>
                                            🚚 {product.shippingInfo}
                                        </span>
                                        <span className="stock">
                                            {product.stockLevel === 'low' ? '🟡 كمية محدودة' : 
                                             product.stockLevel === 'out_of_stock' ? '🔴 غير متوفر' : '🟢 متوفر'}
                                        </span>
                                        <span className="updated">
                                            📅 {product.lastUpdated}
                                        </span>
                                    </div>

                                    {/* أزرار العمل */}
                                    <div className="product-actions">
                                        <a 
                                            href={product.affiliateLink}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            className="btn-primary"
                                            onClick={() => trackAffiliateClick(product.id)}
                                        >
                                            👁️ عرض العرض في المتجر
                                        </a>
                                        <a 
                                            href={product.productPage}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            className="btn-secondary"
                                        >
                                            ℹ️ تفاصيل المنتج
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* تتبع التحليلات */}
            <AnalyticsTracker 
                query={query}
                resultsCount={results.length}
                category={category}
            />
        </div>
    );
};

// مكون مساعد لتتبع التحليلات
const AnalyticsTracker = ({ query, resultsCount, category }) => {
    useEffect(() => {
        if (query && resultsCount > 0) {
            // إرسال بيانات التحليلات
            console.log('Tracking search:', {
                query,
                resultsCount,
                category,
                timestamp: new Date().toISOString()
            });
            
            // يمكنك إضافة Google Analytics أو أي خدمة تحليلات هنا
            // window.gtag('event', 'search', { ... });
        }
    }, [query, resultsCount, category]);

    return null;
};

// دالة لتتبع النقرات (لتحسين العمولات)
const trackAffiliateClick = (productId) => {
    console.log(`Affiliate click tracked: ${productId}`);
    
    // يمكنك إضافة:
    // 1. إرسال البيانات لخادمك
    // 2. تخزين في localStorage للتحليلات
    // 3. إرسال لـ Google Analytics
    
    localStorage.setItem(`last_clicked_${productId}`, new Date().toISOString());
};

export default SmartSearch;