import * as React from "react";
import { useState, useEffect } from "react";
import { ToastProvider, useToast } from 'react-native-toast-message';
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Pressable, Text, View, ImageBackground, Alert, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import { checkWinOrDraw } from '../screens/GameLogic';
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

  const [currentTurn, setCurrentTurn] = useState("X");
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
  
  const announceResult = (result) => {
    let message;
    if (result === 'X' || result === 'O') {
      message = `${result} wins the game!`;
    } else if (result === 'Draw') {
      message = 'The game is a draw.';
    }

    Alert.alert(
      'Game Over',
      message,
      [
        {
          text: 'Restart',
          onPress: () => {
            resetGame();
          },
        },
        {
          text: 'Exit',
          onPress: () => {
            navigation.navigate('HomePage');
          },
        },
      ],
      { cancelable: false }
    );
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

    const winnerOrDraw = checkWinOrDraw(map, currentTurn);

    if (winnerOrDraw === 'X' || winnerOrDraw === 'O' || winnerOrDraw === 'Draw') {
      announceResult(winnerOrDraw);
    }

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