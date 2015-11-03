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

  // Create a request object we will be using
  var request = new Request();

  /**
   * when the form is submitted, execute code to add student
   * @param event {Object} event information on form submittion
   */
  document.getElementById('studentForm').addEventListener('submit', function(event) {
    // Prevent default action of submitting a form
    event.preventDefault();

    // Create a parameters object for sending to api
    var params = {
      name: document.getElementById('name').value,
      age: parseInt(document.getElementById('age').value),
      id: document.getElementById('identification').value,
      gender: document.getElementById('gender').value,
    };

    // Send post request to api endpoint
    request.send({
      method: 'POST',
      url: 'http://localhost:8000/api/students',
      data: params,
    }, function(err, data) {
      if (err) {
        console.log(err);
      }

      // Print the data after we receive it
      addDataToHTML(data);
    });
  });

8. Near the end of the function you will see a function call to addDataToHTML(). Let's create that function, or else we will get errors if we try to run the program.

  /**
   * adds student data to students table
   * @param data {Object} new student data
   */
  function addDataToHTML (data) {
    // Create row for new student
    var row = document.createElement('tr');
    // Create columns of attributes
    var nameCol = document.createElement('td');
    var ageCol = document.createElement('td');
    var idCol = document.createElement('td');
    var genderCol = document.createElement('td');

    // Set content of columns 
    nameCol.innerHTML = data.name;
    ageCol.innerHTML = data.age;
    idCol.innerHTML = data.id;
    genderCol.innerHTML = data.gender;

    // Add all columns to the row
    row.appendChild(nameCol);
    row.appendChild(ageCol);
    row.appendChild(idCol);
    row.appendChild(genderCol);

    // Add row to table
    document.getElementById('students').appendChild(row);
  }

9. Now we can test our application. Open Git Bash anywhere and run mongod. Open Git Bash in your server project folder and run `node server.js`. Open Git Bash in your client project folder and run `node server.js`. Now in your browser go to `localhost:9000` and test out creating a student.

10. Now that you've created students, try refreshing that page. You'll notice that all the students you created don't show up anymore. So let's create a button that will get all the students when we click it. First add this to index.html

  <!-- Button that will trigger the get request when clicked -->
  <button id="getAllStudents">Get All Students</button>

11. Now in the `app.js` file, let's add a similar event listener to what was added to the create student form.

  /**
   * When the get students button is clicked, execute this code
   */
  document.getElementById('getAllStudents').addEventListener('click', function() {
    // Send get request to server for all students
    request.send({
      method: 'GET',
      url: 'http://localhost:8000/api/students',
    }, function(err, data) {
      if (err) {
        console.log(err);
      }

      // Print all student when we receive them
      replaceHTMLWithData(data);
    });
  });

12. You'll notice that at the end of the function we call replaceHTMLWithData(), let's also create that function (so we don't get any errors when we run it).

  /**
   * empties students table and adds all students to it
   * @param data {Array} array of student data
   */
  function replaceHTMLWithData (data) {
    // empty students table
    document.getElementById('students').innerHTML = '';

    // Loop through all students
    for (var i = 0; i < data.length; i++) {
      // Create row for new student
      var row = document.createElement('tr');
      // Create columns of attributes
      var nameCol = document.createElement('td');
      var ageCol = document.createElement('td');
      var idCol = document.createElement('td');
      var genderCol = document.createElement('td');

      // Set content of columns 
      nameCol.innerHTML = data[i].name;
      ageCol.innerHTML = data[i].age;
      idCol.innerHTML = data[i].id;
      genderCol.innerHTML = data[i].gender;

      // Add all columns to the row
      row.appendChild(nameCol);
      row.appendChild(ageCol);
      row.appendChild(idCol);
      row.appendChild(genderCol);

      // Add row to table
      document.getElementById('students').appendChild(row);
    }
  }

13. Remember all those Git Bash windows you had open? In the two windows running `node server.js`, press Ctrl+C twice and press `Up` and then `Enter`. Now go to `localhost:9000` again and test out our new button.
