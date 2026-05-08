import Problem from '../models/problem.model.js';
import { Stats, DailyStat } from '../models/stats.js';
import { nanoid } from 'nanoid';

const generateCode = () => `KH-${nanoid(5).toUpperCase()}`;

const updateDaily = async (field) => {
  const today = new Date().toISOString().split('T')[0];
  await DailyStat.findOneAndUpdate(
    { date: today },
    { $inc: { [field]: 1 } },
    { upsert: true }
  );
};

// GET /api/problems
export const getProblems = async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const problems = await Problem.find(filter, { advice: 0 }).sort({ createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/problems/:id
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/problems/code/:code
export const getProblemByCode = async (req, res) => {
  try {
    const problem = await Problem.findOne({ secretCode: req.params.code.toUpperCase() });
    if (!problem) return res.status(404).json({ message: 'Code not found' });
    await Stats.findOneAndUpdate({}, { $inc: { codesSearched: 1 } }, { upsert: true });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/problems
export const createProblem = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    if (!title || !description) return res.status(400).json({ message: 'Title and description required' });

    const secretCode = generateCode();
    const problem = await Problem.create({ title, description, category, secretCode });

    await Stats.findOneAndUpdate({}, { $inc: { problemsPosted: 1 } }, { upsert: true });
    await updateDaily('problems');

    res.status(201).json({ problem, secretCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/problems/:id/advice
export const addAdvice = async (req, res) => {
  try {
    const { suggestion } = req.body;
    if (!suggestion) return res.status(400).json({ message: 'Suggestion is required' });

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $push: { advice: { suggestion } } },
      { new: true }
    );
    if (!problem) return res.status(404).json({ message: 'Not found' });

    await Stats.findOneAndUpdate({}, { $inc: { adviceGiven: 1 } }, { upsert: true });
    await updateDaily('advice');

    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/problems/:id/advice/:adviceId/helpful
export const markHelpful = async (req, res) => {
  try {
    const problem = await Problem.findOneAndUpdate(
      { _id: req.params.id, 'advice._id': req.params.adviceId },
      { $inc: { 'advice.$.helpful': 1 } },
      { new: true }
    );
    if (!problem) return res.status(404).json({ message: 'Not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/problems/:id
export const deleteProblem = async (req, res) => {
  try {
    await Problem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/problems/:id/advice/:adviceId
export const deleteAdvice = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $pull: { advice: { _id: req.params.adviceId } } },
      { new: true }
    );
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};