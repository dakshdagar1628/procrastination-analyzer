import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import activityRoutes from './routes/activityRoutes.js';
import { initializeActivityTable } from './models/activityModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use('/api', activityRoutes);

const wait = (milliseconds) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });

const connectWithRetry = async (attempt = 1) => {
  try {
    await initializeActivityTable();
  } catch (error) {
    const maxAttempts = 10;
    const delay = 3000;

    if (attempt >= maxAttempts) {
      throw error;
    }

    console.error(
      `Database connection failed on attempt ${attempt}. Retrying in ${delay / 1000} seconds...`
    );

    await wait(delay);
    await connectWithRetry(attempt + 1);
  }
};

const startServer = async () => {
  try {
    await connectWithRetry();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message || error);
    process.exit(1);
  }
};

startServer();
