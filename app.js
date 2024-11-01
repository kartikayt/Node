const fs = require('fs');

const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('././routes/tourRoutes');
const userRouter = require('././routes/userRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on server`, 404));
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Cant find ${req.originalUrl} on server`,
  // });
});
//middleware gets skips when error is encountered
app.use(globalErrorHandler);

module.exports = app;
