import mongoose from 'mongoose';

const complimentSchema = new mongoose.Schema({
  message: { type: String, required: true, maxlength: 280 },
  secretCode: { type: String, required: true, unique: true, index: true },
  hearts: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Compliment', complimentSchema);