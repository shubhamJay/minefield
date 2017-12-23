const MindField = function(){
  this.currentValidMove = 0;
  this.playerLastPlayedMove = 0;
  this.playerMoves = [];
  this.previousValidMoves = [1,2,3,4,5,6,7,8,9];
};

MindField.prototype.startGame = function (playerFirstMove) {
  this.playerLastPlayedMove = playerFirstMove;
  this.playerMoves.push(playerFirstMove);
};

MindField.prototype.updateCurrentMove = function (move) {
  this.playerMoves.push(+move);
  this.playerLastPlayedMove = +move;
};

MindField.prototype.getValidMove = function () {
  let validMoves = this.generateValidMoves();
  this.previousValidMoves = this.previousValidMoves.concat(validMoves);
  let number =Math.floor(Math.random() * validMoves.length);
  this.currentValidMove = validMoves[number];
  return this.currentValidMove;
};

MindField.prototype.generateValidMoves = function () {
  let lastMove = this.playerLastPlayedMove;
  let validMoves =[];
  validMoves.push(lastMove+10);
  validMoves.push(lastMove+1);
  lastMove%10 == 0 ?validMoves.pop() :validMoves.push(lastMove-1);
  if(lastMove%10 == 1)validMoves.pop() ;
  const checkIsGeneratedBefore = this.isRepeatedValidMove.bind(this);
  return validMoves.filter(checkIsGeneratedBefore);
};

MindField.prototype.isRepeatedValidMove = function (move) {
  return !this.previousValidMoves.includes(move);
};

MindField.prototype.isGameOver = function () {
  return this.playerLastPlayedMove != this.currentValidMove;
};

MindField.prototype.hasPlayerWon = function () {
  return this.playerMoves.length >9 && this.playerLastPlayedMove > 90;
};

module.exports = MindField;
