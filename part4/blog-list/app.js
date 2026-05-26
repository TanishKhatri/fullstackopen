const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogs = require('./controllers/blogs');
const users = require('./controllers/users');

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

app.use('/api/blogs', blogs);
app.use('/api/users', users);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
