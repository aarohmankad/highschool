var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/school');

require('./routes/index')(app);

app.listen(port);
console.log('Magic happens on port:', port);