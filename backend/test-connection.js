require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function testConnection() {
  console.log('🔄 جاري اختبار الاتصال باستخدام إعدادات .env...');
  // Mask password for safety in logs
  const maskedUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@') : 'UNDEFINED';
  console.log(`🔗 الرابط: ${maskedUrl}`);

  try {
    await client.connect();
    console.log('✅ الاتصال ناجح!');
    const res = await client.query('SELECT version()');
    console.log(`📊 الإصدار: ${res.rows[0].version}`);
  } catch (err) {
    console.error('❌ فشل الاتصال:', err.message);
  } finally {
    await client.end();
  }
}

testConnection();
