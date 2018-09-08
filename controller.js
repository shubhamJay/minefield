const gridSize = 10;

const getBoard = function () {
  return document.getElementById("board");
};

const generateBoard = function(gridSize) {
  let board=getBoard();
  for (var rowNumber = 0; rowNumber < gridSize; rowNumber++) {
    row = board.insertRow();
    for (var cellNumber = 0; cellNumber < gridSize; cellNumber++) {
      numberOfCell = (rowNumber * gridSize) + cellNumber + 1;
      cell = row.insertCell();
      cell.id = numberOfCell;
      cell.innerText = numberOfCell;
    };
  };
};

const getPlayerMove = function() {
  return +event.target.id;
};

const displayMessage = function(message) {
  let messageBox = document.getElementById("messageBox");
  messageBox.innerText = message;
};

const resetBoard=function() {
  let board = getBoard();
  board.removeEventListener("click", executeGame);
  board.innerHTML = "";
};

const stopGame = function() {
  resetBoard();
  let restartButton = document.getElementById('restartButton');
  restartButton.className = "showButton";
};

const updateBoard = function(currentMove, color) {
  let currentMoveCell = document.getElementById(currentMove);
  currentMoveCell.style.backgroundColor = color;
};

const updateChance = function(chances){
  let chancesBox = document.getElementById("chanceBox");
  chancesBox.innerText = chances;
}
const hideStartButton = function(){
  let startButton = document.getElementById("startButton");
  startButton.className = "hideButton";
}

const showChances = function(){
  let chances = document.getElementById("chanceContainer");
  chances.className = "show";
}

// =============>>>>>>>> controller <<<<<<<<<<<<=============///////

const game = new MineField(gridSize);

const executeResultCondition = function(currentMove) {
  if (game.isGameOver()) {
    displayMessage("you lost");
    stopGame();
  };
  if (game.hasPlayerWon(currentMove)) {
    console.log("hii");
    displayMessage("you won");
    stopGame();
  };
  return;
};

const isFirstMove = function(currentMove) {
  return game.isFirstMove() && currentMove <= 10;
};

const executeCurrentMove = function(currentMove) {
  if (game.isBomb()) {
    updateBoard(currentMove, "red");
    updateChance(game.actionOnBomb());
  } else {
    game.gameInPlay();
  };
  return;
};

const executeGame = function() {
  let currentMove = getPlayerMove();
  game.updateCurrentMove(currentMove);
  updateBoard(currentMove, "green");
  if (isFirstMove(currentMove)) {
    game.startGame(currentMove);
  } else {
    executeCurrentMove(currentMove);
  };
  executeResultCondition(currentMove);
  return;
};

const restartGame = function(){
  document.location.reload();
};

const startGame = function() {
  hideStartButton()
  updateChance(game.chances)
  showChances()
  let board = getBoard();
  generateBoard(gridSize);
  board.addEventListener("click", executeGame);
};
