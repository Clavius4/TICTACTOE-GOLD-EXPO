 // Bounds checking to ensure valid indices
 if (
    rowIndex < 0 || rowIndex >= map.length ||
    columnIndex < 0 || columnIndex >= map[rowIndex].length
  ) {
    // Handle out-of-bounds indices or other validation as needed
    return;
  }
  // Handle player move, update the game board, and check for a winning state
  handlePlayerMove();
  

  const checkWinningState = () => {

    // Checking each row for a winner.
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column <= 6; column++) {
        const symbol = map[row][column];
        if (symbol === "") {
          continue;
        }
  
        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (map[row][column + i] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }
  
        if (isWinningSequence) {
          const message = `Player ${symbol} wins!`;
          showAlert(message, "Do you want to restart the game?", [
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
          return;
        }
      }
    }

     // Checking each column for a winner.
     for (let column = 0; column < 10; column++) {
      for (let row = 0; row <= 6; row++) {
        const symbol = map[row][column];
        if (symbol === "") {
          continue;
        }

        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (map[row + i][column] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }

        if (isWinningSequence) {
          const message = `Player ${symbol} wins!`;
          showAlert(message, "Do you want to restart the game?", [
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
          return;
        }
      }
    }

    
    // Checking the main diagonal (top-left to bottom-right) for a winner.
    for (let row = 0; row <= 6; row++) {
      for (let column = 0; column <= 6; column++) {
        const symbol = map[row][column];
        if (symbol === "") {
          continue;
        }

        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (map[row + i][column + i] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }

        if (isWinningSequence) {
          const message = `Player ${symbol} wins!`;
          showAlert(message, "Do you want to restart the game?", [
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
          return;
        }
      }
    }

    // Checking the secondary diagonal (top-right to bottom-left) for a winner.
    for (let row = 0; row <= 6; row++) {
      for (let column = 9; column >= 4; column--) {
        const symbol = map[row][column];
        if (symbol === "") {
          continue;
        }

        let isWinningSequence = true;
        for (let i = 1; i < 5; i++) {
          if (map[row + i][column - i] !== symbol) {
            isWinningSequence = false;
            break;
          }
        }

        if (isWinningSequence) {
          const message = `Player ${symbol} wins!`;
          showAlert(message, "Do you want to restart the game?", [
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
          return;
        }
      }
    }
  
    // Check for a draw.
    const isDraw = map.every((row) => row.every((cell) => cell !== ""));
    if (isDraw) {
      const message = "It's a DRAW!";
      showAlert(message, "Do you want to restart the game?", [
        {
          text: "Restart",
          onPress: resetGame,
          style: "default",
        },
        {
          text: "Exit",
          onPress: exitGame,
          style: "cancel",
        }
      ]);
    }

    
  };

  
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [musicMuted, setMusicMuted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  // const backgroundMusic = require('../assets/audio/game1.mp3');


  import * as React from "react";
import { useState, useEffect } from "react";
import { ToastProvider, useToast } from 'react-native-toast-message';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Pressable, Text, View, ImageBackground, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import TokenSelectionScreen from "../screens/TokenSelection"
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

export default function TwoPlayer2(){

  //Setting the map array of 10 rows for Initial Game Board
  const  [map, setMap] = useState([   


    ["", "", "", "", "", "", "", "", "", ""], // 1st row
    ["", "", "", "", "", "", "", "", "", ""], // 2nd row
    ["", "", "", "", "", "", "", "", "", ""], // 3rd row
    ["", "", "", "", "", "", "", "", "", ""], // 4th row
    ["", "", "", "", "", "", "", "", "", ""], // 5th row
    ["", "", "", "", "", "", "", "", "", ""], // 6th row
    ["", "", "", "", "", "", "", "", "", ""], // 7th row
    ["", "", "", "", "", "", "", "", "", ""], // 8th row
    ["", "", "", "", "", "", "", "", "", ""], // 9th row
    ["", "", "", "", "", "", "", "", "", ""], // 10th row

  ]); 

  const [currentTurn, setCurrentTurn] = useState(null); // The current player's token (X or O)
  const [showTokenSelection, setShowTokenSelection] = useState(true); // Control whether to show the token selection modal
  const navigation = useNavigation();

  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [musicMuted, setMusicMuted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  // const backgroundMusic = require('../assets/audio/game1.mp3');
 
  const showAlert = (title, message, buttons) => {
    Alert.alert(
      title,
      message,
      buttons,
      { cancelable: false }
    );
  };

  // Function to handle player's move
  const handlePlayerMove = () => {
    // Debugging: Log the value of currentTurn
    console.log("Current turn before update:", currentTurn);
  
    // Toggle between "X" and "O"
    setCurrentTurn(currentTurn === "X" ? "O" : "X");
  };
  
  const resetGame = () => {
    // Implementing map to reset the game state.

    setMap([   


      ["", "", "", "", "", "", "", "", "", ""], // 1st row
      ["", "", "", "", "", "", "", "", "", ""], // 2nd row
      ["", "", "", "", "", "", "", "", "", ""], // 3rd row
      ["", "", "", "", "", "", "", "", "", ""], // 4th row
      ["", "", "", "", "", "", "", "", "", ""], // 5th row
      ["", "", "", "", "", "", "", "", "", ""], // 6th row
      ["", "", "", "", "", "", "", "", "", ""], // 7th row
      ["", "", "", "", "", "", "", "", "", ""], // 8th row
      ["", "", "", "", "", "", "", "", "", ""], // 9th row
      ["", "", "", "", "", "", "", "", "", ""], // 10th row
  
    ]); 
    setCurrentTurn("X");
  
  };

  const exitGame = () => {
      // Navigating back to the menu screen
    navigation.navigate("HomePage");
  };

  const onPress = (rowIndex, columnIndex) => {
    console.log("onPress called");
  
    if (map[rowIndex][columnIndex] !== "") {
      // Display a message or take appropriate action for an already occupied position
      ToastAndroid.showWithGravityAndOffset(
        'Position Occupied..!',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
        0,
        0
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
        <Text style={[styles.you]}>You</Text>
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
          source={require("../assets/p1.png")}
        />
        </View>
        <View style={styles.columnContent}>
        <Text style={[styles.you]}>Player</Text>
        </View>
      </View>
        
      </View>
      <View style={[styles.row3]}> 
       <ImageBackground
       contentFit="contain"
      
      >
        <View style={styles.map}>
          {map.map((row, rowIndex)=>
          (<View style={styles.row} key={`row-${rowIndex}`}>
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
      {showTokenSelection ? (
  <TokenSelectionScreen onSelectToken={(token) => setCurrentTurn(token)} />
) : (
  <React.Fragment>
    <Text>Current Turn: {currentTurn}</Text>
    <View style={styles.gameBoard}>
      {map.map((row, rowIndex) => (
        <View style={styles.row} key={`row-${rowIndex}`}>
          {row.map((cell, columnIndex) => (
            <Pressable
              onPress={() => onPress(rowIndex, columnIndex)}
              style={styles.cell}
              key={`row-${columnIndex}-col-${rowIndex}`}
            >
              {cell === 'X' && (
                <Image
                  style={styles.icon2}
                  contentFit="cover"
                  source={require('../assets/x.png')}
                />
              )}
              {cell === 'O' && (
                <Image
                  style={styles.icon2}
                  contentFit="cover"
                  source={require('../assets/o.png')}
                />
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
    <Button title="Reset Game" onPress={resetGame} />
    <Button title="Exit Game" onPress={exitGame} />
  </React.Fragment>
)}

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
    top: "-20%",
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

//DATABASE HANDLING

const db1 = SQLite.openDatabase('tic.db');

// Function to initialize the database and create tables if they don't exist
function initializeDatabase() {
    db1.transaction((tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS game_stats (' +
          'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          'games_played INTEGER,' +
          'games_won INTEGER,' +
          'games_lost INTEGER,' + // Add the new column "games_lost"
          'games_tied INTEGER,' +
          'win_percentage REAL,' +
          'max_win_in_a_row INTEGER,' +
          'min_victory_time INTEGER,' +
          'time_played INTEGER)'
      );

      tx.executeSql(
        'SELECT * FROM game_stats LIMIT 1',
        [],
        (_, { rows }) => {
          if (rows.length === 0) {
            // If no data exists, insert the initial data
            tx.executeSql(
              'INSERT INTO game_stats (games_played, games_won, games_lost, games_tied, win_percentage, max_win_in_a_row, min_victory_time, time_played) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
              [0, 0, 0, 0, 0, 0, '86400', '0']
              );
            }
          },
          (_, error) => {
            console.error('Error checking database:', error);
          }
        );

        

        
    });
}

// Call the initializeDatabase function when your app starts
initializeDatabase();

