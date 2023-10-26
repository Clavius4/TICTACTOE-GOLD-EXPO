import React, { useEffect, useCallback } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, BackHandler, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useIsFocused } from "@react-navigation/native"; // Import useIsFocused hook
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Audio } from 'expo-av';

const HomePage = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Get the focused state of the screen

  const backgroundMusic = require('../assets/audio/game1.mp3');
  const soundObject = new Audio.Sound();
  
  useEffect(() => {
    const loadMusic = async () => {
      try {
        const status = await soundObject.loadAsync(backgroundMusic);
        if (status.isLoaded) {
          await soundObject.playAsync();
        } else {
          console.error('Sound is not loaded properly');
        }
      } catch (error) {
        console.error('Error loading or playing music:', error);
      }
    };
  
    loadMusic();
  
    return () => {
      soundObject.unloadAsync();
    };
  }, []);

  const showAlert = () => {
    Alert.alert(
      "Exit Game",
      "Are you sure you want to quit?",
      [
        {
          text: "NO",
          onPress: () => console.log("Cancel is pressed and back to home page"),
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            // Perform any cleanup or actions before exiting the app if needed
            BackHandler.exitApp();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleBackButton = useCallback(() => {
    if (navigation.isFocused()) {
      showAlert();
      return true; // Prevent default back button behavior only when on HomePage
    }
    return false; // Allow default back button behavior on other screens
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [handleBackButton]);



  return (
    <ScreenWrapper>
    <View style={styles.homepage}>
    <View style={styles.row4}> 
      <View style={styles.subtractParent}>
        <Pressable
          style={styles.subtract}
          onPress={() => navigation.navigate("Settings")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/subtract.png")}
          />
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/-2.png")}
          />
        </Pressable>
        <Pressable
          style={styles.icons}
          onPress={() => navigation.navigate("Stats")}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/icons.png")}
          />
        </Pressable>
      </View>
      </View>
      
    <View style={styles.row1}> 
      <Text style={styles.x10}>10 x 10</Text>
      </View>
      <View style={styles.row2}> 
      <Text style={styles.ticTacToe}>TIC TAC TOE</Text>
      </View>
      <View style={styles.row3}> 
      <Text style={styles.gold}>GOLD</Text>
      </View>
      <View style={styles.row5}> 
      <Pressable
        style={[styles.button, styles.buttonLayout]}
        onPress={() => navigation.navigate("OnePlayer2")}
      >
        <View style={styles.buttonChildShadowBox} />
        <View style={styles.rectangleParent}>
          <LinearGradient
            style={styles.frameChildPosition}
            locations={[0, 1]}
            colors={["#fff", "rgba(255, 255, 255, 0)"]}
          />
          <View style={[styles.frameItem, styles.framePosition]} />
          <Image
            style={[styles.frameInner, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-283.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-293.png")}
          />
          <LinearGradient
            style={[styles.rectangleLineargradient, styles.frameChild1Position]}
            locations={[0, 0.49, 1]}
            colors={[
              "rgba(255, 255, 255, 0)",
              "#fff",
              "rgba(255, 255, 255, 0)",
            ]}
          />
          <LinearGradient
            style={[styles.frameChild1, styles.frameChild1Position]}
            locations={[0, 0.49, 1]}
            colors={[
              "rgba(255, 255, 255, 0)",
              "#fff",
              "rgba(255, 255, 255, 0)",
            ]}
          />
          <Text style={styles.playOffline}>Play Offline</Text>
        </View>
      </Pressable>
      </View>
      
      <View style={styles.row7}> 
      <Pressable
        style={[styles.button2, styles.buttonLayout]}
        onPress={() => navigation.navigate("TwoPlayer2")}
      >
        <View style={styles.buttonChildShadowBox} />
        <View style={styles.rectangleParent}>
          <LinearGradient
            style={styles.frameChildPosition}
            locations={[0, 1]}
            colors={["#fff", "rgba(255, 255, 255, 0)"]}
          />
          <View style={[styles.frameItem, styles.framePosition]} />
          <Image
            style={[styles.frameInner, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-283.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-293.png")}
          />
          <LinearGradient
            style={[styles.rectangleLineargradient, styles.frameChild1Position]}
            locations={[0, 0.49, 1]}
            colors={[
              "rgba(255, 255, 255, 0)",
              "#fff",
              "rgba(255, 255, 255, 0)",
            ]}
          />
          <LinearGradient
            style={[styles.frameChild1, styles.frameChild1Position]}
            locations={[0, 0.49, 1]}
            colors={[
              "rgba(255, 255, 255, 0)",
              "#fff",
              "rgba(255, 255, 255, 0)",
            ]}
          />
          <Text style={[styles.twoPlayerOffline, styles.offlineTypo]}>
            Two Players Offline
          </Text>
        </View>
      </Pressable>
      </View>
    </View>
    
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    height: 59,
    width: 190,
    flexDirection: "row",
    alignItems: "center",
  },
  framePosition: {
    opacity: 0.5,
    bottom: "0%",
  },
  row1: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",  
    paddingTop: "10%",
    marginTop: "-34%",
  },
  row2: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "5%",
    marginTop: "-20%", 
   
  },
  row3: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", 
    paddingTop: "10%",
    marginTop: "-20%",
   
  },
  row4: {
    flex: 0.2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: "5%",
    marginTop: "-10%",
  },
  row5: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", 
    paddingTop: "10%",
    marginTop: "-50%",
   
  },
  row6: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", 
    paddingTop: "10%",
    marginTop: "-35%",
   
  },
  row7: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", 
    paddingTop: "10%",
    marginTop: "-55%",
   
  },
  frameInnerLayout: {
    opacity: 0.7,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameChild1Position: {
    width: "87.91%",
    height: "2.27%",
    backgroundColor: "transparent",
    position: "absolute",
  },
  offlineTypo: {
    fontSize: FontSize.size_xl,
    textShadowRadius: 3.78,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    color: Color.saddlebrown_100,
    textShadowOffset: {
      width: 0,
      height: 2.7866785526275635,
    },
    textAlign: "center",
    fontFamily: FontFamily.istokWebBold,
    fontWeight: "700",
    position: "absolute",
  },
 
  x10: {
    fontSize: 64,
    color: Color.white,
    textAlign: "center",
    flex: 0.125,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    flexDirection:'row',
    fontFamily: FontFamily.istokWebBold,
    fontWeight: "700",
    position: "absolute",
  },
  settingLineLight: {
    borderRadius: Border.br_8xs,
    width: 50,
    height: 50,
  },
  settingLineLightWrapper: {
    flexDirection: "row",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  subtract: {
    width: 31,
    height: 31,
  },
  pressable: {
    width: 36,
    height: 35,
    marginLeft: 34,
  },
  icons: {
    width: 30,
    height: 30,
    marginLeft: 34,
  },
  subtractParent: {
    flex: 0.125,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  blankLine: {
    fontSize: FontSize.size_77xl,
  },
  ticTacToe: {
    fontSize: 48,
    fontFamily: "Itim-Regular",
    color: Color.goldenrod_200,
    flexDirection: "row",
    alignItems: "center",
  },
  ticTacToeContainer1: {
    lineBreak: "anywhere",
    width: "100%",
  },
  ticTacToeContainer: {
    height: "6.75%",
    width: "75.13%",
    textShadowRadius: 2.79,
    textShadowOffset: {
      width: 0,
      height: 2.7866785526275635,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    fontFamily: FontFamily.inriaSansBold,
    alignItems: "flex-end",
    textAlign: "center",
    fontWeight: "700",
    position: "absolute",
  },
  buttonChildShadowBox: {
    shadowOpacity: 1,
    elevation: 5.04,
    shadowRadius: 5.04,
    shadowOffset: {
      width: 0,
      height: 2.518890857696533,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    backgroundColor: Color.darkkhaki,
    height: "93.37%",
    borderRadius: 13,
    position: "absolute",
    width: "100%",
  },
  frameChildPosition: {
    backgroundColor: "transparent",
    shadowOpacity: 1,
    elevation: 5.04,
    shadowRadius: 5.04,
    shadowOffset: {
      width: 0,
      height: 2.518890857696533,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  frameItem: {
    backgroundColor: Color.goldenrod_200,
    height: "49.33%",
    opacity: 0.5,
    position: "absolute",
    width: "100%",
  },
  frameInner: {
    width: "93.57%",
    height: "49.33%",
    bottom: "0%",
    opacity: 0.7,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  ellipseIcon: {
    height: "22.73%",
    width: "93.11%",
  },
  rectangleLineargradient: {
    
  },
  frameChild1: {
    opacity: 0.5,
  },
  playOffline: {
    width: "64.33%",
    top: "25.26%",
    left: "17.83%",
    fontSize: 22,
    textShadowRadius: 3.78,
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    alignItems: "center",
    color: Color.saddlebrown_100,
    justifyContent: "center",
    textShadowOffset: {
      width: 0,
      height: 2.7866785526275635,
    },
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.istokWebBold,
    fontWeight: "700",
    position: "absolute",
  },
  rectangleParent: {
    height: 55,
    borderRadius: 13,
    width: 190,
    position: "absolute",
    overflow: "hidden",
  },
  button: {
    
  },
  twoPlayerOnline: {
    top: "25.26%",
    width: "99.91%",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  button1: {
    
  },
  twoPlayerOffline: {
    top: "25.26%",
    width: "99.91%",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  button2: {
    
  },
  // playOffline: {
  //   height: "46.92%",
  //   width: "95.18%",
  //   top: "28.87%",
  //   left: "1.58%",
  // },
  // button3: {
  //   height: "7.03%",
  //   width: "48.76%",
  //   top: 480,
  //   right: "26.11%",
  //   bottom: "23.54%",
  //   left: 95,
  //   flexDirection: "row",
  //   position: "absolute",
  // },
  
  gold: {
    fontSize: 64,
    color: Color.goldenrod_200,
    flexDirection: "row",
    alignItems: "center",
    textShadowOffset: {
      width: 0,
      height: 2.7866785526275635,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    display: "flex",
    fontFamily: FontFamily.inriaSansBold,
    alignItems: "flex-end",
    textAlign: "center",
    fontWeight: "700",
    position: "absolute",
  },
  homepage: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
   
  },
});

export default HomePage;
