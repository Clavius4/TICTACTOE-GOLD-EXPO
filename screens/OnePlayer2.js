import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Audio } from 'expo-av';
import { ToastProvider, useToast } from 'react-native-toast-message';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, StyleSheet, Pressable, Text, View, ImageBackground, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import GameAlert from "./GameAlert";
import { checkWin, isTie, makeEasyMove, makeMediumMove, makeHardMove } from '../screens/Result';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("t4.db");


//copying the board
const copyBoard = (board) => {
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
  const [gameMode, setGameMode] = useState("BOT_MEDIUM");
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [musicMuted, setMusicMuted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');
  const [gamesLost, setGamesLost] = useState(0);
  const [gamesTied, setGamesTied] = useState(0);
  const [maxWinInARow, setMaxWinInARow] = useState(0);
  const [minVictoryTime, setMinVictoryTime] = useState("N/A");
  const [timePlayed, setTimePlayed] = useState(0);
  const [totalTimePlayed, setTotalTimePlayed] = useState(0);
  const [currentWinStreak, setCurrentWinStreak] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [gameStarted, setGameStarted] = useState(false); // New state to track whether the game has started
  const [gameOver, setGameOver] = useState(false);

  const backgroundMusic = require('../assets/audio/game1.mp3');
  const soundObject = useRef(new Audio.Sound()).current;

  const loadAndPlayMusic = async () => {
        try {
      await soundObject.loadAsync(backgroundMusic);
      await soundObject.playAsync();
    } catch (error) {
      console.error('Error loading or playing music:', error);
    }
  };

  useEffect(() => {
  if (currentTurn === 'O') {
    // AI's turn

    // Determine which AI function to use based on the game level
    let aiMove;
    if (gameMode === 'BOT_EASY') {
      aiMove = makeEasyMove(map, 'O');
    } else if (gameMode === 'BOT_MEDIUM') {
      aiMove = makeMediumMove(map, 'O');
    } else if (gameMode === 'BOT_HARD') {
      aiMove = makeHardMove(map, 'O');
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
}, [map, currentTurn, gameMode]);


  useEffect(() => {
    if (currentTurn === 'X') {
      // Increment gamesPlayed when it's X's turn (user's turn)
      setGamesPlayed(prevGamesPlayed => prevGamesPlayed + 1);
    }
  }, [currentTurn]);

  const onPress = (rowIndex, columnIndex) => {
    if (!gameOver && map[rowIndex][columnIndex] === "") {
      const updatedMap = [...map];
      updatedMap[rowIndex][columnIndex] = currentTurn;
      setMap(updatedMap);

      if (checkWin(updatedMap, currentTurn)) {
        setGameOver(true);
        showAlert('You win!', 'Restart', 'Exit', resetGame, exitGame);
      } else if (isTie(updatedMap)) {
        setGameOver(true);
        showAlert('It\'s a tie!', 'Restart', 'Exit', resetGame, exitGame);
      }

      setCurrentTurn('O');
    }
  };

  const showAlert = (title, button1Text, button2Text, button1Action, button2Action) => {
    Alert.alert(
      title,
      null,
      [
        { text: button1Text, onPress: button1Action },
        { text: button2Text, onPress: button2Action },
      ],
      { cancelable: false }
    );
  };

  const resetGame = () => {
    // Implement your logic to reset the game (reset the board, etc.).
    setMap(Array.from({ length: 10 }, () => Array(10).fill("")));
    setCurrentTurn("X");
    setGameOver(false);
  
    // Initialize the increments
    let gamesPlayedIncrement = 1;
    let gamesWonIncrement = 0;
    let gamesLostIncrement = 0;
    let gamesTiedIncrement = 0;
  
    // Check if the current player is 'X' (human player)
    if (currentTurn === 'X') {
      gamesWonIncrement = 1;
    } else if (currentTurn === 'O') {
      gamesLostIncrement = 1;
    } else {
      gamesTiedIncrement = 1;
    }
  
    db.transaction((tx) => {
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
    });
  };
  

  const exitGame = () => {
    // Use navigation to navigate to the home page.
    navigation.navigate("HomePage"); 

  
    // Initialize the increments
    let gamesPlayedIncrement = 1;
    let gamesWonIncrement = 0;
    let gamesLostIncrement = 0;
    let gamesTiedIncrement = 0;
  
    // Check if the current player is 'X' (human player)
    if (currentTurn === 'X') {
      gamesWonIncrement = 1;
    } else if (currentTurn === 'O') {
      gamesLostIncrement = 1;
    } else {
      gamesTiedIncrement = 1;
    }
  
    db.transaction((tx) => {
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
    });

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
      {/* <View style={styles.text}>
      <Text style={styles.text}>Elapsed Time: {formatElapsedTime(elapsedTime)} seconds</Text>
    </View> */}
      <View style={[styles.row3]}> 
       <ImageBackground
       contentFit="contain">
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
  text: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    
    
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
    justifyContent: "flex-end",
    alignItems: "flex-start", 
    paddingRight: 10, 
    paddingTop: 28, 
  },
  row: {
    flex: 1,
    flexDirection: "row",
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
