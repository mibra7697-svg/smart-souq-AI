-- جدول المنتجات
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  original_price DECIMAL(10,2),
  discounted_price DECIMAL(10,2),
  discount_percent INTEGER DEFAULT 0,
  store TEXT NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 5.0,
  rating DECIMAL(3,2) DEFAULT 4.0,
  sales_count INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  affiliate_url TEXT,
  image_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الوسطاء
CREATE TABLE affiliates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  telegram_id TEXT UNIQUE,
  wallet_address TEXT,
  total_commission DECIMAL(10,2) DEFAULT 0,
  level VARCHAR(20) DEFAULT 'direct',
  status VARCHAR(20) DEFAULT 'active',
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول العمولات
CREATE TABLE commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES affiliates(id),
  product_id UUID REFERENCES products(id),
  sale_amount DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending',
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);