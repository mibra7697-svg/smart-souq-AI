import { AppError } from "../core/errors/AppError";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_DEMO_CHAT_ID = process.env.TELEGRAM_DEMO_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

export const sendTelegramNotification = async (message: string, chatId?: string) => {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn("Telegram bot token is not configured. Skipping notification.");
    return;
  }

  const targetChatId = chatId || TELEGRAM_DEMO_CHAT_ID;
  if (!targetChatId) {
    console.warn("Telegram chat id is not configured. Skipping notification.");
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Telegram API error:", text);
      throw new AppError("فشل إرسال رسالة تيليجرام", 502);
    }
  } catch (error) {
    console.error("Telegram notification failed:", error);
    // For demo mode we don't throw to avoid breaking flows
  }
};

