const mongoose = require('mongoose');

// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'A tour name is compulsary'],
//     unique: true,
//   },
//   rating: {
//     type: Number,
//     default: 4.5,
//   },
//   price: {
//     type: Number,
//     required: [true, 'A tour price is compulsary'],
//   },
// });

const tourSchema = mongoose.Schema(
  {
    startLocation: {
      description: {
        type: String,
        required: [true, 'Start Location must contain description'],
      },
      type: {
        type: String,
        required: [true, 'Start Location Must contain type'],
      },
      coordinates: {
        type: [Number],
      },
      address: {
        type: String,
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
    },
    startDates: {
      type: [Date],
      required: [true, 'Start Date is required'],
    },
    name: {
      type: String,
      required: [true, 'Name of tour is required'],
      unique: [true, 'Already contain tour with this name'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
    },
    maxGroupSize: {
      type: Number,
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required'],
    },
    guides: {
      type: [String],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    summary: {
      type: String,
      required: [true, 'Description is required'],
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
    },
    locations: {
      type: mongoose.Schema.Types.Mixed,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObjects: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//Document Middleware: runs before .save() .create()
tourSchema.pre('save', function (next) {
  console.log('Will save document');
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

//Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

module.exports = mongoose.model('Tour', tourSchema);
