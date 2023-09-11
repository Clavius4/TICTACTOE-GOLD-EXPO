import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const MenuDash = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.menudashIcon}
      resizeMode="cover"
      source={require("../assets/pxfuel-11.png")}
    >
      <View style={styles.frameParent}>
        <View style={styles.frameChildShadowBox}>
          <View style={styles.frameChildShadowBox} />
          <Image
            style={styles.frameItem}
            contentFit="cover"
            source={require("../assets/vector-2.png")}
          />
        </View>
        <View style={[styles.rectangleGroup, styles.frameParentLayout]}>
          <View style={[styles.frameInner, styles.frameParentLayout]} />
          <Text style={[styles.likeAndRate, styles.playTypo]}>
            Like and Rate Us
          </Text>
          <Image
            style={styles.rating1Icon}
            contentFit="cover"
            source={require("../assets/rating-1.png")}
          />
        </View>
        <View style={[styles.rectangleContainer, styles.frameParentLayout]}>
          <View style={[styles.frameInner, styles.frameParentLayout]} />
          <Text style={[styles.gameLevel, styles.playTypo]}>Game Level</Text>
          <Image
            style={styles.rating1Icon}
            contentFit="cover"
            source={require("../assets/level-1.png")}
          />
        </View>
        <Pressable
          style={[styles.framePressable, styles.frameLayout]}
          onPress={() => navigation.navigate("PlayOffOn2")}
        >
          <View style={[styles.frameChild1, styles.frameLayout]} />
          <Text style={[styles.playOffline, styles.playTypo]}>
            Play Offline
          </Text>
          <Image
            style={[styles.layer2Icon, styles.layer2IconLayout]}
            contentFit="cover"
            source={require("../assets/layer-22.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.rectangleParent1, styles.frameParentLayout]}
          onPress={() => navigation.navigate("PlayOffOn")}
        >
          <View style={[styles.frameInner, styles.frameParentLayout]} />
          <Text style={[styles.playOnline, styles.playTypo]}>Play Online</Text>
          <Image
            style={[styles.layer2Icon1, styles.layer2IconLayout]}
            contentFit="cover"
            source={require("../assets/layer-22.png")}
          />
        </Pressable>
        <View style={[styles.frameView, styles.frameParentLayout]}>
          <View style={[styles.frameInner, styles.frameParentLayout]} />
          <Text style={[styles.share, styles.playTypo]}>Share</Text>
          <Image
            style={[styles.vectorIcon, styles.layer2IconLayout]}
            contentFit="cover"
            source={require("../assets/vector.png")}
          />
        </View>
        <Pressable
          style={[styles.rectangleParent2, styles.frameParentLayout]}
          onPress={() => navigation.navigate("Ads")}
        >
          <View style={[styles.frameInner, styles.frameParentLayout]} />
          <Text style={[styles.gameLevel, styles.playTypo]}>Remove ADS</Text>
          <Image
            style={[styles.vectorIcon1, styles.layer2IconLayout]}
            contentFit="cover"
            source={require("../assets/vector1.png")}
          />
        </Pressable>
        <Image
          style={[styles.vectorIcon2, styles.layer2IconLayout]}
          contentFit="cover"
          source={require("../assets/vector2.png")}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  frameParentLayout: {
    height: 60,
    width: 256,
    backgroundColor: Color.white,
    borderRadius: 16,
    position: "absolute",
  },
  playTypo: {
    height: 21,
    textAlign: "left",
    color: Color.dimgray,
    fontFamily: FontFamily.karlaRegular,
    letterSpacing: -0.4,
    fontSize: FontSize.size_lg,
    position: "absolute",
  },
  frameLayout: {
    backgroundColor: Color.whitesmoke,
    height: 60,
    width: 256,
    borderRadius: 16,
    position: "absolute",
  },
  layer2IconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameChildShadowBox: {
    elevation: 27.19,
    shadowRadius: 27.19,
    shadowColor: "rgba(0, 0, 0, 0.09)",
    backgroundColor: Color.white,
    borderRadius: 16,
    left: 0,
    top: 0,
    height: 625,
    width: 296,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1.5539106130599976,
    },
    position: "absolute",
  },
  frameItem: {
    top: 451,
    width: 295,
    height: 2,
    borderRadius: 16,
    left: 0,
    position: "absolute",
  },
  frameInner: {
    left: 0,
    top: 0,
  },
  likeAndRate: {
    width: 138,
    left: 80,
    textAlign: "left",
    color: Color.dimgray,
    fontFamily: FontFamily.karlaRegular,
    letterSpacing: -0.4,
    fontSize: FontSize.size_lg,
    top: 20,
  },
  rating1Icon: {
    left: 30,
    width: 23,
    height: 23,
    top: 20,
    borderRadius: 16,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleGroup: {
    top: 262,
    left: 14,
  },
  gameLevel: {
    width: 106,
    left: 80,
    textAlign: "left",
    color: Color.dimgray,
    fontFamily: FontFamily.karlaRegular,
    letterSpacing: -0.4,
    fontSize: FontSize.size_lg,
    top: 20,
  },
  rectangleContainer: {
    top: 333,
    left: 14,
  },
  frameChild1: {
    left: 0,
    top: 0,
  },
  playOffline: {
    width: 120,
    left: 80,
    textAlign: "left",
    color: Color.dimgray,
    fontFamily: FontFamily.karlaRegular,
    letterSpacing: -0.4,
    fontSize: FontSize.size_lg,
    top: 20,
  },
  layer2Icon: {
    bottom: "25.02%",
    left: "9.37%",
    right: "81.64%",
    top: "36.65%",
    width: "8.98%",
    height: "38.33%",
    maxWidth: "100%",
  },
  framePressable: {
    top: 122,
    left: 14,
  },
  playOnline: {
    width: 124,
    left: 80,
    textAlign: "left",
    color: Color.dimgray,
    fontFamily: FontFamily.karlaRegular,
    letterSpacing: -0.4,
    fontSize: FontSize.size_lg,
    top: 20,
  },
  layer2Icon1: {
    bottom: "25.01%",
    left: "9.37%",
    right: "81.64%",
    top: "36.65%",
    width: "8.98%",
    height: "38.33%",
    maxWidth: "100%",
  },
  rectangleParent1: {
    top: 52,
    left: 14,
  },
  share: {
    top: 19,
    left: 62,
    width: 55,
  },
  vectorIcon: {
    height: "30.04%",
    width: "7.04%",
    top: "33.4%",
    right: "81.19%",
    bottom: "36.56%",
    left: "11.77%",
    borderRadius: 16,
  },
  frameView: {
    top: 473,
    left: 16,
  },
  vectorIcon1: {
    height: "38.85%",
    width: "9.1%",
    top: "32.9%",
    right: "81.04%",
    bottom: "28.25%",
    left: "9.86%",
    borderRadius: 16,
  },
  rectangleParent2: {
    top: 192,
    left: 14,
  },
  vectorIcon2: {
    height: "3.6%",
    width: "7.6%",
    top: "1.4%",
    right: "3.97%",
    bottom: "95%",
    left: "88.42%",
  },
  frameParent: {
    top: 68,
    left: 48,
    shadowColor: "#000",
    shadowRadius: 0,
    elevation: 0,
    height: 625,
    width: 296,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1.5539106130599976,
    },
    position: "absolute",
  },
  menudashIcon: {
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default MenuDash;
