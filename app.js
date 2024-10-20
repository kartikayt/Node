const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
// app.use((req, res, next) => {
//   console.log('hello from middleware');
//   next();
// });

app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const addNewTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getATour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  console.log(req.requestedAt);
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id does not exist',
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: {
      tour: tour,
    },
  });
};

const updateTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id does not exist',
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour',
    },
  });
};

const deleteTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Id does not exist',
    });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addNewTour);
// app.get('/api/v1/tours/:id', getATour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(addNewTour);

app.use((req, res, next) => {
  console.log('hello from middleware after 1st route');
  next();
});

app
  .route('/api/v1/tours/:id')
  .get(getATour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`app is running on port ${port}...`);
});
