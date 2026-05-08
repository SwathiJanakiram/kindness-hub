import express from 'express';
import {
  getStats, getDailyStats, trackVisit, trackSession
} from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/', getStats);
router.get('/daily', getDailyStats);
router.post('/visit', trackVisit);
router.post('/session', trackSession);

export default router;