 # Smart Souq — API Documentation (English + Arabic) 
 Version: 1.0.0  
 Last Updated: 2026-02-07  
 
 ==================================================== 
 =================  ENGLISH VERSION  ================= 
 ==================================================== 
 
 # Smart Souq — API Documentation  
 Smart Souq is a hybrid brokerage and affiliate-commerce platform that connects buyers, sellers, and affiliates through a secure escrow-based transaction system. 
 
 Base URL (Local Development): 
 http://localhost:4000/api 
 
 ---------------------------------------------------- 
 ## 1. Authentication API 
 
 ### POST /auth/register 
 Registers a new user. 
 
 Body: 
 { 
   "email": "user@example.com", 
   "password": "123456", 
   "username": "john" 
 } 
 
 Response: 
 { 
   "success": true, 
   "user": { ... }, 
   "token": "JWT_TOKEN" 
 } 
 
 ### POST /auth/login 
 Logs in a user and returns access token + refresh token. 
 
 Body: 
 { 
   "email": "user@example.com", 
   "password": "123456" 
 } 
 
 ---------------------------------------------------- 
 ## 2. Products API 
 
 ### GET /products 
 Returns paginated list of active products. 
 
 Query Params: 
 - page  
 - limit  
 - search  
 - minPrice  
 - maxPrice  
 - sort  
 
 ### POST /products  
 Requires authentication (seller).  
 Creates a new product. 
 
 Body: 
 { 
   "name": "Laptop Pro", 
   "description": "High-end device", 
   "price": 1499.99 
 } 
 
 ---------------------------------------------------- 
 ## 3. Orders API 
 
 ### POST /orders 
 Creates a new order using escrow logic. 
 
 ### GET /orders/my 
 Returns all orders for the authenticated user. 
 
 ---------------------------------------------------- 
 ## 4. Commissions API 
 
 ### GET /commissions/my 
 Returns all commissions earned by the user. 
 
 ### GET /commissions/my/total 
 Returns total commission amount. 
 
 ---------------------------------------------------- 
 ## 5. Payouts API 
 
 ### POST /payouts/request 
 Creates a payout request. 
 
 Body: 
 { 
   "amount": 50, 
   "method": "BANK_TRANSFER" 
 } 
 
 ---------------------------------------------------- 
 ## 6. Wallet API 
 
 ### GET /wallet 
 Returns wallet balances (available + pending). 
 
 ### POST /wallet/deposit  
 ### POST /wallet/withdraw  
 ### POST /wallet/transfer  
 
 ---------------------------------------------------- 
 ## 7. Admin API 
 
 ### GET /admin/users  
 ### GET /admin/orders  
 ### GET /admin/payouts  
 ### GET /admin/overview  
 
 Admin-only endpoints. 
 
 ---------------------------------------------------- 
 ## 8. Error Format 
 
 { 
   "success": false, 
   "message": "Error message" 
 } 
 
 ==================================================== 
 =================  ARABIC VERSION  ================== 
 ==================================================== 
 
 # توثيق واجهات API — Smart Souq  
 الإصدار: 1.0.0  
 آخر تحديث: 2026-02-07  
 
 ## 1. نظرة عامة 
 Smart Souq هي منصة وساطة تجارية تعتمد على نظام Escrow، وتربط بين المشترين والبائعين والمسوقين بالعمولة.  
 توفر الواجهة البرمجية وظائف: التسجيل، تسجيل الدخول، المنتجات، الطلبات، العمولات، السحوبات، والمحفظة. 
 
 عنوان الـ API في بيئة التطوير: 
 http://localhost:4000/api 
 
 ---------------------------------------------------- 
 ## 2. واجهات المصادقة Authentication 
 
 ### POST /auth/register  
 تسجيل مستخدم جديد. 
 
 المدخلات: 
 { 
   "email": "user@example.com", 
   "password": "123456", 
   "username": "john" 
 } 
 
 ### POST /auth/login  
 تسجيل الدخول وإرجاع Token + Refresh Token. 
 
 ---------------------------------------------------- 
 ## 3. واجهات المنتجات Products 
 
 ### GET /products  
 إرجاع قائمة المنتجات مع دعم البحث والتصفية. 
 
 ### POST /products  
 (للبائعين فقط) إنشاء منتج جديد. 
 
 ---------------------------------------------------- 
 ## 4. واجهات الطلبات Orders 
 
 ### POST /orders  
 إنشاء طلب جديد باستخدام نظام الضمان Escrow. 
 
 ### GET /orders/my  
 إرجاع طلبات المستخدم. 
 
 ---------------------------------------------------- 
 ## 5. واجهات العمولات Commissions 
 
 ### GET /commissions/my  
 إرجاع العمولات الخاصة بالمستخدم. 
 
 ### GET /commissions/my/total  
 إرجاع إجمالي الأرباح. 
 
 ---------------------------------------------------- 
 ## 6. واجهات السحب Payouts 
 
 ### POST /payouts/request  
 إنشاء طلب سحب. 
 
 ---------------------------------------------------- 
 ## 7. واجهات المحفظة Wallet 
 
 ### GET /wallet  
 إرجاع رصيد المحفظة. 
 
 ### POST /wallet/deposit  
 ### POST /wallet/withdraw  
 ### POST /wallet/transfer  
 
 ---------------------------------------------------- 
 ## 8. واجهات الإدارة Admin 
 
 ### GET /admin/users  
 ### GET /admin/orders  
 ### GET /admin/payouts  
 ### GET /admin/overview  
 
 (للمشرفين فقط) 
 
 ---------------------------------------------------- 
 ## 9. شكل الخطأ 
 
 { 
   "success": false, 
   "message": "حدث خطأ" 
 }