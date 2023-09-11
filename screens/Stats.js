import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";

const Stats = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
    <View style={styles.stats}>
      <Image
        style={[styles.pxfuel1Icon, styles.frameChildPosition]}
        contentFit="cover"
        source={require("../assets/pxfuel-11.png")}
      />
      <View style={[styles.frameParent, styles.parentBorder]}>
        <View style={[styles.vectorParent, styles.frameChildLayout]}>
          <Image
            style={[styles.frameChild, styles.frameChildLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-91231.png")}
          />
          <View style={[styles.ravensStudio, styles.frameInnerLayout]}>
            <Text style={[styles.ravensStudio1, styles.iconLayout1]}>
              PROGRESS
            </Text>
          </View>
        </View>
        <Image
          style={styles.frameItem}
          contentFit="cover"
          source={require("../assets/rectangle-92141.png")}
        />
        <Image
          style={[styles.frameInner, styles.frameInnerLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-9219.png")}
        />
        <Image
          style={[styles.musicIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/music1.png")}
        />
       <Text style={styles.gamesPlayed20}>
    Games Played                         20{'\n'}
    Games Won                             10{'\n'}
    Games Tied                             4{'\n'}
    Win Percentage                      50%{'\n'}
    Max win in a row                    3{'\n'}
    Min victory time                    1 min{'\n'}
    Time Played                           2 hrs
</Text>


      </View>
      <Pressable
        style={styles.group}
        onPress={() => navigation.navigate("HomePage")}
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
  frameChildPosition: {
    left: 0,
    top: 0,
  },
  parentBorder: {
    borderStyle: "solid",
    overflow: "hidden",
  },
  frameChildLayout: {
    height: 60,
    width: 334,
    position: "absolute",
  },
  frameInnerLayout: {
    height: 42,
    position: "absolute",
  },
  iconLayout1: {
    height: "100%",
    width: "100%",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  pxfuel1Icon: {
    width: 390,
    position: "absolute",
    height: 844,
    left: 0,
  },
  frameChild: {
    left: 0,
    top: 0,
  },
  ravensStudio1: {
    top: "-10%",
    fontWeight: "500",
    left: "-7%",
    fontSize: 31,
    lineHeight: 62,
    fontFamily: FontFamily.itimRegular,
    textAlign: "center",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    position: "absolute",
  },
  ravensStudio: {
    top: 6,
    left: 73,
    width: 207,
  },
  vectorParent: {
    top: 2,
    left: 3,
    borderTopLeftRadius: 29,
    borderTopRightRadius: 29,
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    overflow: "hidden",
  },
  frameItem: {
    left: 25,
    width: 278,
    height: 2,
    top: 0,
    position: "absolute",
  },
  frameInner: {
    top: 415,
    left: 27,
    width: 267,
    opacity: 0.5,
  },
  musicIcon: {
    height: "7.58%",
    width: "9.86%",
    top: "61.7%",
    right: "80.03%",
    bottom: "30.72%",
    left: "10.11%",
    position: "absolute",
  },
  gamesPlayed20: {
    top: "27.52%",
    lineHeight: 33,
    left: "3%",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: FontFamily.inriaSansBold,
    color: Color.white,
    textAlign: "left",
    position: "absolute",
  },
  frameParent: {
    height: "53.38%",
    width: "88.77%",
    top: "19.79%",
    right: "5.08%",
    bottom: "26.83%",
    left: "6.15%",
    borderRadius: 24,
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowOffset: {
      width: 0,
      height: 35.50893020629883,
    },
    shadowRadius: 56.22,
    elevation: 56.22,
    shadowOpacity: 1,
    borderColor: "#e3a22c",
    borderWidth: 2,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  group: {
    left: "87.69%",
    top: "18.25%",
    right: "2.05%",
    bottom: "77.01%",
    width: "10.26%",
    height: "5.3%",
    position: "absolute",
  },
  stats: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    // backgroundColor: Color.white,
    // flex: 1,
    // overflow: "hidden",
    // width: "100%",
    // height: 844,
  },
});

export default Stats;
