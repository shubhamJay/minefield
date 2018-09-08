const MineField = function(gridSize) {
  this.gridSize = gridSize;
  this.currentValidMove = 0;
  this.currentPossibleMoves = [];
  this.playerLastPlayedMove = 1;
  this.chances = Math.ceil(gridSize/2);
  this.playerMoves = [];
  this.previousPossibleMoves = [];
};

MineField.prototype.generateInitialPossibleMoves = function () {
  let initialPossibleMoves =[];
  initialPossibleMoves.length = this.gridSize;
  initialPossibleMoves = initialPossibleMoves.fill('').map((ele,index)=>index+1);
  this.previousPossibleMoves = initialPossibleMoves;
};

MineField.prototype.startGame = function(playerFirstMove) {
  this.generateInitialPossibleMoves();
  this.playerLastPlayedMove = playerFirstMove;
  this.currentValidMove = playerFirstMove;
  this.playerMoves.push(playerFirstMove);
  this.getValidMove();
};

MineField.prototype.updateCurrentMove = function(move) {
  this.playerMoves.push(move);
  this.playerLastPlayedMove = move;
};

MineField.prototype.getValidMove = function() {
  let possibleMoves = this.generatePossibleMoves();
  this.currentPossibleMoves = possibleMoves;
  this.previousPossibleMoves = this.previousPossibleMoves.concat(possibleMoves);
  let number = Math.floor(Math.random() * possibleMoves.length);
  this.currentValidMove = possibleMoves[number];
  return this.currentValidMove;
};

MineField.prototype.generatePossibleMoves = function() {
  let lastMove = this.currentValidMove;
  let possibleMoves = [];
  possibleMoves.push(lastMove + this.gridSize);
  if (lastMove % this.gridSize != 0)possibleMoves.push(lastMove + 1);
  if (lastMove % this.gridSize != 1)possibleMoves.push(lastMove - 1);
  const checkIsGeneratedBefore = this.isRepeatedPossibleMove.bind(this);
  return possibleMoves.filter(checkIsGeneratedBefore);
};

MineField.prototype.isRepeatedPossibleMove = function(move) {
  return !this.previousPossibleMoves.includes(move);
};

MineField.prototype.isBomb = function() {
  return this.playerLastPlayedMove != this.currentValidMove
};

MineField.prototype.actionOnBomb = function() {
  return --this.chances;
};

MineField.prototype.gameInPlay = function () {
  this.getValidMove();
};

MineField.prototype.isGameOver = function() {
  return !this.chances;
};

MineField.prototype.hasPlayerWon = function() {
  let lastRowStart = this.gridSize*(this.gridSize-1);
  return this.playerLastPlayedMove > lastRowStart && this.playerMoves.length > this.gridSize;
};

MineField.prototype.isFirstMove = function () {
  return this.playerMoves.length <= 1;
};

module.exports = MineField;
