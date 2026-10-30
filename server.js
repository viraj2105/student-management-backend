require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(
  cors({
    // Set CLIENT_URL to your frontend URL in production. "*" is fine only for testing.
    origin: process.env.CLIENT_URL || '*',
  })
);
app.use(express.json({ limit: '1mb' }));

// Health check (used by Render/Railway and for quick testing)
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Student API running' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/students', studentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // hosting platforms inject PORT - never hardcode it

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
