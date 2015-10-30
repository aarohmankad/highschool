Now that we have our server, lets start to make a client that can communicate with that server and manipulate those records.

1.  Because our project is going to be making requests to our server, it also needs a server. However, this one is a lot more basic (we'll only need Express). First let's create a package.json file:

  {
    "dependencies": {
      "express": "^4.13.3"
    }
  }

2.  Now in Git Bash in your project directory, run `npm install`. This will install Express to your computer.

3.  Now that we have our dependencies installed, create a server.js file.

  // This file creates a simple server for us to use
  // Not important to understand
  var
    express = require('express'),
    app = express();

  app.use(express.static(__dirname + '/', {}));

  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
  });

  app.listen(9000);
  console.log('Magic happens on port 9000');

4.  See that this server file is a lot simpler than what we have server size. The reason we need a server is because Chrome (or any other browser) won't let you make an API request unless your website is on some sort of server. Also note how we use port 9000, because the ports for the client and server must be different.

5. Now create a js folder, and drag my request.js file into it. This will make it easier for you to make API requests. I've made the syntax significantly simpler.

6.  Now we can start creating our application. Let's start by creating an html file with a form to create a student.

  <!DOCTYPE html>
  <html>
  <head>
      <title>School</title>
  </head>
  <body>
      <h2>Create a Student: </h2>

      <!-- form to submit a student -->
      <form id='studentForm'>
          <input type='text' placeholder='Name' id='name'>
          <input type='number' placeholder='Age' id='age'>
          <input type='text' placeholder='ID' id='identification'>
          <select id='gender'>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
          </select>
          <input type="submit">
      </form>

  <!-- Request Library -->
  <script src="js/request.js"></script>
  <!-- Our client side javascript -->
  <script src='js/app.js'></script>
  </body>
  </html>

7.  Now create an `app.js` file in your js folder. We can now add an event listener on the form, and execute some code when the user submits the form to create a new Student.