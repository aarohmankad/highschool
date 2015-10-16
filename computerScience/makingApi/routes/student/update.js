var
  mongoose = require('mongoose'),
  Student = require('./../../models/Student');

module.exports = function(router) {
  router.put('/students/:id', function (req, res) {
    Student.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, function (err, student) {
      if (err) {
        return res.send(err.message);
      }

      return res.send(student);
    });
  });
};