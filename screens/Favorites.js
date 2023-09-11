import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";

const Favorites = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
    <View style={styles.favorites}>
      
      <Text style={[styles.newGames, styles.newGamesTypo]}>New Games</Text>
      <View style={[styles.vectorParent, styles.groupItemShadowBox]}>
        <Image
          style={[styles.frameChild, styles.frameChildPosition]}
          contentFit="cover"
          source={require("../assets/rectangle-9214.png")}
        />
        <Image
          style={[styles.musicIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/music.png")}
        />
        <Text
          style={[styles.wantToBe, styles.sendTypo]}
        >Want to be the first to hear about our new game releases?

Join our Newsletter</Text>
        <View style={styles.rectangleParent}>
          <View style={styles.groupChild} />
          <Text style={[styles.emailAddress, styles.sendTypo]}>
            email address
          </Text>
          <View style={[styles.groupItem, styles.groupItemShadowBox]} />
          <Text style={[styles.send, styles.sendTypo]}>SEND</Text>
        </View>
        <Text style={[styles.ravensStudio, styles.sendTypo]}>
          RAVENS STUDIO
        </Text>
      </View>
      <Pressable
        style={styles.fourInAContainer}
        onPress={() =>
          Linking.openURL(
            "https://app.sensortower.com/overview/604921715?metric=units&utab=summary&tab=about&country=US"
          )
        }
      >
        <Text style={[styles.fourInARow, styles.newGamesTypo]}>
          FOUR IN A ROW
        </Text>
      </Pressable>
      <Image
        style={[styles.row1Icon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/row-1.png")}
      />
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
    top: 0,
    position: "absolute",
  },
  newGamesTypo: {
    textAlign: "left",
    fontFamily: FontFamily.inriaSansRegular,
    color: Color.white,
  },
  groupItemShadowBox: {
    borderStyle: "solid",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 29.528661727905273,
    },
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  sendTypo: {
    fontFamily: FontFamily.istokWebBold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  pxfuel1Icon: {
    left: 0,
    width: 390,
    height: 844,
  },
  newGames: {
    top: "47.63%",
    left: "20%",
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  frameChild: {
    left: 21,
    width: 231,
    height: 2,
  },
  musicIcon: {
    height: "8.9%",
    width: "11.61%",
    top: "61.86%",
    right: "78.23%",
    bottom: "29.24%",
    left: "10.16%",
    position: "absolute",
  },
  wantToBe: {
    height: "30.41%",
    width: "88.81%",
    top: "18.07%",
    left: "6.72%",
    fontSize: 18,
    color: Color.white,
    fontWeight: "700",
  },
  groupChild: {
    height: "85.1%",
    width: "68.93%",
    top: "3.4%",
    right: "31.07%",
    bottom: "11.5%",
    left: "0%",
    borderRadius: 2,
    backgroundColor: Color.gainsboro,
    position: "absolute",
  },
  emailAddress: {
    height: "32.2%",
    width: "29.12%",
    top: "26.4%",
    left: "22%",
    fontSize: 9,
    color: Color.black,
  },
  groupItem: {
    height: "89.49%",
    width: "26.26%",
    top: "-1.91%",
    right: "-0.31%",
    bottom: "12.42%",
    left: "74.04%",
    borderRadius: 4,
    backgroundColor: "#2150c9",
    shadowColor: "#1a2769",
    shadowRadius: 0,
    elevation: 0,
    borderColor: "#181c72",
    borderWidth: 0.8,
  },
  send: {
    height: "75.9%",
    width: "19.17%",
    top: "24.1%",
    left: "80.35%",
    fontSize: 13,
    color: Color.white,
    fontWeight: "700",
  },
  rectangleParent: {
    height: "7.01%",
    width: "91.66%",
    top: "37.18%",
    right: "4.97%",
    bottom: "55.81%",
    left: "3.38%",
    position: "absolute",
  },
  ravensStudio: {
    height: "11.31%",
    width: "68.79%",
    top: "7.18%",
    left: "18.5%",
    fontSize: 25,
    color: Color.white,
    fontWeight: "700",
  },
  vectorParent: {
    height: "73.46%",
    width: "75.9%",
    top: "11.02%",
    right: "11.79%",
    bottom: "15.52%",
    left: "12.31%",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowRadius: 46.75,
    elevation: 46.75,
    borderColor: "#e3a22c",
    borderTopWidth: 2,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    overflow: "hidden",
  },
  fourInARow: {
    fontSize: FontSize.size_base,
  },
  fourInAContainer: {
    left: "28.21%",
    top: "56.04%",
    position: "absolute",
  },
  row1Icon: {
    height: "3.3%",
    width: "7.69%",
    top: "55.57%",
    right: "74.36%",
    bottom: "41.13%",
    left: "17.95%",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  group: {
    left: "81.54%",
    top: "9%",
    right: "8.21%",
    bottom: "86.26%",
    width: "10.26%",
    height: "5.3%",
    position: "absolute",
  },
  favorites: {
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

export default Favorites;
