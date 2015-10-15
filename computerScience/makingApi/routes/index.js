var
  express = require('express'),
  fs = require('fs'),
  path = require('path'),
  router = express.Router();

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    path.resolve(__dirname, file);
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

module.exports = function(app) {
  app.use('/api', router);
  var folders = getDirectories(__dirname);
  for (var i = folders.length - 1; i >= 0; i--) {
    fs.readdirSync(__dirname + '/' + folders[i]).forEach(function(file) {
      if (file == 'index.js') return;
      
      var name = file.substr(0, file.indexOf('.'));
      require('./' + folders[i] + '/' + name)(router);
    });
  };
};
