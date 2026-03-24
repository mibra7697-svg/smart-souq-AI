import { Router } from 'express';
import { WalletController } from './wallet.controller';
import { authGuard } from '../../core/middleware/authGuard';

const router = Router();
const controller = new WalletController();

router.post('/deposit', authGuard, controller.deposit);
router.post('/withdraw', authGuard, controller.withdraw);
router.post('/transfer', authGuard, controller.transfer);
router.get('/transactions', authGuard, controller.listTransactions);
router.get('/', authGuard, controller.getWallet); // رصيد المحفظة

export default router;
