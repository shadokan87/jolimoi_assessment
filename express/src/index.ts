import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

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
  optionsSuccessStatus: 200
}));

app.use('/api', apiRoutes);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'express server running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`- Server is running on port ${PORT}`);
  console.log(`- CORS configured for: ${SITE_URL}`);
  console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
});
