import { sendToAI } from '../services/comparisonService';

/**
 * مثال على استخدام الخدمة في مكون React
 */
class SearchComponent {
    async handleSearch(query, category) {
        try {
            // عرض حالة التحميل
            this.showLoadingState();
            
            // استدعاء خدمة البحث
            const result = await sendToAI(query, category, {
                maxResults: 20,
                sortBy: 'price' // أو 'rating' أو 'popularity'
            });
            
            // معالجة النتائج بناءً على الحالة
            switch (result.status) {
                case 'success':
                    this.displayResults(result.data, result.disclaimers);
                    break;
                    
                case 'no_results':
                    this.showNoResults(result.message, result.suggestions);
                    break;
                    
                case 'error':
                    this.showError(result.message, result.recoverySteps);
                    break;
                    
                default:
                    console.warn('حالة غير معروفة:', result.status);
            }
            
            // تسجيل التحليلات
            this.logSearchAnalytics(result);
            
        } catch (error) {
            console.error('Search failed:', error);
            this.showError('فشل البحث، يرجى المحاولة مرة أخرى');
        }
    }
    
    displayResults(products, disclaimers) {
        // عرض المنتجات مع معلومات السعر الشفافة
        products.forEach(product => {
            console.log(`
                المنتج: ${product.name}
                السعر: ${product.pricing.display.displayText}
                ${product.pricing.display.breakdown}
                ${disclaimers.join(' | ')}
            `);
        });
    }
    
    showLoadingState() {
        console.log('جاري البحث عن أفضل العروض...');
    }
    
    showNoResults(message, suggestions) {
        console.warn(message);
        suggestions.forEach(suggestion => console.log(`- ${suggestion}`));
    }
    
    showError(message, recoverySteps = []) {
        console.error(`خطأ: ${message}`);
        recoverySteps.forEach(step => console.log(`- ${step}`));
    }
    
    logSearchAnalytics(result) {
        // تسجيل إحصاءات البحث للتحسين المستقبلي
        const analytics = {
            query: result.metadata?.query,
            resultsCount: result.metadata?.resultsCount || 0,
            timestamp: result.timestamp,
            status: result.status
        };
        
        // إرسال البيانات لخدمة التحليلات
        // analyticsService.trackSearch(analytics);
    }
}

// تصدير للاستخدام
export default SearchComponent;