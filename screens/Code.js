import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const Code = () => {
  return (
    <View style={styles.code}>
      <Image
        style={[styles.pxfuel1Icon, styles.groupItemPosition]}
        contentFit="cover"
        source={require("../assets/pxfuel-11.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={styles.groupChild} />
        <View style={[styles.rectangleGroup, styles.groupLayout]}>
          <View style={[styles.groupItem, styles.groupLayout]} />
          <Text style={styles.xxxx}>XXXX</Text>
        </View>
        <Text
          style={[styles.shareThisCode, styles.shareTypo]}
        >{` Share this code with
 a friend to start 
playing online`}</Text>
        <Image
          style={styles.groupIcon}
          contentFit="cover"
          source={require("../assets/group.png")}
        />
      </View>
      <View style={styles.button}>
        <View style={styles.buttonChild} />
        <View style={styles.rectangleContainer}>
          <LinearGradient
            style={styles.frameChild}
            locations={[0, 1]}
            colors={["#fff", "rgba(255, 255, 255, 0)"]}
          />
          <View style={[styles.frameItem, styles.framePosition]} />
          <Image
            style={[styles.frameInner, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-284.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-294.png")}
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
          <Text style={[styles.share, styles.shareTypo]}>SHARE</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupItemPosition: {
    top: 0,
    left: 0,
  },
  groupLayout: {
    height: 63,
    width: 191,
    position: "absolute",
  },
  shareTypo: {
    color: Color.white,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
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
  pxfuel1Icon: {
    width: 390,
    left: 0,
    position: "absolute",
    height: 844,
    top: 0,
  },
  groupChild: {
    top: 19,
    borderRadius: 4,
    backgroundColor: Color.saddlebrown_200,
    width: 279,
    height: 386,
    left: 0,
    position: "absolute",
  },
  groupItem: {
    backgroundColor: Color.gainsboro,
    left: 0,
    top: 0,
  },
  xxxx: {
    top: 7,
    left: 53,
    fontSize: FontSize.size_17xl,
    color: Color.black,
    textAlign: "center",
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  rectangleGroup: {
    top: 212,
    left: 46,
  },
  shareThisCode: {
    top: 57,
    left: 27,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
  },
  groupIcon: {
    height: "9.87%",
    width: "13.61%",
    bottom: "90.13%",
    left: "86.39%",
    maxHeight: "100%",
    maxWidth: "100%",
    right: "0%",
    top: "0%",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    top: 143,
    left: 56,
    width: 294,
    height: 405,
    position: "absolute",
  },
  buttonChild: {
    height: "93.37%",
    top: "6.63%",
    backgroundColor: Color.darkkhaki,
    shadowOpacity: 1,
    elevation: 5.04,
    shadowRadius: 5.04,
    shadowOffset: {
      width: 0,
      height: 2.518890857696533,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    borderRadius: 13,
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  frameChild: {
    height: "100%",
    backgroundColor: "transparent",
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
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  frameItem: {
    backgroundColor: Color.goldenrod_200,
    top: "50.67%",
    height: "49.33%",
    left: "0%",
    opacity: 0.5,
    right: "0%",
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
  share: {
    width: "64.33%",
    top: "30.33%",
    left: "17.83%",
    letterSpacing: 0.7,
    fontFamily: FontFamily.archivoBlackRegular,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    textShadowOffset: {
      width: 1.2594456672668457,
      height: 0,
    },
    textShadowRadius: 3.78,
  },
  rectangleContainer: {
    width: 150,
    height: 55,
    borderRadius: 13,
    left: 0,
    top: 0,
    position: "absolute",
    overflow: "hidden",
  },
  button: {
    height: "7.03%",
    width: "38.46%",
    top: "54.03%",
    right: "29.49%",
    bottom: "38.94%",
    left: "32.05%",
    position: "absolute",
  },
  code: {
    backgroundColor: Color.white,
    flex: 1,
    overflow: "hidden",
    width: "100%",
    height: 844,
  },
});

export default Code;
