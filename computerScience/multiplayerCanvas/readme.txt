1. In your single player game folder, create a server javascript file called server.js.
   You can reference the server file in this project throughout the walkthrough

2. In the server.js file, set up your dependencies:
  
  /////////////////////////
  // Server Dependencies //
  /////////////////////////
  var
    util = require('util'),
    io = require('socket.io');

3. Then add your game variables (such as players and our socket object):

  ///////////////////////
  // Game Dependencies //
  ///////////////////////
  var
    socket,
    players;

4. Let's create an intializing function. This will be called when the server starts.

  /**
   * initialize game variables and dependencies
   */
  function init() {
    // Make our players an empty array when server starts
    players = [];

    // We want our app to run on port 8080 (this is just a common style)
    socket = io.listen(8080);

    // Configure the socket to use `websockets`; not super important
    socket.configure(function() {
      socket.set("transports", ["websocket"]);
      socket.set("log level", 2);
    });
  }

  Also, be sure to call init at the end of the server file!

  // Initialize game
  init();

5. We can now test the server at a basic level. In the Git Bash in your current directory, run:
  
  node server.js

  You should see 'socket.io started in your command line', this means it's working! Press Ctrl + C twice to exit the server program.

6. Now let's call the setEventHandler function at the end of the init function.
  
  // Call setEventHandlers function
  setEventHandlers();

7. Now create the setEventHandlers function in the server.js file.
  
  /**
   * set basic event handlers
   */
  function setEventHandlers() {
    // call onSocketConnection every time a player joins the game
    socket.sockets.on('connection', onSocketConnection);
  }

8. Now when a player/user connects to the server, we can catch that event and execute some code. 
   To do that, lets create the onSocketConnection function

  /**
   * called when a client joins the game
   * adds event listeners on the player
   * @param client {Object} data on the player who just joined
   */
  function onSocketConnection (client) {
    util.log('New player has connected:', client.id);

    // call onClientDisconnect when this player disconnects
    client.on('disconnect', onClientDisconnect);
   
    // call onNewPlayer when new player joins
    client.on('new player', onNewPlayer);
   
    // call onMovePlayer when this player moves
    client.on('move player', onMovePlayer);
  }

9. Now just create some placeholder functions (for onClientDisconnect, onNewPlayer, and onMovePlayer)
   so we don't get a null pointer.
  
  /**
   * called when a client leaves the game
   */
  function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
  }

  /**
   * called when a new player joins the game
   * only called once a game is set up for local player
   * @param data {Object} data on player who joined
   */
  function onNewPlayer(data) {

  }

  /**
   * called when player moves
   * @param data {Object} data on player movement
   */
  function onMovePlayer(data) {

  }

10. We need a model for a Player. What does being a Player mean (this is like a Player class in Java).
    Create a Player.js in the same folder as the server.js

  /**
   * Player object to store on server
   * @param startX {Object} starting x coord of player
   * @param startY {Object} starting y coord of player
   * @return {Object} Player Object
   */
  var Player = function (startX, startY) {
    var
      x = startX,
      y = startY,
      id;

    /**
     * @return {Integer} x coord of player
     */
    this.getX = function() {
      return x;
    }

    /**
     * @return {Integer} y coord of player
     */
    this.getY = function() {
      return y;
    }

    /**
     * set x coord of player
     * @param newX {Integer} new x coord for player
     */
    this.setX = function(newX) {
      x = newX;
    }

    /**
     * set y coord of player
     * @param newY {Integer} new y coord for player
     */
    this.setY = function(newY) {
      y = newY;
    }

    return this;
  }

  // exports.Player lets us `export` this file and create a player on any server instance
  exports.Player = Player;

11. Now we can import our new Player class in our server file. Add our player dependency 
    under Server Dependencies so it looks like this:

  /////////////////////////
  // Server Dependencies //
  /////////////////////////
  var
    util = require('util'),
    io = require('socket.io'),
    Player = require('./Player').Player;

12. Now that we have a Player model, we can create new players. Add the following code to 
    the onNewPlayer function in server.js

  // create a new player and assign it a unique id
  var newPlayer = new Player(data.x, data.y);
  newPlayer.id = this.id;

13. Once the player is created, we want to let all other players in the game know that there is a new player. 
    This is where socket.io can `broadcast` and `emit` the player data. Add the following code at the end 
    of the onNewPlayer function.

  // Let all other players know there is a new player
  // and send out new player's info.
  this.broadcast.emit('new player', {
    id: newPlayer.id,
    x: newPlayer.getX(),
    y: newPlayer.getY(),
  });

14. Now we need to receive existing players to our game, which currently only has our player in it.
  
  for (var i = 0; i < players.length; i++) {
    var existingPlayer = players[i];

    // Send all existing players to current game instance
    this.emit('new player', {
      id: existingPlayer.id,
      x: existingPlayer.getX(),
      y: existingPlayer.getY(),
    });
  };

    It's important to note that this.broadcast.emit send information to all clients except us and 
    this.emit only sends information to our current client.

15. Finally, push the new player to our players array so we can keep track of it at the end of 
    the onNewPlayer function.

  players.push(newPlayer);

16. This covers the server code for now. Let's create players client side so we can test all our code.
    Go to the index.html file and inject the socket.io file in our project. You can refer to the 
    index.html file in this folder to check if you did it correctly.

  <!-- Socket.io is served by our server file -->
  <script src="http://localhost:8080/socket.io/socket.io.js"></script>

17. Now open the game.js file and create a variable called `socket`, which we will use to control 
    our connection with the server.

  // canvas {Object} our canvas to draw on
  // context {Object} graphics that lets us draw
  // keys {Keys} controls state of key presses at any time
  // localPlayer {Player} our player object
  // socket {Socket} socket object that handles connection between client and server
  var
    canvas,
    context,
    keys,
    localPlayer,
    socket;

18. Add the following line to the end of the init function

  // Connect our client to our server port
  socket = io.connect('http://localhost', {
    port: 8080,
    transports: ['websocket'],
  });

19. Add the following to the bottom of the setEventHandlers function in game.js
  
  // call onSocketConnected when this player is connected
  socket.on('connect', onSocketConnected);
  
  // call onSocketDisconnect when this player disconnects
  socket.on('disconnect', onSocketDisconnect);
  
  // call onNewPlayer when a new player joins the game
  socket.on('new player', onNewPlayer);
  
  // call onMovePlayer when any player moves
  socket.on('move player', onMovePlayer);

  // call onRemovePlayer when any player leaves
  socket.on('remove player', onRemovePlayer);

    These should make sense to you, they are the same listeners that are on the server!

20. Add placeholder functions for all of these under the onResize function.
  
  /**
   * called when this player connects to the server
   */
  function onSocketConnected() {
    console.log('Connected to socket server');
  }

  /**
   * called when player disconnects from the server
   */
  function onSocketDisconnect() {
    console.log('Disconnected from socket server');
  }

  /**
   * called when a new player joins the game
   * @param data {Object} data of the new player
   */
  function onNewPlayer(data) {
    console.log('New player connected:', data.id);
  }

  /**
   * called when any player moves
   * @param data {Object} data on the player that moved
   */
  function onMovePlayer(data) {

  }

  /**
   * called when player is removed or leaves
   * @param data {Object} data on player being removed or leaving
   */
  function onRemovePlayer(data) {
    
  }

21. Now run `node server.js` in your project directory in Git Bash. You should see:
  
  socket.io started

    Now open the index.html file in your browser and go back to the Git Bash 
    (never close Git Bash! that will stop the server) and you should see:

  New player has connected: (player's unique id)