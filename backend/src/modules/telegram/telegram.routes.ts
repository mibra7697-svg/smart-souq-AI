import { Router } from 'express';
import { telegramController } from './telegram.controller';

const router = Router();

// Register Telegram user
router.post('/users', telegramController.registerUser);

// Get Telegram user
router.get('/users/:telegramId', telegramController.getUser);

// Send notification
router.post('/notifications', telegramController.sendNotification);

// Demo / test notification endpoint
router.post('/test', telegramController.sendTestNotification);

export default router;
