import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';
import menuRouter from './routes/menuRoutes.js'
import { seedDatabase } from './seed.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())
// Routes
app.use('/', indexRouter);
app.use('/menu',menuRouter)

// MongoDB Connection and Seeding
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');

  // ✅ Seed only once (if DB is empty)
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});
