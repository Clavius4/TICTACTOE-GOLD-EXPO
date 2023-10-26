import * as React from "react";
import { useState, useEffect } from "react";
import { ToastProvider, useToast } from 'react-native-toast-message';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, StyleSheet, Pressable, Text, View, ImageBackground, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";


import Amplify from "@aws-amplify/core";
import { Auth } from "aws-amplify";
import{ withAuthenticator } from "aws-amplify-react-native";
import config from "../screens/aws-exports";
 

Amplify.configure(config);



//copying the board
const copyBoard = (board) => {``
  return board.map((row) => [...row]);
};

function OnePlayer2() {

  //States and Props for the gameplay
  
  const [map, setMap] = useState([

    //Setting the map array of 10 rows for Initial Game Board

    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],

  ]);

  const [currentTurn, setCurrentTurn] = useState("X");
  const navigation = useNavigation();
  const [gameMode, setGameMode] = useState("BOT_MEDIUM");
  

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
      if (currentTurn === "O") {
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


  const OnlineGamePlay = () => {
    console.warn("Online Game");
  }
  //Pressing function and toast message for alert.
  const onPress = (rowIndex, columnIndex) => {
    if (map[rowIndex][columnIndex] !== "") {
      ToastAndroid.showWithGravityAndOffset(
        'Position Occupied..!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0,
        0,
      );
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      return updatedMap;
    });

    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };
 
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

  const handleGameResult = (winner) => {
    showAlert(`Player ${winner} wins!`, "Do you want to restart the game?", [
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
    let blockingMoveFound = false;

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
                blockingMoveFound = true;
                return; // Exit the loop early
            }
        });
    }

    // If neither an offensive nor a defensive move is found, check for blocking three Xs in a row
    if (!chosenOption && !blockingMoveFound) {
        possiblePositions.forEach((possiblePosition) => {
            const mapCopy = copyBoard(map);

            // Simulating an attack by the opponent
            mapCopy[possiblePosition.row][possiblePosition.col] = "X";

            // Check if this move blocks three Xs in a row
            if (checkThreeInARow(mapCopy, possiblePosition, "X")) {
                chosenOption = possiblePosition;
                blockingMoveFound = true;
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
};



 // UI of the game in JSX

  return (
    <ScreenWrapper>
    <View style={styles.twoplayer}>
      <View style={styles.row1}> 
      <Pressable
        style={styles.iconList}
        onPress={() => navigation.navigate("MenuDash")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/list.png")}
        />
      </Pressable>
      </View>
      <View style={[styles.row2, styles.group1]}> 
      <View style={[styles.column, styles.firstTwoColumns]}>
      <View style={styles.columnContent}>
        <Image
          style={[styles.p1Icon]}
          contentFit="contain"
          source={require("../assets/p1.png")}
        />
        </View>
        <View style={styles.columnContent}>
        </View>
      </View>
      <View style={[styles.column, styles.centeredColumn]}> 
      <Image
        style={[styles.vsIcon, styles.iconLayout]}
        contentFit="contain"
        source={currentTurn==="X"?
          require("../assets/vs1.png"): require("../assets/vs2.png")}
      />
      </View>
      <View style={[styles.column, styles.lastTwoColumns]}> 
      <View style={styles.columnContent}>
        <Image
          style={[styles.p1Icon]}
          contentFit="contain"
          source={require("../assets/AI.png")}
        />
        </View>
        <View style={styles.columnContent}>
        </View>
      </View>
        
      </View>
      <View style={[styles.row3]}> 
       <ImageBackground
       contentFit="contain"
      
      >
        <View style={styles.map}>
          {map.map((row, rowIndex)=>
          (<View style={styles.row}>
             {row.map((cell, columnIndex)=> 
             <Pressable onPress={()=> onPress(rowIndex, columnIndex)} 
             style={styles.cell} 
             key={`row-${columnIndex}-col-${rowIndex}`}>
              {cell==="X" && (    
                 <Image style={styles.icon2}
                   contentFit="cover"
                   source={require("../assets/x.png")}
                    />)}
          {cell==="O" && (     
          <Image
        style={styles.icon2}
        contentFit="cover"
        source={require("../assets/o.png")}
      />)}
             </Pressable>)}
          </View>
          ))}

        </View>

        <View style={styles.buttons}>
          <Text
            onPress={() => setGameMode("BOT_EASY")}
            style={[
              styles.button,
              { backgroundColor: gameMode === "BOT_EASY" ? "#4F5686" : "#EC7211" },
            ]}
          >
            EASY
          </Text>
          <Text
            onPress={() => setGameMode("BOT_MEDIUM")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === "BOT_MEDIUM" ? "#4F5686" : "#EC7211",
              },
            ]}
          >
            MEDIUM
          </Text>
          <Text
            onPress={() => setGameMode("BOT_HARD")}
            style={[
              styles.button,
              {
                backgroundColor:
                  gameMode === "BOT_HARD" ? "#4F5686" : "#EC7211",
              },
            ]}
          >
            HARD
          </Text>
        </View>
        
      </ImageBackground>
      </View>

    </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  youFlexBox: {
    textAlign: "center",
    color: Color.white,
  },
  groupLayout: {
    borderRadius: Border.br_81xl,
    height: 15,
    top: 10,
    position: "absolute",
  },
  pxfuel1Icon: {
    width: 430,
    height: 931,
    left: 0,
    top: 0,
    position: "absolute",
  },
  vsIcon: {
    height: "105%",
    width: "20%",
    top: "-10%",
  },
  p1Icon: {
    height: "56.07%",
    width: "69.77%",

    
  },
  p1Parent: {
    height: "12.8%",
    width: "15.64%",
    
  },
  p2Icon: {
    height: "56.07%",
    width: "69.77%",
    
  },
  icon: {
    height: "100%",
    width: "100%",
   
  },
  icon2: {
    height: "85%",
    width: "85%",
  },
  iconList: { //MenuDash
    width: "9%",
    height: "40%",
    flexDirection: "row",
  },
  map: {
    borderColor: "gold",
    borderWidth: 3,
    width:"100%",
    aspectRatio: 0.95,
     marginTop: "1.5%",
     backgroundColor: Color.white,

  },
  groupChild: {
    height: "66%",
    width: "93.2%",
 
  },
  you: {
    fontFamily: FontFamily.archivoBlackRegular,
    fontSize: 16,
    textAlign: "center",
    color: Color.white,
    top: "-80%",

  },
  yourTurn: {
    alignSelf: 'center',
    borderRadius: 50,
    width: "85%",
    height: "10%",
    backgroundColor: "transparent",
  },
  player: {
    fontFamily: FontFamily.archivoBlackRegular,
    letterSpacing: 0.7,
    fontSize: 16,
    textAlign: "center",
    color: Color.white,
  },

  groupItem: {
    backgroundColor: Color.gray,
    width: 188,
    left: 0,
  },
  groupInner: {
    left: 133,
    width: 187,
    backgroundColor: Color.white,
  },
  rectangleParent: {
   
  },
  playersTurn: {
    fontSize: FontSize.size_base,
    fontWeight: "500",
    fontFamily: FontFamily.dMSansMedium,
    marginTop: "5%",
  },

  row4: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  row3: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  row2: {
    flex: 0.2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  row1: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "flex-end", // Aligning items to the right
    alignItems: "flex-start", // Aligning items to the top
    paddingRight: 10, // Adjusting the right padding for spacing
    paddingTop: 28, // Adjusting the top padding for spacing
  },
  row: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  firstTwoColumns: {
    flex: 1,
    marginRight: "auto",

  },
  lastTwoColumns: {
    flex: 1,
    marginLeft: "auto",

  },
  columnContent: {
    alignItems: "center",

  },
  centeredColumn: {
    flex: 1,
    alignItems: "center",
  },
  column: {
    flex: 1,
    flexDirection: "column",
  },

  buttons: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    borderRadius: 70,
    paddingHorizontal: "13%",
    bottom: -70,
  },
  button: {
    color: "white",
    margin: 10,
    fontSize: 16,
    backgroundColor: "#191F24",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  cell: {
    flex: 1,
    borderColor: "gold",
    borderWidth: 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  twoplayer: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  image:{
    width:'20%',
    height:'20%',
  }
});

export default withAuthenticator(OnePlayer2);