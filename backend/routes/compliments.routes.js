import express from 'express';
import {
  getCompliments, getComplimentByCode,
  createCompliment, heartCompliment, deleteCompliment
} from '../controllers/compliments.controller.js';

const router = express.Router();

router.get('/', getCompliments);
router.get('/code/:code', getComplimentByCode);
router.post('/', createCompliment);
router.patch('/:id/heart', heartCompliment);
router.delete('/:id', deleteCompliment);

export default router;