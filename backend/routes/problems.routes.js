import express from 'express';
import {
  getProblems, getProblemById, getProblemByCode,
  createProblem, addAdvice, markHelpful,
  deleteProblem, deleteAdvice
} from '../controllers/problems.controller.js';

const router = express.Router();

router.get('/', getProblems);
router.get('/code/:code', getProblemByCode);
router.get('/:id', getProblemById);
router.post('/', createProblem);
router.post('/:id/advice', addAdvice);
router.patch('/:id/advice/:adviceId/helpful', markHelpful);
router.delete('/:id', deleteProblem);
router.delete('/:id/advice/:adviceId', deleteAdvice);

export default router;