const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogs = require('./controllers/blogs');
const users = require('./controllers/users');
const login = require('./controllers/login');
const testingRouter = require('./controllers/test');

const app = express();
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB');
  }).catch(() => {
    logger.info('Couldnt connect to MongoDB');
  });

app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use(express.static('dist'));

app.use('/api/blogs', blogs);
app.use('/api/users', users);
app.use('/api/login', login);

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter);
}

// SPA fallback: any non-API GET request returns index.html
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
