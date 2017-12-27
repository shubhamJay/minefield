const MineField = function(gridSize) {
  this.gridSize = gridSize;
  this.currentValidMove = 0;
  this.currentValidMoves = [];
  this.playerLastPlayedMove = 1;
  this.chances = Math.ceil(gridSize/2);
  this.playerMoves = [];
  this.previousValidMoves = [];
};

MineField.prototype.generateInitialValidMoves = function () {
  let initialValidMoves =[];
  initialValidMoves.length = this.gridSize;
  initialValidMoves = initialValidMoves.fill('').map((ele,index)=>index+1);
  this.previousValidMoves = initialValidMoves;
};

MineField.prototype.startGame = function(playerFirstMove) {
  this.generateInitialValidMoves();
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
  let validMoves = this.generateValidMoves();
  this.currentValidMoves = validMoves;
  this.previousValidMoves = this.previousValidMoves.concat(validMoves);
  let number = Math.floor(Math.random() * validMoves.length);
  this.currentValidMove = validMoves[number];
  return this.currentValidMove;
};

MineField.prototype.generateValidMoves = function() {
  let lastMove = this.currentValidMove;
  let validMoves = [];
  validMoves.push(lastMove + this.gridSize);
  if (lastMove % this.gridSize != 0)validMoves.push(lastMove + 1);
  if (lastMove % this.gridSize != 1)validMoves.push(lastMove - 1);
  const checkIsGeneratedBefore = this.isRepeatedValidMove.bind(this);
  return validMoves.filter(checkIsGeneratedBefore);
};

MineField.prototype.isRepeatedValidMove = function(move) {
  return !this.previousValidMoves.includes(move);
};

MineField.prototype.isBomb = function() {
  return this.playerLastPlayedMove != this.currentValidMove
};

MineField.prototype.actionOnBomb = function() {
  --this.chances;
};

MineField.prototype.gameInPlay = function () {
  this.getValidMove();
};

MineField.prototype.isGameOver = function() {
  return !this.chances;
};

MineField.prototype.hasPlayerWon = function() {
  return this.playerLastPlayedMove > 90 && this.playerMoves.length > 9;
};

MineField.prototype.isFirstMove = function () {
  return this.playerMoves.length == 1;
};

module.exports = MineField;
