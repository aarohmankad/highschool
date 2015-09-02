
/////////////////////////
// Server Dependencies //
/////////////////////////
var
  util = require('util'),
  io = require('socket.io'),
  Player = require('./Player').Player;

///////////////////////
// Game Dependencies //
///////////////////////
var
  socket,
  players;

/**
 * initialize game variables and dependencies
 */
function init() {
  players = [];

  socket = io.listen(8080);

  socket.configure(function() {
    socket.set("transports", ["websocket"]);
    socket.set("log level", 2);
  });

  setEventHandlers();
}

/**
 * set basic event handlers
 */
function setEventHandlers() {
  socket.sockets.on('connection', onSocketConnection);
}

/**
 * called when a client joins the game
 * adds event listeners on the player
 * @param client {Object} data on the player who just joined
 */
function onSocketConnection (client) {
  util.log('New player has connected:', client.id);

  client.on('disconnect', onClientDisconnect);
  client.on('new player', onNewPlayer);
  client.on('move player', onMovePlayer);
}

/**
 * called when a client leaves the game
 */
function onClientDisconnect() {
  util.log('Player has disconnected:', this.id);

  var removePlayer = findPlayerById(this.id);

  if (!removePlayer) {
    console.log('Player not found:', this.id);
    return false;
  }

  players.splice(players.indexOf(removePlayer), 1);
  this.broadcast.emit('remove player', {
    id: this.id,
  });
}

/**
 * called when a new player joins the game
 * only called once a game is set up for local player
 * @param data {Object} data on player who joined
 */
function onNewPlayer (data) {
  var newPlayer = new Player(data.x, data.y);
  newPlayer.id = this.id;

  this.broadcast.emit('new player', {
    id: newPlayer.id,
    x: newPlayer.getX(),
    y: newPlayer.getY(),
  });

  for (var i = 0; i < players.length; i++) {
    var existingPlayer = players[i];

    this.emit('new player', {
      id: existingPlayer.id,
      x: existingPlayer.getX(),
      y: existingPlayer.getY(),
    });
  };

  players.push(newPlayer);
}

/**
 * called when player moves
 * @param data {Object} data on player movement
 */
function onMovePlayer (data) {
  
}

/**
 * return player based on unique id
 * @param id {String} unique id for a player object
 * @return {Player}
 */
function findPlayerById (id) {
  for (var i = 0; i < players.length; i++) {
    if (id === players[i].id) {
      return players[i];
    }
  }

  return null;
}

// Initialize game and point user to "website"
init();
console.log('Magic happens on localhost:8080');
