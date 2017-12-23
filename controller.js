const generateBoard = function(){
  let sizeOfBoard = 10;
  let board = document.getElementById("board");
  for (var rowNumber = 0; rowNumber < sizeOfBoard; rowNumber++) {
    row = board.insertRow();
    for (var cellNumber = 0; cellNumber < sizeOfBoard ; cellNumber++) {
      numberOfCell = (rowNumber*10) + cellNumber+1;
      cell = row.insertCell();
      cell.id = numberOfCell;
      cell.innerText = numberOfCell;
    };
  };
};

const getPlayerMove = function(){
  return event.target.id;
};

const displayMessage = function(message){
  let messageBox = document.createElement("h1")
  messageBox.id = "messageBox";
  messageBox.innerText = message;
  let body = document.getElementById("gameBody");
  body.appendChild(messageBox);
  let board = document.getElementById("board");
  board.innerText = "";
};

const stopGame = function(){
  let body = document.getElementById("gameBody");
  body.removeEventListener("click",executeGame);
};

const updateBoard = function(currentMove,color){
  let currentMoveCell = document.getElementById(currentMove);
  currentMoveCell.style.backgroundColor = color;
};

const game = new MindField();

const executeGame = function(){
  let currentMove = getPlayerMove();
  game.getValidMove();
  game.updateCurrentMove(currentMove);
  if(game.playerMoves.length < 3) {
    updateBoard(currentMove,"green");
    return;
  };
  if(game.isGameOver()) {
    displayMessage("you lost");
    updateBoard(currentMove,"red");
    stopGame();
    return;
  };
  updateBoard(currentMove,"green");
  if(game.hasPlayerWon()){
    displayMessage("you won");
    stopGame();
    return;
  };
};

const startGame = function(){
  let body = document.getElementById("gameBody");
  body.addEventListener("click",executeGame);
};
