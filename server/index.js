const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const gameRoutes = require('./routes/game');
const uploadRoutes = require('./routes/upload');

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cute-carter';

mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('-> Make sure MongoDB is running (e.g. start mongod or use Atlas URI in .env)');
    process.exit(1);
  });
