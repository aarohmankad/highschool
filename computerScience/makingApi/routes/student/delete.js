var
  mongoose = require('mongoose'),
  Student = require('./../../models/Student');

module.exports = function(router) {
  router.delete('/students/:id', function (req, res) {
    Student.remove({ id: req.params.id }, function (err, numAffected) {
      if (err) {
        return res.send(err.message);
      }

      return res.send(numAffected);
    });
  });
};