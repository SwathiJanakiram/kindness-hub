import mongoose from 'mongoose';

const adviceSchema = new mongoose.Schema({
  suggestion: { type: String, required: true, maxlength: 400 },
  helpful: { type: Number, default: 0 },
}, { timestamps: true });

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 500 },
  category: {
    type: String,
    enum: ['career', 'relationships', 'mental health', 'academics', 'finance', 'other'],
    default: 'other'
  },
  secretCode: { type: String, required: true, unique: true, index: true },
  advice: [adviceSchema],
}, { timestamps: true });

export default mongoose.model('Problem', problemSchema);