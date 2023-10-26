if (gameMode === "BOT_EASY" && currentTurn === "O") {
  // Implement AI logic for easy level (random moves)
  const emptyCells = [];
  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === "") {
        emptyCells.push([rowIndex, colIndex]);
      }
    });
  });
  if (emptyCells.length > 0) {
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    onPress(row, col); // Make the AI move
  }
}


if (gameMode === "BOT_MEDIUM" && currentTurn === "O") {
 
}

if (gameMode === "BOT_HARD" && currentTurn === "O") {
  // Implement AI logic for hard level (minimax algorithm)
  const [row, col] = minimax(map, "O").move;
  onPress(row, col); // Make the AI move
}

function minimax(board, player) {
  // Implement the minimax algorithm here
  // Evaluate the board and return the best move for the AI
}
