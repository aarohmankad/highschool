var
  mongoose = require('mongoose'),
  Student = require('./../../models/Student');

module.exports = function(router) {
  router.post('/students', function (req, res) {
    Student.create(req.body, function (err, student) {
      if (err) {
        return res.send(err.message);
      }

      return res.send(student);
    });
  });
};