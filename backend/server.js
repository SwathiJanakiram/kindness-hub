import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import complimentRoutes from './routes/compliments.routes.js';
import problemRoutes from './routes/problems.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/compliments', complimentRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/', (req, res) => res.send('Kindness Hub API running 🌸'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));