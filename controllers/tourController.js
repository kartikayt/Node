const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.addNewTour = (req, res) => {
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

exports.getATour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
