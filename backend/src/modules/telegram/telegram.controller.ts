import { Request, Response } from 'express';
import { sendTelegramNotification } from '../../services/notification.service';

class TelegramController {
  async registerUser(req: Request, res: Response) {
    try {
      // In a real system we would persist the mapping between user and telegramId.
      res.status(201).json({ success: true, message: 'تم ربط حساب تيليجرام بنجاح (وضع العرض).' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'حدث خطأ أثناء ربط حساب تيليجرام' });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      // Demo response – real implementation would read from DB
      res.status(200).json({ success: true, data: { id: req.params.telegramId } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'حدث خطأ أثناء جلب بيانات المستخدم' });
    }
  }

  async sendNotification(req: Request, res: Response) {
    try {
      const { message, chatId } = req.body;
      const text = message || '🔔 إشعار من منصة SmartSouq';
      await sendTelegramNotification(text, chatId);
      res.status(200).json({ success: true, message: 'تم إرسال الإشعار إلى تيليجرام' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'حدث خطأ أثناء إرسال إشعار تيليجرام' });
    }
  }

  async sendTestNotification(req: Request, res: Response) {
    try {
      const text =
        req.body?.message ||
        '🔔 رسالة تجريبية من وضع العرض في SmartSouq — هكذا تصل التنبيهات الفورية إلى الشركاء.';
      await sendTelegramNotification(text);
      res.status(200).json({ success: true, message: 'تم إرسال رسالة تيليجرام التجريبية' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'تعذّر إرسال رسالة تيليجرام التجريبية' });
    }
  }
}

export const telegramController = new TelegramController();
