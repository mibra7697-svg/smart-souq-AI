const { Telegraf } = require('telegraf');
const config = require('./config/config');
const startHandler = require('./handlers/start');

if (!config.token) {
    console.error(' Error: TELEGRAM_BOT_TOKEN is missing!');
    process.exit(1);
}

const bot = new Telegraf(config.token);

// Commands
bot.start(startHandler);

bot.launch().then(() => {
    console.log(' Smart Souq Bot is running...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
