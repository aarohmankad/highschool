var mongoose = require('mongoose');
var Student = require('./Student');

mongoose.connect('mongodb://localhost/school');

var aaroh = Student.create({
  id: '149003115',
  name: 'Aaroh',
  age: 17,
  gradeLevel: 12,
});

aaroh.then(function (aarohData) {
  console.log(aarohData);
});

var maxwell = Student.create({
  id: '148003878',
  name: 'Maxwell',
  age: 12,
  gradeLevel: 7,
});

maxwell.then(function (maxwellData) {
  console.log(maxwellData);
});

Student.find({'name': 'Aaroh'}, function(err, student) {
  if (err) {
    console.log(err);
  }

  console.log('Student with name `Aaroh`:', student);
});