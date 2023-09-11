import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";

const HowToPlay = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
          <View style={styles.howtoplay}>
      <Image
        style={styles.pxfuel1Icon}
        contentFit="cover"
        source={require("../assets/pxfuel-11.png")}
      />
      <View style={[styles.frameParent, styles.parentBorder]}>
        <View style={[styles.vectorParent, styles.frameChildPosition]}>
          <Image
            style={[styles.frameChild, styles.frameChildPosition]}
            contentFit="cover"
            source={require("../assets/rectangle-91232.png")}
          />
          <Image
            style={[styles.frameItem, styles.frameLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-282.png")}
          />
          <Image
            style={[styles.frameInner, styles.frameLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-292.png")}
          />
          <View style={styles.ravensStudio}>
            <Text style={[styles.ravensStudio1, styles.instructionsFlexBox]}>
              How To Play
            </Text>
          </View>
        </View>
        <Image
          style={[styles.layer2Icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/layer-21.png")}
        />
        <Image
          style={[styles.iconMediaPlay, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/-icon-media-play2.png")}
        />
        <Image
          style={[styles.iconAirplay, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/-icon-airplay1.png")}
        />
        <Text style={[styles.you, styles.aiClr]}>You</Text>
        <Text style={[styles.ai, styles.aiClr]}>AI</Text>
        <Image
          style={styles.frameIcon}
          contentFit="cover"
          source={require("../assets/frame-23426.png")}
        />
      </View>
      <Text style={[styles.instructions, styles.instructionsFlexBox]}>
        INSTRUCTIONS:
      </Text>
      <Text
        style={[styles.theGameIs, styles.aiClr]}
      >1. The Game is played in turns.
The Objective is one of the players t attain a row, column or diagonal alignment of similar pieces in line.
Once there is no pieces alignment it will be a draw.</Text>
      <Pressable
        style={styles.group}
        onPress={() => navigation.navigate("Settings")}
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/group.png")}
        />
      </Pressable>
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
    width: 296,
    top: 0,
    position: "absolute",
  },
  frameLayout: {
    opacity: 0.1,
    width: 286,
    position: "absolute",
  },
  instructionsFlexBox: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "flex-end",
    display: "flex",
    fontFamily: FontFamily.itimRegular,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  aiClr: {
    color: Color.white,
    position: "absolute",
  },
  pxfuel1Icon: {
    width: 390,
    top: 0,
    left: 0,
    position: "absolute",
    height: 844,
  },
  frameChild: {
    height: 71,
    left: 0,
    width: 296,
  },
  frameItem: {
    top: 1,
    left: 9,
    height: 52,
  },
  frameInner: {
    top: 76,
    left: 295,
    height: 9,
  },
  ravensStudio1: {
    top: "-28%",
    left: "-3%",
    fontSize: 36,
    lineHeight: 70,
    height: "100%",
    width: "100%",
  },
  ravensStudio: {
    top: 6,
    left: 49,
    width: 208,
    height: 54,
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
  layer2Icon: {
    height: "7.49%",
    width: "9.97%",
    top: "20%",
    right: "70.87%",
    bottom: "74.68%",
    left: "19.17%",
    position: "absolute",
  },
  iconMediaPlay: {
    height: "5.07%",
    width: "5.45%",
    top: "22%",
    right: "47.12%",
    bottom: "75.88%",
    left: "47.43%",
    position: "absolute",
  },
  iconAirplay: {
    height: "6.22%",
    width: "8.18%",
    top: "21%",
    right: "20.68%",
    bottom: "76.51%",
    left: "71.14%",
    position: "absolute",
  },
  you: {
    left: 63,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    fontSize: 12,
    top: 107,
    color: Color.white,
    textAlign: "center",
  },
  ai: {
    left: 216,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    fontSize: 12,
    top: 107,
    color: Color.white,
    textAlign: "center",
  },
  frameIcon: {
    top: 139,
    left: 55,
    width: 198,
    height: 222,
    position: "absolute",
    overflow: "hidden",
  },
  frameParent: {
    height: "50%",
    width: "77.18%",
    top: "10%",
    right: "11.03%",
    bottom: "48.03%",
    left: "10%",
    borderRadius: 21,
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowOffset: {
      width: 0,
      height: 31.48105239868164,
    },
    shadowRadius: 49.85,
    elevation: 49.85,
    shadowOpacity: 1,
    borderColor: "#e3a22c",
    borderWidth: 2,
    position: "absolute",
  },
  instructions: {
    height: "5%",
    color: Color.darkkhaki,
    width: "51.28%",
    top: 470,
    left: "1%",
    fontSize: FontSize.size_5xl,
    lineHeight: 48,
  },
  theGameIs: {
    top: 510,
    fontSize: 14,
    lineHeight: 40,
    textAlign: "left",
    height: 224,
    color: Color.white,
    alignItems: "flex-end",
    display: "flex",
    fontFamily: FontFamily.itimRegular,
    width: 390,
    left: 15,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  group: {
    left: "80%",
    top: "8%",
    right: "7.44%",
    bottom: "92.42%",
    width: "10.26%",
    height: "5.3%",
    position: "absolute",
  },
  howtoplay: {
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

export default HowToPlay;
