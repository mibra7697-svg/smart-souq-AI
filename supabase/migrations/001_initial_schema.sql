-- جدول المنتجات
CREATE TABLE IF NOT EXISTS products (
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
CREATE TABLE IF NOT EXISTS affiliates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  telegram_id TEXT UNIQUE,
  wallet_address TEXT,
  total_commission DECIMAL(10,2) DEFAULT 0,
  level TEXT DEFAULT 'direct',
  status TEXT DEFAULT 'active',
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول العمولات
CREATE TABLE IF NOT EXISTS commissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES affiliates(id),
  product_id UUID REFERENCES products(id),
  sale_amount DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- تفعيل Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان
CREATE POLICY "الجميع يمكنهم رؤية المنتجات" ON products FOR SELECT USING (true);
CREATE POLICY "الوسطاء يرون بياناتهم فقط" ON affiliates FOR ALL USING (auth.uid() = id);
