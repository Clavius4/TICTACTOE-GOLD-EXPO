
const handleGameEnd = (message) => {
    setAlertMessage(message);
    
  };

  // Function to format the elapsed time in hours:minutes:seconds format
const formatElapsedTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsDisplay = remainingSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(remainingSecondsDisplay).padStart(2, "0")}`;

  return formattedTime;
};

// In your component, when you want to update the time_played in the database
// Function to update the time_played field in the database
const updateDatabaseWithTime = (newTime) => {
  db1.transaction((tx) => {
    tx.executeSql(
      'UPDATE game_stats SET time_played = ? WHERE id = 1',
      [newTime],
      (_, updateResults) => {
        if (updateResults.rowsAffected > 0) {
          // time_played updated successfully in the database
          console.log('Time played updated successfully:', newTime);
        }
      },
      (_, error) => {
        console.error('Error updating time_played:', error);
      }
    );
  });
};

// Function to save the recorded time to the database
const saveRecordedTimeToDatabase = () => {
  updateDatabaseWithTime(formatElapsedTime);
};


  const OnlineGamePlay = () => {
    console.warn("Online Game");
  }
  //Pressing function and toast message for alert.

  
  //Music Onrepeat
  useEffect(() => {
    const musicInterval = setInterval(() => {
      
      soundObject.getStatusAsync().then((status) => {
        if (status.isLoaded && status.didJustFinish) {
          
          loadAndPlayMusic();
        }
      });
    }, 1000); // Check every second

    // Load and play the music when the component mounts
    loadAndPlayMusic();

    return () => {
      clearInterval(musicInterval);
      soundObject.unloadAsync();
    };
  }, []);
  
  const showAlert = (title, message, buttons) => {
    Alert.alert(
      title,
      message,
      buttons,
      { cancelable: false }
    );
  };

  const startGame = () => {
    setMap(Array.from({ length: 10 }, () => Array(10).fill("")));
    setCurrentTurn("X");
  };

  useEffect(() => {
    // Timeout for the AI's turn
    setTimeout(() => {
      if (currentTurn === "O" && !isHumanWinner) {
        if (gameMode === "BOT_EASY") {
          botTurn("BOT_EASY");
        } else if (gameMode === "BOT_MEDIUM") {
          botTurn("BOT_MEDIUM");
        } else if (gameMode === "BOT_HARD") {
          botTurn("BOT_HARD");
        }
      }
    }, 500); // (milliseconds) timeout
  }, [currentTurn, gameMode]);

  // Function to start the timer
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevElapsedTime) => {
        // Calculate hours, minutes, and seconds
        const hours = Math.floor(prevElapsedTime / 3600);
        const remainingSeconds = prevElapsedTime % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        // Increment the time by 1 second
        const newSeconds = (seconds + 1) % 60;
        const newMinutes = newSeconds === 0 ? minutes + 1 : minutes;
        const newHours = newMinutes === 60 ? hours + 1 : hours;

        // Return the updated time in seconds
        return newHours * 3600 + newMinutes * 60 + newSeconds;
      });
    }, 1000); // Update every second (1000 milliseconds)

    return intervalId; // Return the interval ID for later cleanup
  };

  useEffect(() => {
    // Start the timer when the component mounts
    const timerIntervalId = startTimer();

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timerIntervalId);
    };
  }, []);

  useEffect(() => {
    const winner = checkWinningState(map);
    if (winner) {
      // Displaying the winning message and handling the game result
      handleGameResult(winner);
    } else {
      // Checking for a draw
      const isDraw = checkDraw(map);
      if (isDraw) {
        showAlert("It's a DRAW!", "Do you want to restart the game?", [
          {
            text: "Restart",
            onPress: resetGame,
            style: "default",
          },
          {
            text: "Exit",
            onPress: exitGame,
            style: "cancel",
          },
        ]);
      }
    }
  }, [map]);


  //Checking the Winning State during the gameplay

 const checkWinningState = (board) => {
    // Checking each row for a winner.
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column <= 6; column++) {
        const symbol = board[row][column];
        if (symbol === "") {
          continue;
        }
  
        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (board[row][column + i] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }
  
        if (isWinningSequence) {
          return symbol; // Returning the winning player symbol
        }
      }
    }
  
    // Checking each column for a winner.
    for (let column = 0; column < 10; column++) {
      for (let row = 0; row <= 6; row++) {
        const symbol = board[row][column];
        if (symbol === "") {
          continue;
        }
  
        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (board[row + i][column] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }
  
        if (isWinningSequence) {
          return symbol; // Returning the winning player symbol
        }
      }
    }
  
    // Checking the main diagonal (top-left to bottom-right) for a winner.
    for (let row = 0; row <= 6; row++) {
      for (let column = 0; column <= 6; column++) {
        const symbol = board[row][column];
        if (symbol === "") {
          continue;
        }
  
        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (board[row + i][column + i] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }
  
        if (isWinningSequence) {
          return symbol; // Returning the winning player symbol
        }
      }
    }
  
    // Checking the secondary diagonal (top-right to bottom-left) for a winner.
    for (let row = 0; row <= 6; row++) {
      for (let column = 9; column >= 4; column--) {
        const symbol = board[row][column];
        if (symbol === "") {
          continue;
        }
  
        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (board[row + i][column - i] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }
  
        if (isWinningSequence) {
          return symbol; // Returning the winning player symbol
        }
      }
    }
  
    // If no winner found, return null
    return null;
  };
  
  
    const checkDraw = (board) => {
      // Checking if the board is full, indicating a draw
      return board.every((row) => row.every((cell) => cell !== ""));
    };
  
  
  
    //Handling alert messaging once the game is over for checking the winner
    let isHumanWinner = false;
    const handleGameResult = (winner) => {
  
  
      const formattedTime = formatElapsedTime(elapsedTime);
  
    // Update the database with the formatted recorded time
    saveRecordedTimeToDatabase(formattedTime);
  
    
   // Initialize the increments
   let gamesPlayedIncrement = 1;
   let gamesWonIncrement = 0;
   let gamesLostIncrement = 0;
   let gamesTiedIncrement = 0;
  
   // Check if the current player is 'X' (human player)
   if (winner === 'X') {
     gamesWonIncrement = 1;
   } else if (winner === 'O') {
     gamesLostIncrement = 1;
   } else {
     gamesTiedIncrement = 1;
   }
  
  
      db1.transaction((tx) => {
        tx.executeSql(
          'UPDATE game_stats SET games_played = games_played + ?, games_won = games_won + ?, games_lost = games_lost + ?, games_tied = games_tied + ? WHERE id = 1',
          [
            gamesPlayedIncrement,
            gamesWonIncrement,
            gamesLostIncrement,
            gamesTiedIncrement,
          ],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              // Statistics updated successfully
              console.log("Stats are updated");
            }
          },
         
        );
  
        tx.executeSql(
          'UPDATE game_stats SET games_played = games_played + ?, games_won = games_won + ?, games_lost = games_lost + ?, games_tied = games_tied + ? WHERE id = 1',
          [gamesPlayedIncrement, gamesWonIncrement, gamesLostIncrement, gamesTiedIncrement],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              // Statistics updated successfully
              // Now, calculate the win percentage
              tx.executeSql(
                'SELECT games_played, games_won FROM game_stats WHERE id = 1',
                [],
                (_, { rows }) => {
                  const { games_played, games_won } = rows.item(0);
                  const winPercentage = (games_won / games_played) * 100;
    
                  // Round the winPercentage to the nearest whole number
                  const roundedWinPercentage = Math.round(winPercentage);
    
                  // Update the win_percentage value in the database
                  tx.executeSql(
                    'UPDATE game_stats SET win_percentage = ? WHERE id = 1',
                    [roundedWinPercentage],
                    (_, updateResults) => {
                      if (updateResults.rowsAffected > 0) {
                        // Win percentage updated successfully
                      }
                    },
                    (_, error) => {
                      console.error('Error updating win percentage:', error);
                    }
                  );
    
                  // Now, you can use the roundedWinPercentage value as needed
                  console.log('Win Percentage:', roundedWinPercentage);
                },
                (_, error) => {
                  console.error('Error calculating win percentage:', error);
                }
              );
            }
          },
          (tx, error) => {
            console.error('Error updating game statistics:', error);
          }
        );
  
        tx.executeSql(
          'UPDATE game_stats SET max_win_in_a_row = ? WHERE id = 1',
          [maxWinInARow],
          (_, updateResults) => {
            if (updateResults.rowsAffected > 0) {
              // maxWinInARow updated successfully in the database
            }
          },
          (_, error) => {
            console.error('Error updating maxWinInARow:', error);
          }
        );
  
  
      });
  
      
      // Update other statistics as needed (gamesPlayed, gamesWon, gamesTied, etc.)
  
      showAlert(`Player ${winner} wins!`, "Do you want to restart the game?", [
        {
          text: "Restart",
          onPress: () => {
            resetGame();
            isHumanWinner = false; // Reset the flag
          },
          style: "default",
        },
        {
          text: "Exit",
          onPress: () => {
            exitGame();
            isHumanWinner = false; // Reset the flag
          },
          style: "cancel",
        },
      ]);
    
      isHumanWinner = true; // Set the flag to true
    };
    
  
  
     //Clearing up the board to be empty for the game Restart
     const resetGame = () => {
      startGame();
    };
  
    const exitGame = () => {
      navigation.navigate("HomePage");
    };
  
  
    // Define a variable to track the AI's moves in progress
  let aiMovesInProgress = [];
  
  // Function to check if the AI has moves in progress
  const AIHasMovesInProgress = () => {
    return aiMovesInProgress.length > 0;
  };
  
  // Function to build upon previous AI moves
  const buildUponPreviousMoves = () => {
   
    if (aiMovesInProgress.length > 50) {
      return aiMovesInProgress.pop();
    } else {
      // If no moves in progress, you can implement a default behavior.
      // For example, choose the center cell if it's empty.
      const centerRow = Math.floor(10 / 2);
      const centerCol = Math.floor(10 / 2);
  
      if (map[centerRow][centerCol] === "") {
        return { row: centerRow, col: centerCol };
      } 
      else {
        // If the center cell is occupied, choose any available empty cell.
        const emptyCells = [];
        map.forEach((row, rowIndex) => {
          row.forEach((cell, columnIndex) => {
            
            if (cell === "") {
              emptyCells.push({ row: rowIndex, col: columnIndex });
            }
          });
        });
        
        if (emptyCells.length > 50) {
          return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
      }
    }
  };
  
  
  
    //AI moves and gameplay tracking
  
    const botTurn = (difficulty) => {
      // Collecting all possible options
      const possiblePositions = [];
      map.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          if (cell === "") {
            possiblePositions.push({ row: rowIndex, col: columnIndex });
          }
        });
      });
    
      let chosenOption;
  
      if (difficulty === "BOT_EASY") {
        // Collect all empty cells
        const emptyCells = [];
        map.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                if (cell === "") {
                    emptyCells.push({ row: rowIndex, col: columnIndex });
                }
            });
        });
    
        // Check if there's a winning move for the bot
        for (const cell of emptyCells) {
            const { row, col } = cell;
            const mapCopy = copyBoard(map);
            mapCopy[row][col] = "O";
    
            if (checkWinningState(mapCopy) === "O") {
                onPress(row, col);
                return; // Make the winning move
            }
        }
    
        // Check if there's a winning move for the player (to block it)
        for (const cell of emptyCells) {
            const { row, col } = cell;
            const mapCopy = copyBoard(map);
            mapCopy[row][col] = "X";
    
            if (checkWinningState(mapCopy) === "X") {
                onPress(row, col);
                return; // Block the player's winning move
            }
        }
    
        // Check if the AI has any moves in progress to build upon
        if (AIHasMovesInProgress()) {
            chosenOption = buildUponPreviousMoves();
        }
    
        // If no winning moves, moves to build upon, choose a strategic move
        if (!chosenOption) {
            // Example of a strategic move: Choose the center cell if available
            const centerCell = emptyCells.find(
                (cell) => cell.row === 1 && cell.col === 1
            );
            if (centerCell) {
                chosenOption = centerCell;
            } else {
                // If center cell is not available, choose the first empty cell
                chosenOption = emptyCells[0];
            }
        }
    
        if (chosenOption) {
            onPress(chosenOption.row, chosenOption.col);
        }
    }
    
      if (difficulty === "BOT_MEDIUM") {
        // Attack
        // First, check for a winning move (offensive)
      possiblePositions.forEach((possiblePosition) => {
        const mapCopy = copyBoard(map);
    
        // Simulating an attack by the bot
        mapCopy[possiblePosition.row][possiblePosition.col] = "O";
    
        // Check if this move creates an opportunity to win in the next turn
        if (checkWinningOpportunity(mapCopy, possiblePosition)) {
          chosenOption = possiblePosition;
          return; // Exit the loop early
        }
      });
    
      // If no winning move found, check for a move to block the human player's win (defensive)
      if (!chosenOption) {
        possiblePositions.forEach((possiblePosition) => {
          const mapCopy = copyBoard(map);
    
          // Simulating an attack by the opponent
          mapCopy[possiblePosition.row][possiblePosition.col] = "X";
    
          if (checkWinningState(mapCopy) === "X") {
            // Block the opponent's winning move
            chosenOption = possiblePosition;
            return; // Exit the loop early
          }
        });
      }
    
      // If neither an offensive nor a defensive move is found, check for blocking three Xs in a row
      if (!chosenOption) {
        possiblePositions.forEach((possiblePosition) => {
          const mapCopy = copyBoard(map);
    
          // Simulating an attack by the opponent
          mapCopy[possiblePosition.row][possiblePosition.col] = "X";
    
          // Check if this move blocks three Xs in a row
          if (checkThreeInARow(mapCopy, possiblePosition, "X")) {
            chosenOption = possiblePosition;
            return; // Exit the loop early
          }
        });
      }
    
      // If neither an offensive, defensive, nor a blocking move is found, choose a random move
      if (!chosenOption) {
        chosenOption =
          possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
      }
    
      if (chosenOption) {
        onPress(chosenOption.row, chosenOption.col);
      }
  
      }
      if (difficulty === "BOT_HARD") {
        // Initialize variables to track aggressive moves
        let aggressiveAttack = false;
        let aggressiveDefense = false;
    
        // Attack aggressively
        possiblePositions.forEach((possiblePosition) => {
            const mapCopy = copyBoard(map);
    
            // Simulating an aggressive attack by the bot
            mapCopy[possiblePosition.row][possiblePosition.col] = "O";
    
            // Check if this move creates an opportunity to win in the next turn
            if (checkWinningOpportunity(mapCopy, possiblePosition)) {
                chosenOption = possiblePosition;
                aggressiveAttack = true;
                return; // Exit the loop early
            }
        });
    
        // If no aggressive winning move found, defend aggressively
        if (!aggressiveAttack) {
            possiblePositions.forEach((possiblePosition) => {
                const mapCopy = copyBoard(map);
    
                // Simulating an aggressive attack by the opponent
                mapCopy[possiblePosition.row][possiblePosition.col] = "X";
    
                if (checkWinningState(mapCopy) === "X") {
                    // Block the opponent's winning move aggressively
                    chosenOption = possiblePosition;
                    aggressiveDefense = true;
                    return; // Exit the loop early
                }
            });
        }
    
        // If neither an aggressive offensive nor defensive move is found, check for blocking three Xs in a row
        if (!aggressiveAttack && !aggressiveDefense) {
            possiblePositions.forEach((possiblePosition) => {
                const mapCopy = copyBoard(map);
    
                // Simulating an attack by the opponent
                mapCopy[possiblePosition.row][possiblePosition.col] = "X";
    
                // Check if this move blocks three Xs in a row
                if (checkThreeInARow(mapCopy, possiblePosition, "X")) {
                    chosenOption = possiblePosition;
                    return; // Exit the loop early
                }
            });
        }
    
        // If still no aggressive move is found, choose a semi-aggressive move
        if (!chosenOption) {
            possiblePositions.forEach((possiblePosition) => {
                const mapCopy = copyBoard(map);
    
                // Simulating a semi-aggressive attack by the bot
                mapCopy[possiblePosition.row][possiblePosition.col] = "O";
    
                // Check if this move creates an opportunity to win in the next turn
                if (checkWinningOpportunity(mapCopy, possiblePosition)) {
                    chosenOption = possiblePosition;
                    return; // Exit the loop early
                }
            });
        }
    
        // If no aggressive move is found, choose a random move
        if (!chosenOption) {
            chosenOption =
                possiblePositions[Math.floor(Math.random() * possiblePositions.length)];
        }
    
        if (chosenOption) {
            onPress(chosenOption.row, chosenOption.col);
        }
    }
    
    };
  
    const chooseStrategicMove = (emptyCells, symbol) => {
      // Check for vertical, horizontal, and diagonal alignments
      for (const cell of emptyCells) {
        const { row, col } = cell;
        const mapCopy = copyBoard(map);
        mapCopy[row][col] = symbol;
    
        if (checkAlignment(mapCopy, symbol)) {
          return cell;
        }
      }
    
      // If no strategic move is found, return a random move.
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    };
    
    const checkAlignment = (map, symbol) => {
      // Check for horizontal alignment
      if (checkHorizontal(map, symbol)) return true;
    
      // Check for vertical alignment
      if (checkVertical(map, symbol)) return true;
    
      // Check for diagonal alignment
      if (checkDiagonal(map, symbol)) return true;
    
      return false;
    };
    
    const checkHorizontal = (map, symbol) => {
      for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length - 2; col++) {
          if (
            map[row][col] === symbol &&
            map[row][col + 1] === symbol &&
            map[row][col + 2] === ""
          ) {
            return true;
          }
        }
      }
      return false;
    };
    
    const checkVertical = (map, symbol) => {
      for (let row = 0; row < map.length - 2; row++) {
        for (let col = 0; col < map[row].length; col++) {
          if (
            map[row][col] === symbol &&
            map[row + 1][col] === symbol &&
            map[row + 2][col] === ""
          ) {
            return true;
          }
        }
      }
      return false;
    };
    
    const checkDiagonal = (map, symbol) => {
      for (let row = 0; row < map.length - 2; row++) {
        for (let col = 0; col < map[row].length - 2; col++) {
          if (
            map[row][col] === symbol &&
            map[row + 1][col + 1] === symbol &&
            map[row + 2][col + 2] === ""
          ) {
            return true;
          }
        }
      }
      return false;
    };
    
    const minimax = (board, player, depth, alpha, beta) => {
      const winner = checkWinningState(board);
    
      if (winner === "X") {
        return { score: -1 };
      } else if (winner === "O") {
        return { score: 1 };
      } else if (winner === null || depth === 0) {
        return { score: 0 };
      }
    
      const possibleMoves = generatePossibleMoves(board);
    
      if (player === "O") {
        let bestScore = -Infinity;
        let bestMove = null;
    
        for (const move of possibleMoves) {
          // Make the move on the board (temporarily)
          const [row, col] = move;
          board[row][col] = "O";
    
          // Recursively call minimax for the opponent (switch player)
          const result = minimax(board, "X", depth - 1, alpha, beta);
          const score = result.score;
    
          // Undo the move (backtrack)
          board[row][col] = "";
    
          // Update bestScore and bestMove based on opponent's score
          if (score > bestScore) {
            bestScore = score;
            bestMove = move;
          }
    
          // Implement alpha-beta pruning here
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break; // Beta cut-off
          }
        }
    
        return { score: bestScore, move: bestMove };
      } else {
        let bestScore = Infinity;
        let bestMove = null;
    
        for (const move of possibleMoves) {
          // Make the move on the board (temporarily)
          const [row, col] = move;
          board[row][col] = "X";
    
          // Recursively call minimax for the opponent (switch player)
          const result = minimax(board, "O", depth - 1, alpha, beta);
          const score = result.score;
    
          // Undo the move (backtrack)
          board[row][col] = "";
    
          // Update bestScore and bestMove based on opponent's score
          if (score < bestScore) {
            bestScore = score;
            bestMove = move;
          }
    
          // Implement alpha-beta pruning here
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) {
            break; // Alpha cut-off
          }
        }
    
        return { score: bestScore, move: bestMove };
      }
    };
    
   
    // Implement a function to generate possible moves for the 10x10 grid
    const generatePossibleMoves = (board) => {
      const moves = [];
    
      // Iterate through the board to find empty cells and add them to the moves array
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (board[row][col] === "") {
            moves.push([row, col]);
          }
        }
      }
    
      return moves;
    };
    
    
    // Helper function to check if there are three Xs in a row
    const checkWinningOpportunity = (map, position) => {
      const row = position.row;
      const col = position.col;
    
      // Simulating an attack by the bot
      map[row][col] = "O";
    
      // Checking if this move results in a win for the bot
      if (checkWinningState(map) === "O") {
        return true; // It creates an opportunity for the bot to win
      }
    
      return false; // It doesn't create a winning opportunity
    };
  
    const restartGame = (gameMode) => {
      // Create a new game board and set the game mode
      setMap(Array.from({ length: 10 }, () => Array(10).fill("")));
      setCurrentTurn("X");
      setGameMode(gameMode);
    
      // If the next turn is for the bot, trigger its move based on the selected game mode
      if (gameMode === "BOT_EASY") {
        setTimeout(() => {
          botTurn("BOT_EASY");
        }, 500); // (milliseconds) timeout for BOT_EASY
      } else if (gameMode === "BOT_MEDIUM") {
        setTimeout(() => {
          botTurn("BOT_MEDIUM");
        }, 500); // (milliseconds) timeout for BOT_MEDIUM
      } else if (gameMode === "BOT_HARD") {
        setTimeout(() => {
          botTurn("BOT_HARD");
        }, 500); // (milliseconds) timeout for BOT_HARD
      }
    };
    
  const checkThreeInARow = (map, position, symbol) => {
    const row = position.row;
    const col = position.col;
    const rowCount = map.length;
    const colCount = map[0].length;
  
    // Checking horizontally
    let count = 0;
    for (let i = 0; i < colCount; i++) {
      if (map[row][i] === symbol) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  
    // Checking vertically
    count = 0;
    for (let i = 0; i < rowCount; i++) {
      if (map[i][col] === symbol) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  
    // Checking diagonally (both directions)
    count = 0;
    for (let i = -2; i <= 2; i++) {
      if (
        row + i >= 0 &&
        row + i < rowCount &&
        col + i >= 0 &&
        col + i < colCount &&
        map[row + i][col + i] === symbol
      ) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  
    count = 0;
    for (let i = -2; i <= 2; i++) {
      if (
        row + i >= 0 &&
        row + i < rowCount &&
        col - i >= 0 &&
        col - i < colCount &&
        map[row + i][col - i] === symbol
      ) {
        count++;
        if (count === 3) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  
    return false;
  };
  
  
  const checkTwoInARow = (map, position, symbol) => {
    const row = position.row;
    const col = position.col;
    const rowCount = map.length;
    const colCount = map[0].length;
  
    // Checking horizontally
    if (
      (col > 0 && map[row][col - 1] === symbol) && // Left side blocked
      (col < colCount - 1 && map[row][col + 1] === symbol) // Right side blocked
    ) {
      return true;
    }
  
    // Checking vertically
    if (
      (row > 0 && map[row - 1][col] === symbol) && // Above blocked
      (row < rowCount - 1 && map[row + 1][col] === symbol) // Below blocked
    ) {
      return true;
    }
  
    // Checking diagonally (both directions)
    if (
      // Diagonal from top-left to bottom-right blocked
      ((row > 0 && col > 0 && map[row - 1][col - 1] === symbol) && 
      (row < rowCount - 1 && col < colCount - 1 && map[row + 1][col + 1] === symbol)) ||
  
      // Diagonal from top-right to bottom-left blocked
      ((row > 0 && col < colCount - 1 && map[row - 1][col + 1] === symbol) && 
      (row < rowCount - 1 && col > 0 && map[row + 1][col - 1] === symbol))
    ) {
      return true;
    }
  
    return false;

    const db1 = SQLite.openDatabase('tic.db');

    
  // Function to fetch data from the database
  const fetchGameData = () => {
    db1.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM game_stats WHERE id = 1',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const row = results.rows.item(0);
            // Update the state variables with retrieved data
            setGamesPlayed(row.games_played);
            setGamesWon(row.games_won);
            setGamesLost(row.games_lost);
            setGamesTied(row.games_tied);
            setWinPercentage(row.win_percentage);
            setMaxWinInARow(row.max_win_in_a_row);
            setMinVictoryTime(row.min_victory_time);
            setTimePlayed(row.time_played);
          }
        },
        (tx, error) => {
          console.error('Error fetching game data from the database:', error);
        }
      );
    });
  };

  useEffect(() => {
    // Fetch data from the database when the component mounts
    fetchGameData();
  }, []);

    {/* <View style={styles.text}>
      <Text style={styles.text}>Elapsed Time: {formatElapsedTime(elapsedTime)} seconds</Text>
    </View> */}


    function makeAIMove(board, player) {
          const availableMoves = [];
          for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
              if (board[row][col] === "") {
                availableMoves.push([row, col]);
              }
            }
          }
        
          if (availableMoves.length === 0) {
            return; // No available moves
          }
        
          const randomIndex = Math.floor(Math.random() * availableMoves.length);
          const [row, col] = availableMoves[randomIndex];
          board[row][col] = player;
          return [row, col]; // Return the move for later reference
        }
        

        function makeAIMove(board, player) {
          const opponent = player === "X" ? "O" : "X";
        
          // First, check for a winning move for the AI
          for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
              if (board[row][col] === "") {
                // Simulate placing AI's piece at [row, col] and check for a win
                board[row][col] = player;
                if (checkWin(board, player)) {
                  return [row, col]; // This is a winning move for the AI
                }
                board[row][col] = ""; // Reset the board
              }
            }
          }
        
          // Second, check for a blocking move for the opponent
          for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
              if (board[row][col] === "") {
                // Simulate placing the opponent's piece at [row, col] and check for a win
                board[row][col] = opponent;
                if (checkWin(board, opponent)) {
                  board[row][col] = player; // Block the opponent's winning move
                  return [row, col];
                }
                board[row][col] = ""; // Reset the board
              }
            }
          }
        
          // If no winning or blocking moves, make a random move
          const availableMoves = [];
          for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
              if (board[row][col] === "") {
                availableMoves.push([row, col]);
              }
            }
          }
        
          if (availableMoves.length === 0) {
            return; // No available moves
          }
        
          const randomIndex = Math.floor(Math.random() * availableMoves.length);
          const [row, col] = availableMoves[randomIndex];
          board[row][col] = player;
          return [row, col]; // Return the move for later reference
        }

        useEffect(() => {
          if (currentTurn === 'O') {
            // AI's turn
        
            // Determine which AI function to use based on the game level
            let aiMove;
            if (gameMode === 'BOT_EASY') {
              aiMove = getAiMove(map, 'O');
            } else if (gameMode === 'BOT_MEDIUM') {
              aiMove = getAiMove(map, 'O');
            } else if (gameMode === 'BOT_HARD') {
              aiMove = getAiMove(map, 'O');
            }
        
            if (aiMove) {
              const [row, col] = aiMove;
              const updatedMap = [...map];
              updatedMap[row][col] = 'O';
              setMap(updatedMap);
        
              if (checkWin(updatedMap, 'O')) {
                setGameOver(true);
                showAlert('AI wins!', 'Restart', 'Exit', resetGame, exitGame);
              } else if (isTie(updatedMap)) {
                setGameOver(true);
                showAlert('It\'s a tie!', 'Restart', 'Exit', resetGame, exitGame);
              }
              setCurrentTurn('X');
            }
          }
        }, [map, currentTurn, gameMode, setMap, checkWin, isTie, getAiMove, showAlert, resetGame, exitGame]);
        