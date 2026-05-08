import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  totalVisits: { type: Number, default: 0 },
  uniqueSessions: { type: Number, default: 0 },
  complimentsPosted: { type: Number, default: 0 },
  problemsPosted: { type: Number, default: 0 },
  adviceGiven: { type: Number, default: 0 },
  heartsGiven: { type: Number, default: 0 },
  codesSearched: { type: Number, default: 0 },
});

const dailyStatSchema = new mongoose.Schema({
  date: { type: String, unique: true }, // YYYY-MM-DD
  visits: { type: Number, default: 0 },
  compliments: { type: Number, default: 0 },
  problems: { type: Number, default: 0 },
  advice: { type: Number, default: 0 },
});

export const Stats = mongoose.model('Stats', statsSchema);
export const DailyStat = mongoose.model('DailyStat', dailyStatSchema);