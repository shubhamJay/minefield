const readline = require('readline-sync');
const MineField = require('./MineField.js');

let game = new MineField(10);

const dataToDisplay = function(result){
  return {lastStepResult:result,
    nextValidMoves:game.currentValidMoves,
    playerPreviousMoves:game.playerMoves,
    playerChances:game.chances,
  };
};


const stopGame = function(){
  process.exit();
};

const executeResultCondition = function(currentMove,previousMessage) {
  if (game.isGameOver()) {
    console.log("you Lost!!!");
    stopGame();
  };
  if (game.hasPlayerWon(currentMove)) {
    console.log("you Won!!!");
    stopGame();
  };
  return previousMessage;
};

const executeCurrentMove = function(){
  if (game.isBomb()) {
    game.actionOnBomb();
    return dataToDisplay("bomb");
  } else {
    game.gameInPlay()
    return dataToDisplay("notBomb");
  };
};

const isFirstMove = function(move){
  return game.isFirstMove() && move <= 10;
}

const executeGame = function(){
  console.log("your move");
  let move = +readline.prompt();
  if (isNaN(move)) {
    console.log("give Valid number\n\n");
    executeGame();
  };
  let data = "";
  game.updateCurrentMove(move);
  if(isFirstMove(move)){
    game.startGame(move);
    data = dataToDisplay("notBomb");
  } else {
    data = executeCurrentMove();
  };
  data = executeResultCondition(move,data);
  console.log(data);
  executeGame();
};

const startGame = function(){
  executeGame();
};

exports.startGame = startGame;
