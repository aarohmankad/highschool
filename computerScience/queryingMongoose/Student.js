var mongoose = require('mongoose');

var Student = mongoose.model('Student', {
  id: String,
  name: String,
  age: Number,
  gradeLevel: Number,
});

module.exports = Student;