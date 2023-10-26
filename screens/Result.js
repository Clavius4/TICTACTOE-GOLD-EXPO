// AIFunctions.js

function checkWin(board, player) {
    // Check rows
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j <= 10 - 5; j++) {
        if (
          board[i].slice(j, j + 5).every((cell) => cell === player)
        ) {
          return true;
        }
      }
    }
  
    // Check columns
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j <= 10 - 5; j++) {
        if (
          board.slice(j, j + 5).every((row) => row[i] === player)
        ) {
          return true;
        }
      }
    }
  
    // Check diagonals
    for (let i = 0; i <= 10 - 5; i++) {
      for (let j = 0; j <= 10 - 5; j++) {
        if (
          Array.from({ length: 5 }, (_, k) => board[i + k][j + k]).every(
            (cell) => cell === player
          )
        ) {
          return true;
        }
        if (
          Array.from({ length: 5 }, (_, k) => board[i + k][j + 5 - k]).every(
            (cell) => cell === player
          )
        ) {
          return true;
        }
      }
    }
  
    return false;
  }
  
  function isTie(board) {
    for (let row of board) {
      for (let cell of row) {
        if (cell === "") {
          return false;
        }
      }
    }
    return true;
  }
  
  function makeRandomMove(board) {
    const availableMoves = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          availableMoves.push([row, col]);
        }
      }
    }
  
    if (availableMoves.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
    return null; // No available moves
  }
  

  function makeEasyMove(board, player) {
    const opponent = player === 'X' ? 'O' : 'X';
  
    // Check if AI can complete a win
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = player;
          if (checkWin(board, player)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // Block the opponent from winning if 2 Xs are aligned
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = opponent;
          if (checkWin(board, opponent)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // Implement a highly aggressive strategy to prioritize blocking over creating a winning move.
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = opponent;
          if (hasFourAdjacentX(board, row, col)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // If no specific moves are available, make a random move.
    return makeRandomMove(board);
  }
  

  function makeMediumMove(board, player) {
    const opponent = player === 'X' ? 'O' : 'X';
  
    // Check if AI can complete a win
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = player;
          if (checkWin(board, player)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // Block the opponent from winning if 3 Xs are aligned
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = opponent;
          if (checkWin(board, opponent)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // Implement a balanced strategy to prioritize creating a winning move over blocking.
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = player;
          if (hasThreeAdjacentX(board, row, col)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // If no specific moves are available, make a random move.
    return makeRandomMove(board);
  }
  
  // Helper function to check if there are two adjacent Xs
  function hasFourAdjacentX(board, row, col) {
    return (
      (col >= 1 && board[row][col - 1] === 'X') ||
      (col < 9 && board[row][col + 1] === 'X') ||
      (row >= 1 && board[row - 1][col] === 'X') ||
      (row < 9 && board[row + 1][col] === 'X')
    );
  }

  function hasThreeAdjacentX(board, row, col) {
    return (
      (col >= 2 && board[row][col - 1] === 'X' && board[row][col - 2] === 'X') ||
      (col < 8 && board[row][col + 1] === 'X' && board[row][col + 2] === 'X') ||
      (row >= 2 && board[row - 1][col] === 'X' && board[row - 2][col] === 'X') ||
      (row < 8 && board[row + 1][col] === 'X' && board[row + 2][col] === 'X')
    );
  }
  
  function hasTwoAdjacentX(board, row, col) {
    return (
      (col >= 1 && board[row][col - 1] === 'X' && board[row][col - 2] === 'X') ||
      (col < 9 && board[row][col + 1] === 'X' && board[row][col + 2] === 'X') ||
      (row >= 1 && board[row - 1][col] === 'X' && board[row - 2][col] === 'X') ||
      (row < 9 && board[row + 1][col] === 'X' && board[row + 2][col] === 'X')
    );
  }
  
  
  

  function makeHardMove(board, player) {
    const opponent = player === 'X' ? 'O' : 'X';
  
    // Check if AI can complete a win
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = player;
          if (checkWin(board, player)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // Block the opponent from winning if 3 Xs are aligned
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = opponent;
          if (checkWin(board, opponent)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // Implement a balanced strategy to prioritize creating a winning move over blocking.
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === '') {
          board[row][col] = player;
          if (hasThreeAdjacentX(board, row, col)) {
            return [row, col];
          }
          board[row][col] = ''; // Reset the board
        }
      }
    }
  
    // If no specific moves are available, make a random move.
    return makeRandomMove(board);
  }
  
  

  export { checkWin, isTie, makeEasyMove, makeMediumMove, makeHardMove };
  