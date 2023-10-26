export function checkWinOrDraw(map, currentTurn) {
    const size = map.length;
  
    const consecutiveCount = 5; // Number of consecutive Xs or Os needed to win
  
    // Check rows and columns
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Check rows
        if (
          j + consecutiveCount <= size &&
          Array.from({ length: consecutiveCount }, (_, index) => map[i][j + index]).every(cell => cell === currentTurn)
        ) {
          return currentTurn;
        }
  
        // Check columns
        if (
          i + consecutiveCount <= size &&
          Array.from({ length: consecutiveCount }, (_, index) => map[i + index][j]).every(cell => cell === currentTurn)
        ) {
          return currentTurn;
        }
      }
    }
  
    // Check diagonals
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        // Check diagonal from top-left to bottom-right
        if (
          i + consecutiveCount <= size &&
          j + consecutiveCount <= size &&
          Array.from({ length: consecutiveCount }, (_, index) => map[i + index][j + index]).every(cell => cell === currentTurn)
        ) {
          return currentTurn;
        }
  
        // Check diagonal from top-right to bottom-left
        if (
          i + consecutiveCount <= size &&
          j - consecutiveCount + 1 >= 0 &&
          Array.from({ length: consecutiveCount }, (_, index) => map[i + index][j - index]).every(cell => cell === currentTurn)
        ) {
          return currentTurn;
        }
      }
    }
  
    // Check for a draw
    let isDraw = true;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (map[i][j] === '') {
          isDraw = false;
          break;
        }
      }
    }
    if (isDraw) {
      return 'Draw';
    }
  
    return null;
  }
  