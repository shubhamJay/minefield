const assert = require('assert');
const MineField = require('./mineField.js');
const gridSize = 10;

let test = {};
exports.test = test;

test["MineField.startGame should take first move and store it into playerLastPlayedMove"]= function(){
  let game =new MineField(gridSize);
  game.startGame(10);
  assert.equal(game.playerLastPlayedMove, 10);
};

test["MineField.updateCurrentMove should update current move in playerMoves and in playerLastMove"] = function(){
  let game =new MineField(gridSize);
  game.updateCurrentMove(10);
  assert.equal(game.playerLastPlayedMove, 10);
  assert.deepEqual(game.playerMoves,[10]);
  game.updateCurrentMove(45);
  assert.equal(game.playerLastPlayedMove, 45);
  assert.deepEqual(game.playerMoves,[10,45]);
};

test["MineField.generatePossibleMoves() should generate valid moves according to previous move"] = function() {
  let game = new MineField(gridSize);
  game.startGame(5);
  assert.deepEqual(game.currentPossibleMoves,[15]);
};

test["MineField.getValidMove should give next valid movec and update allPossibleMoves and currentValidMove"]= function(){
  let game = new MineField(gridSize);
  game.startGame(5);
  assert.deepEqual(game.previousPossibleMoves,[1,2,3,4,5,6,7,8,9,10,15]);
};

test["MineField.generateInitialPossibleMoves should generate all valid moves (from 1 to gridSize) for first step"] = function(){
  let game =new MineField(gridSize);
  game.generateInitialPossibleMoves();
  assert.deepEqual(game.previousPossibleMoves,[1,2,3,4,5,6,7,8,9,10]);
};


test["MineField.isGameOver should check that game is over"] = function(){
  let game = new MineField(gridSize);
  game.chances = 5;
  assert.ok(!game.isGameOver());

  game.chances = 0;
  assert.ok(game.isGameOver());
};

test["MineField.hasPlayerWon should check that has player won"] = function(){
  let game = new MineField(gridSize);
  game.playerMoves = [1,11,21,31,41,51,61,71,81,91];
  game.currentValidMove = 91;
  game.playerLastPlayedMove = 91;
  assert.ok(game.hasPlayerWon());

  game.playerMoves = [1,11,21,31,41,51,61,71,81];
  game.currentValidMove = 82;
  game.playerLastPlayedMove = 81;
  assert.ok(!game.hasPlayerWon());

  game.playerMoves = [1,11,21,31,41];
  game.currentValidMove = 41;
  game.playerLastPlayedMove = 41;
  assert.ok(!game.hasPlayerWon());
};
