const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

const tourRouter = require('././routes/tourRoutes');
const userRouter = require('././routes/userRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

module.exports = app;
