import { Router } from 'express';
import { handleCurrencyConversion } from '../controllers/convert.controller';

const router = Router();

router.get('/convert', handleCurrencyConversion);

export default router;
