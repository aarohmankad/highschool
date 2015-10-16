var
  mongoose = require('mongoose'),
  Student = require('./../../models/Student');

module.exports = function(router) {
  router.get('/students/:id', function (req, res) {
    Student.find({ id: req.params.id }, function (err, student) {
      if (err) {
        return res.send(err.message);
      } else if (!student) {
        return res.send('No Student with id ' + req.params.id + ' was found.');
      }

      return res.send(student);
    });
  });
};