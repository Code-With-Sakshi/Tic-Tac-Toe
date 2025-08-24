
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; 
let gameActive = false; 
let mode = ""; 

const boardContainer = document.getElementById("board");
const statusText = document.getElementById("status");

// Hide status at the beginning
statusText.textContent = "";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function renderBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    if (cell !== "") div.classList.add("taken");
    div.addEventListener("click", () => makeMove(i));
    boardContainer.appendChild(div);
  });
}

function makeMove(i) {
  if (!gameActive || board[i] !== "") return;
  
  board[i] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    statusText.textContent = `😊 Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "😥 It's a Draw!";
    gameActive = false;
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  if (mode === "cpu" && currentPlayer === "O") {
    setTimeout(cpuMove, 500);
  }
}

function cpuMove() {
  if (!gameActive) return;

  let emptyCells = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  if (emptyCells.length === 0) return;

  let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(move);
}

function checkWinner() {
  return winPatterns.some(pattern => pattern.every(i => board[i] === currentPlayer));
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  renderBoard();
  statusText.textContent = `Player ${currentPlayer}'s Turn`;  
}

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame(); 
}

renderBoard();
