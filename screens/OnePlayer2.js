import * as React from "react";
import { useState, useEffect } from "react";
import { ToastProvider, useToast } from 'react-native-toast-message';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Pressable, Text, View, ImageBackground, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";


//copying the board
const copyBoard = (board) => {``
  return board.map((row) => [...row]);
};

export default function OnePlayer2() {

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
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);

  // Function to handle the level selection
  const handleLevelSelection = (level) => {
    setSelectedLevel(level);
    setIsLevelModalVisible(false);

    // Start the game once the level is selected
    startGame();
  };

  const showAlert = (title, message, buttons) => {
    Alert.alert(
      title,
      message,
      buttons,
      { cancelable: false }
    );
  };


   // Function to start the game
   const startGame = () => {
    setMap(Array.from({ length: 10 }, () => Array(10).fill("")));
    setCurrentTurn("X");
  };
  

  //Hooks for calling up states and props
  useEffect(() => {
    // Timeout for the AI's turn
    setTimeout(() => {
      if (currentTurn === "O") {
        botTurn();
      }
    }, 2000); // (2 seconds) timeout
  }, [currentTurn]);

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
    setMap(Array.from({ length: 10 }, () => Array(10).fill("")));
    setCurrentTurn("X");
  };

  const exitGame = () => {
    navigation.navigate("HomePage");
  };

  //AI moves and gameplay tracking

  const botTurn = () => {

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
        {/* <Text style={[styles.you]}>You</Text> */}
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
        {/* <Text style={[styles.you]}>Player</Text> */}
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
      </ImageBackground>
      </View>
      {/* <View style={styles.row4}>
        {currentTurn === 'X' ? (

<LinearGradient
style={styles.yourTurn}
locations={[0.47, 0.47, 1]}
colors={['#fff', '#444444', '#444444']} // Replace green with #444444
start={{ x: 1, y: 0 }} 
end={{ x: 0, y: 0 }}   
/>
) : (
<LinearGradient
style={styles.yourTurn}
locations={[0.47, 0.47, 1]}
colors={['#fff', '#444444', '#444444']} 
start={{ x: 1, y: 0 }} 
end={{ x: 0, y: 0 }}   
/>
)}



       <Text style={[styles.playersTurn, styles.youFlexBox]}>
        {currentTurn === "X" ? "Player 2 Turn" : "Player 1 Turn"}</Text>
      </View> */}
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

