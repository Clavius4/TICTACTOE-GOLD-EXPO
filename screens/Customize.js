import * as React from "react";
import { AsyncStorage } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";

const Customize = () => {
  
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

  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (imageSource) => {
    setSelectedImage(imageSource);
  };

  const handleSavePress = async () => {
    if (selectedImage) {
      try {
        // Save the selected theme
        await AsyncStorage.setItem("selectedTheme", selectedImage);
        // Updating the game's state/context with the selectedImage i.e the theme.
        // After saving, navigate to the homepage for gameplay
        navigation.navigate("HomePage");
      } catch (error) {
        console.error("Error saving theme:", error);
      }
    }
  };

  /*const retrieveSavedTheme = async () => {
    try {
      // Retrieving the selected theme from AsyncStorage
      const selectedTheme = await AsyncStorage.getItem("selectedTheme");
  
      // Applying the selected theme to your game's state/context as needed
      // Updating the game's state/context with the retrieved selectedTheme.
    } catch (error) {
      console.error("Error retrieving theme:", error);
    }
  };
  
  // Calling this function at the appropriate screen in the gameplay.
  retrieveSavedTheme();
  */

  return (
    <ScreenWrapper>
    <View style={styles.customize}>
      {/* <Image
        style={styles.pxfuel1Icon}
        contentFit="cover"
        source={require("../assets/pxfuel-11.png")}
      /> */}
      <View style={[styles.frameParent, styles.parentBorder]}>
        <View style={[styles.vectorParent, styles.frameChildPosition]}>
          <Image
            style={[styles.frameChild, styles.frameChildPosition]}
            contentFit="cover"
            source={require("../assets/rectangle-9123.png")}
          />
          <View style={styles.ravensStudio}>
            <Text style={[styles.ravensStudio1, styles.boardsPiecesFlexBox]}>
              Customize
            </Text>
          </View>
        </View>
        <Text style={styles.preview}>Preview</Text>
        <Image
        style={styles.frameItem}
        contentFit="cover"
        source={selectedImage || require("../assets/frame-23426.png")} // Use a default image for initial preview
      />
      </View>
      <Pressable
        style={styles.group}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/group.png")}
        />
      </Pressable>
{/*       
      <Pressable
      Board and pieces customization
        style={[styles.customizeChild, styles.customizePosition]}
        onPress={() => handleImagePress(require("../assets/frame-234261.png"))} // Navigate to the "Settings" screen
      >
        <Image
          style={{ flex: 1, width: "100%", height: "100%" }} // Ensure the image takes up the full space of the Pressable
          contentFit="cover"
          source={require("../assets/frame-234261.png")}
        />
      </Pressable>
      
      <Pressable
        style={[styles.customizeItem, styles.customizePosition]}
        onPress={() => handleImagePress(require("../assets/frame-23427.png"))}  // Navigate to the "Settings" screen
      >
        <Image
          style={{ flex: 1, width: "100%", height: "100%" }} // Ensure the image takes up the full space of the Pressable
          contentFit="cover"
          source={require("../assets/frame-23427.png")}
        />
      </Pressable>  */}


      <View style={[styles.row3]}>
  <ImageBackground contentFit="contain">
    <View style={styles.mapContainer}>
      {/* First Map */}
      <View style={styles.map}>
        {map.map((row, rowIndex) => (
          <View style={styles.row} key={`row-${rowIndex}`}>
            {row.map((cell, columnIndex) => (
              <Pressable
                style={styles.cell}
                key={`row-${columnIndex}-col-${rowIndex}`}
              ></Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Space between the maps */}
      <View style={styles.spaceBetween}></View>

      {/* Second Map*/}
      <View style={styles.map2}>
        {map.map((row, rowIndex) => (
          <View style={styles.row} key={`row-${rowIndex}`}>
            {row.map((cell, columnIndex) => (
              <Pressable
                style={styles.cell2}
                key={`second-map-row-${columnIndex}-col-${rowIndex}`}
              ></Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  </ImageBackground>
</View>

      

      <View style={styles.buttonParent}>
        <Pressable
          style={[styles.button, styles.button1Position]}
          onPress={() => navigation.navigate("HomePage")}
        >
          <View style={[styles.buttonChild, styles.frameInnerShadowBox]} />
          <View style={[styles.rectangleParent, styles.rectanglePosition]}>
            <LinearGradient
              style={[styles.frameInner, styles.frameBg]}
              locations={[0, 1]}
              colors={["#fff", "rgba(255, 255, 255, 0)"]}
            />
            <View style={[styles.rectangleView, styles.frameChild2Position1]} />
            <Image
              style={[styles.ellipseIcon, styles.ellipseIconLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-28.png")}
            />
            <Image
              style={[styles.frameChild1, styles.ellipseIconLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-29.png")}
            />
            <LinearGradient
              style={[
                styles.rectangleLineargradient,
                styles.frameChild2Position,
              ]}
              locations={[0, 0.49, 1]}
              colors={[
                "rgba(255, 255, 255, 0)",
                "#fff",
                "rgba(255, 255, 255, 0)",
              ]}
            />
            <LinearGradient
              style={[styles.frameChild2, styles.frameChild2Position]}
              locations={[0, 0.49, 1]}
              colors={[
                "rgba(255, 255, 255, 0)",
                "#fff",
                "rgba(255, 255, 255, 0)",
              ]}
            />
            <Text style={[styles.cancel, styles.saveTypo]}>Cancel</Text>
          </View>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.buttonPosition1]}
          onPress={() => navigation.navigate("HomePage")}
        >
          <View style={[styles.buttonChild, styles.frameInnerShadowBox]} />
          <View style={[styles.rectangleParent, styles.rectanglePosition]}>
            <LinearGradient
              style={[styles.frameInner, styles.frameBg]}
              locations={[0, 1]}
              colors={["#fff", "rgba(255, 255, 255, 0)"]}
            />
            <View style={[styles.rectangleView, styles.frameChild2Position1]} />
            <Image
              style={[styles.ellipseIcon, styles.ellipseIconLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-28.png")}
            />
            <Image
              style={[styles.frameChild1, styles.ellipseIconLayout]}
              contentFit="cover"
              source={require("../assets/ellipse-29.png")}
            />
            <LinearGradient
              style={[
                styles.rectangleLineargradient,
                styles.frameChild2Position,
              ]}
              locations={[0, 0.49, 1]}
              colors={[
                "rgba(255, 255, 255, 0)",
                "#fff",
                "rgba(255, 255, 255, 0)",
              ]}
            />
            <LinearGradient
              style={[styles.frameChild2, styles.frameChild2Position]}
              locations={[0, 0.49, 1]}
              colors={[
                "rgba(255, 255, 255, 0)",
                "#fff",
                "rgba(255, 255, 255, 0)",
              ]}
            />
            <Text style={[styles.cancel, styles.saveTypo]}>Save</Text>
          </View>
        </Pressable>
        </View>
      <Text
        style={[styles.boardsPieces, styles.boardsPiecesFlexBox]}
      >Boards& Pieces</Text>
    </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  parentBorder: {
    borderStyle: "solid",
    overflow: "hidden",
  },
  frameChildPosition: {
    width: 310,
    position: "absolute",
  },
  boardsPiecesFlexBox: {
    justifyContent: "center",
    alignItems: "flex-end",
    display: "flex",
    textAlign: "center",
    fontFamily: FontFamily.itimRegular,
    lineHeight: 60,
    fontSize: 31,
    position: "absolute",
  },
  customizePosition: { //Boards to be customized
    height: 190,
    top: "55%",
    position: "absolute",
    overflow: "hidden",
  },
  mapContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  spaceBetween: {
    width: '1%', 
  },
  map2: {
    flex: 1, 
    borderColor: "yellow",
    borderWidth: 3,
    aspectRatio: 0.95, 
    marginTop: "95.5%",
    width:"70%",
     backgroundColor: "green",
  },
  cell2: {
    flex: 1, 
    borderColor: "yellow",
    borderWidth: 1.1,
    
  },
  map: {
    borderColor: "cyan",
    borderWidth: 3,
    width:"60%",
    aspectRatio: 0.95,
     marginTop: "95.5%",
     right: "10%",
     backgroundColor: "grey",

  },
  cell: {
    flex: 1,
    borderColor: "cyan",
    borderWidth: 1.1,
    justifyContent: "center",
    alignItems: "center",
  },
  row3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },

  buttonPosition1: {//Cancel button
    height: "100%",
    left: "70%",
    top: "300%",
  },
  frameInnerShadowBox: {
    elevation: 3.43,
    shadowRadius: 3.43,
    right: "0%",
    bottom: "0%",
    left: "1%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 31.48105239868164,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    position: "absolute",
    width: "95%",
  },
  rectanglePosition: {
    width: 102,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  frameBg: {
    backgroundColor: "transparent",
    top: "0%",
    height: "100%",
  },
  frameChild2Position1: {
    opacity: 0.5,
    bottom: "0%",
  },
  ellipseIconLayout: {
    opacity: 0.7,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameChild2Position: {
    left: "5.78%",
    right: "6.31%",
    width: "87.91%",
    height: "2.27%",
    backgroundColor: "transparent",
    position: "absolute",
  },
  saveTypo: {
    textShadowOffset: {
      width: 0.8564230799674988,
      height: 0,
    },
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    alignItems: "center",
    fontFamily: FontFamily.archivoBlackRegular,
    letterSpacing: 0.5,
    left: "17.83%",
    top: "30.33%",
    width: "64.33%",
    color: Color.white,
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    position: "absolute",
  },
  button1Position: { //Save button
    right: "0%",
    position: "absolute",
    top: "300%",
  },
  buttonItemShadowBox: {
    elevation: 5.04,
    shadowRadius: 5.04,
    right: "0%",
    bottom: "0%",
    left: "0%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 31.48105239868164,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    position: "absolute",
    width: "100%",
  },
  pxfuel1Icon: {
    width: 390,
    left: 0,
    top: 0,
    position: "absolute",
    height: 844,
  },
  frameChild: {
    height: 71,
    left: 0,
  },
  ravensStudio1: {
    textTransform: "uppercase",
    left: "0%",
    top: "-30%",
    height: "100%",
    width: "100%",
  },
  ravensStudio: {
    top: 14,
    left: 58,
    width: 180,
    height: 45,
    position: "absolute",
  },
  vectorParent: {
    left: 1,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderColor: "#000",
    borderWidth: 0.9,
    height: 53,
    borderStyle: "solid",
    overflow: "hidden",
  },
  preview: {
    top: "16%",
    left: 107,
    fontSize: FontSize.size_5xl,
    lineHeight: 48,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.itimRegular,
    position: "absolute",
  },
  frameItem: {
    top: "28%",
    left: "18%",
    width: 198,
    height: 222,
    position: "absolute",
    overflow: "hidden",
  },
  frameParent: {
    height: "42%",
    width: "77.18%",
    top: "6.64%",
    right: "12.05%",
    bottom: "54.03%",
    left: "10.77%",
    borderRadius: 21,
    shadowRadius: 49.85,
    elevation: 49.85,
    borderColor: "#e3a22c",
    borderWidth: 2,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 31.48105239868164,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    borderStyle: "solid",
    position: "absolute",
  },
  icon: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  group: {
    left: "81.03%",
    top: "4.98%",
    right: "8.72%",
    bottom: "90.28%",
    width: "11.26%",
    height: "5.4%",
    position: "absolute",
  },
  customizeChild: { //Bluish board
    left: "1%",
    width: 195,
  },
  customizeItem: { //Greenish board
    left: "55%",
    width: 178,
  },
  buttonChild: {
    backgroundColor: Color.darkkhaki,
    top: "6.63%",
    height: "93.37%",
    borderRadius: 9,
  },
  frameInner: {
    elevation: 3.43,
    shadowRadius: 3.43,
    right: "0%",
    bottom: "0%",
    left: "0%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 31.48105239868164,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    position: "absolute",
    width: "100%",
  },
  rectangleView: {
    backgroundColor: Color.goldenrod_200,
    top: "50.67%",
    height: "49.33%",
    right: "0%",
    position: "absolute",
    left: "0%",
    width: "100%",
  },
  ellipseIcon: {
    width: "93.57%",
    right: "3.21%",
    left: "3.21%",
    top: "50.67%",
    height: "49.33%",
    bottom: "0%",
  },
  frameChild1: {
    height: "22.73%",
    width: "93.11%",
    right: "3.42%",
    bottom: "77.27%",
    left: "3.47%",
    top: "0%",
  },
  rectangleLineargradient: {
    bottom: "97.73%",
    top: "0%",
  },
  frameChild2: {
    top: "97.73%",
    opacity: 0.5,
    bottom: "0%",
  },
  cancel: {
    fontSize: 16,
    textShadowRadius: 2.57,
  },
  rectangleParent: {
    height: 38,
    borderRadius: 9,
  },
  button: {
    right: "58.54%",
    bottom: "0%",
    width: "41.46%",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  buttonItem: {
    borderRadius: 13,
    backgroundColor: Color.darkkhaki,
    top: "6.63%",
    height: "93.37%",
  },
  frameChild3: {
    backgroundColor: "transparent",
    top: "0%",
    height: "100%",
  },
  save: {
    height: "46.92%",
    fontSize: FontSize.size_base,
    textShadowRadius: 3.78,
  },
  rectangleGroup: {
    height: 37,
    borderRadius: 13,
  },
  button1: {
    height: "99.11%",
    top: "0.02%",
    bottom: "0.88%",
    left: "58.54%",
    width: "41.46%",
  },
  buttonParent: {//Cancel&Save grouped buttons
    height: "4.78%",
    width: "63.08%",
    top: "70%",
    right: "18.97%",
    bottom: "16.78%",
    left: "17.95%",
    position: "absolute",
  },
  boardsPieces: {
    height: "7%",
    color: Color.darkkhaki,
    width: "53.33%",
    top: "49%",
    left: "23%",
  },
  customize: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    // backgroundColor: Color.white,
    // flex: 1,
    // overflow: "hidden",
    // height: 844,
    // width: "100%",
  },
});

export default Customize;
