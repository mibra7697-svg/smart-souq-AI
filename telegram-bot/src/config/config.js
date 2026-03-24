require('dotenv').config();
module.exports = {
    token: process.env.TELEGRAM_BOT_TOKEN,
    apiUrl: process.env.API_URL || 'http://localhost:3000'
};
