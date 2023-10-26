import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const PlayOffOn = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      style={styles.playoffonIcon}
      resizeMode="cover"
      source={require("../assets/pxfuel-11.png")}
    >
      <View style={styles.playOnlineWithAFriendParent}>
        <Text style={styles.playOnlineWith}>Play Offline With A Friend</Text>
        <Pressable
          style={[styles.groupChild, styles.groupLayout]}
          onPress={() => navigation.navigate("Code")}
        />
        <Pressable
          style={[styles.groupItem, styles.groupLayout]}
          onPress={() => navigation.navigate("Code2")}
        />
        <Text style={[styles.inviteAFriend, styles.enterCodeTypo]}>
          INVITE A FRIEND
        </Text>
        <Text style={[styles.enterCode, styles.enterCodeTypo]}>ENTER CODE</Text>
      </View>
      {/* <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require("../assets/group.png")}
      /> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  groupLayout: {
    height: 60,
    width: 227,
    backgroundColor: Color.goldenrod_100,
    borderRadius: Border.br_8xs,
    left: 1,
    position: "absolute",
  },
  enterCodeTypo: {
    color: Color.black,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    position: "absolute",
    
  },
  playOnlineWith: {
    top: 0,
    left: 40,
    lineHeight: 30,
    fontSize: FontSize.size_xl,
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  groupChild: {
    top: 80,
  },
  groupItem: {
    top: 201,
  },
  inviteAFriend: {
    top: 94,
    left: 9,
    width: 208,
  },
  enterCode: {
    top: 212,
    left: 9,
    width: 208,
    height: 40,
  },
  playOnlineWithAFriendParent: {
    top: 182,
    left: 80,
    width: 228,
    height: 261,
    position: "absolute",
  },
  vectorIcon: {
    top: 25,
    left: 329,
    width: 40,
    height: 40,
    position: "absolute",
  },
  playoffonIcon: {
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
  },
});

export default PlayOffOn;
