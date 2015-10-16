var mongoose = require('mongoose');

var Student = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
  },
  gender: {
    type: String,
    enum: [
      'Male',
      'Female',
    ],
  },
});

module.exports = mongoose.model('Student', Student);
