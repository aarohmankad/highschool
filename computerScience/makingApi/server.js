var
  express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8000;

// Allow us to return json to client
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// Connect to our mongo database
mongoose.connect('mongodb://localhost/school');

// Instantiate all our routes
require('./routes/index')(app);

// Start server
app.listen(port);
console.log('Magic happens on port:', port);