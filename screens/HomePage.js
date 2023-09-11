import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";
const HomePage = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
    <View style={styles.homepage}>
      <Text style={styles.x10}>10 x 10</Text>
      <Text style={styles.ticTacToe}>TIC TAC TOE</Text>
      <Text style={styles.gold}>GOLD</Text>
      
      <View style={styles.settingLineLightWrapper}>
        <Pressable
          style={styles.settingLineLight}
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
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
{/*       
      <Pressable
        style={[styles.button, styles.buttonLayout]}
        onPress={() => navigation.navigate("OnePlayer")}
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
          <Text style={styles.playOnline}>Play Online</Text>
        </View>
      </Pressable> */}
      <Pressable
        style={[styles.button1, styles.buttonLayout]}
        onPress={() => navigation.navigate("TwoPlayer")}
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
          <Text style={[styles.twoPlayerOnline, styles.offlineTypo]}>
            Two Players Online
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.button3}
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
          <Text style={[styles.playOffline, styles.offlineTypo]}>Play Offline</Text>
        </View>
      </Pressable>
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
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  buttonLayout: {
    height: 59,
    width: 190,
    left: 95,
    flexDirection: "row",
    alignItems: "center",
    right: 30,
    position: "absolute",
  },
  framePosition: {
    opacity: 0.5,
    bottom: "0%",
  },
  frameInnerLayout: {
    opacity: 0.7,
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameChild1Position: {
    left: "5.78%",
    right: "6.31%",
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
  pxfuel1Icon: {
    width: 390,
    left: 0,
    top: 0,
    position: "absolute",
    height: 844,
  },
  x10: {
    top: 118,
    left: 83,
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
    top: 56,
    left: 94,
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
    top: 58,
    left: 106,
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
    right: 50,
    left: 60,
    fontFamily: "Itim-Regular",
    color: Color.goldenrod_200,
    flexDirection: "row",
    alignItems: "center",
    top: 205,
  },
  ticTacToeContainer1: {
    lineBreak: "anywhere",
    width: "100%",
  },
  ticTacToeContainer: {
    height: "6.75%",
    width: "75.13%",
    top: "25%",
    left: "12.31%",
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
    top: "6.63%",
    height: "93.37%",
    borderRadius: 13,
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  frameChildPosition: {
    backgroundColor: "transparent",
    top: "0%",
    shadowOpacity: 1,
    elevation: 5.04,
    shadowRadius: 5.04,
    shadowOffset: {
      width: 0,
      height: 2.518890857696533,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    left: "0%",
    bottom: "0%",
    right: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  frameItem: {
    backgroundColor: Color.goldenrod_200,
    top: "50.67%",
    height: "49.33%",
    left: "0%",
    right: "0%",
    opacity: 0.5,
    position: "absolute",
    width: "100%",
  },
  frameInner: {
    width: "93.57%",
    right: "3.21%",
    left: "3.21%",
    top: "50.67%",
    height: "49.33%",
    bottom: "0%",
    opacity: 0.7,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  ellipseIcon: {
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
  frameChild1: {
    top: "97.73%",
    opacity: 0.5,
    bottom: "0%",
  },
  playOnline: {
    width: "64.33%",
    top: "26.72%",
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
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  button: {
    top: 390,
    left: 30,
  },
  twoPlayerOnline: {
    top: "25.26%",
    width: "99.91%",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
    left: "0%",
    display: "flex",
  },
  button1: {
    top: 400,
  },
  twoPlayerOffline: {
    top: "25.26%",
    width: "99.91%",
    fontSize: FontSize.size_xl,
    justifyContent: "center",
    alignItems: "center",
    left: "0%",
    display: "flex",
  },
  button2: {
    top: 560,
  },
  playOffline: {
    height: "46.92%",
    width: "95.18%",
    top: "28.87%",
    left: "1.58%",
  },
  button3: {
    height: "7.03%",
    width: "48.76%",
    top: 480,
    right: "26.11%",
    bottom: "23.54%",
    left: 95,
    flexDirection: "row",
    position: "absolute",
  },
  
  gold: {
    fontSize: 64,
    right: 50,
    left: 30,
    color: Color.goldenrod_200,
    flexDirection: "row",
    alignItems: "center",
    top: 270,
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
    // backgroundColor: Color.white,
    // flex: 1,
    // overflow: "hidden",
    // height: 844,
    // width: "100%",
  },
});

export default HomePage;
