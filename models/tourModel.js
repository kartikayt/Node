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

const tourSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('Tour', tourSchema);
