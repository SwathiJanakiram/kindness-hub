import { Stats, DailyStat } from '../models/stats.js';

// GET /api/stats
export const getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne() || {};
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/stats/daily
export const getDailyStats = async (req, res) => {
  try {
    const daily = await DailyStat.find().sort({ date: -1 }).limit(30);
    res.json(daily);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/stats/visit
export const trackVisit = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    await Stats.findOneAndUpdate({}, { $inc: { totalVisits: 1 } }, { upsert: true });
    await DailyStat.findOneAndUpdate(
      { date: today },
      { $inc: { visits: 1 } },
      { upsert: true }
    );
    res.json({ message: 'Visit tracked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/stats/session
export const trackSession = async (req, res) => {
  try {
    await Stats.findOneAndUpdate({}, { $inc: { uniqueSessions: 1 } }, { upsert: true });
    res.json({ message: 'Session tracked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};