import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { configDotenv } from 'dotenv';

configDotenv({path: ".env"});
const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: SITE_URL,
  credentials: true,
}));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`- Server is running on port ${PORT}`);
  console.log(`- CORS configured for: ${SITE_URL}`);
  console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
});
