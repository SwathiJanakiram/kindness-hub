import Compliment from '../models/compliment.model.js';
import { Stats, DailyStat } from '../models/stats.js';
import { nanoid } from 'nanoid';

// helper — generates KH-XXXXX
const generateCode = () => `KH-${nanoid(5).toUpperCase()}`;

// helper — upsert today's daily stat
const updateDaily = async (field) => {
  const today = new Date().toISOString().split('T')[0];
  await DailyStat.findOneAndUpdate(
    { date: today },
    { $inc: { [field]: 1 } },
    { upsert: true }
  );
};

// GET /api/compliments
export const getCompliments = async (req, res) => {
  try {
    const compliments = await Compliment.find().sort({ createdAt: -1 });
    res.json(compliments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/compliments/code/:code
export const getComplimentByCode = async (req, res) => {
  try {
    const compliment = await Compliment.findOne({ secretCode: req.params.code.toUpperCase() });
    if (!compliment) return res.status(404).json({ message: 'Code not found' });
    await Stats.findOneAndUpdate({}, { $inc: { codesSearched: 1 } }, { upsert: true });
    res.json(compliment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/compliments
export const createCompliment = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: 'Message is required' });

    const secretCode = generateCode();
    const compliment = await Compliment.create({ message, secretCode });

    // update stats
    await Stats.findOneAndUpdate({}, { $inc: { complimentsPosted: 1 } }, { upsert: true });
    await updateDaily('compliments');

    res.status(201).json({ compliment, secretCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/compliments/:id/heart
export const heartCompliment = async (req, res) => {
  try {
    const compliment = await Compliment.findByIdAndUpdate(
      req.params.id,
      { $inc: { hearts: 1 } },
      { new: true }
    );
    if (!compliment) return res.status(404).json({ message: 'Not found' });
    await Stats.findOneAndUpdate({}, { $inc: { heartsGiven: 1 } }, { upsert: true });
    res.json(compliment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/compliments/:id
export const deleteCompliment = async (req, res) => {
  try {
    await Compliment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};