import * as React from "react";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import ScreenWrapper from "../components/ScreenWrapper";

const Settings = () => {
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [musicMuted, setMusicMuted] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const navigation = useNavigation();

  
  const toggleMusicMute = () => {
    setMusicMuted(!musicMuted);
  };

  const toggleSoundMute = () => {
    setSoundMuted(!soundMuted);
  };

  return (
    <ScreenWrapper>
    <View style={styles.settings}>
      <View style={[styles.frameParent, styles.parentBorder]}>
        <View style={[styles.vectorParent, styles.frameChildLayout]}>
          <Image
            style={[styles.frameChild, styles.frameChildLayout]}
            contentFit="cover"
            source={require("../assets/rectangle-91233.png")}
          />
          <View style={styles.ravensStudio}>
            <Text style={styles.ravensStudio1}>SETTINGS</Text>
          </View>
        </View>
        
        <Slider
        style={styles.frameItem}
        value={musicVolume}
        onValueChange={(value) => setMusicVolume(value)}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        thumbTintColor={musicMuted ? 'red' : 'white'} // Customize thumb color based on mute status
        minimumTrackTintColor={musicMuted ? 'white' : 'green'} // Customize track color based on mute status
      />
      <Slider
        style={styles.frameInner}
        value={soundVolume}
        onValueChange={(value) => setSoundVolume(value)}
        minimumValue={0}
        maximumValue={1}
        step={0.01}
        thumbTintColor={soundMuted ? 'gray' : 'white'} // Customize thumb color based on mute status
        minimumTrackTintColor={soundMuted ? 'gray' : 'green'} // Customize track color based on mute status
      />
      
        <Image
          style={[styles.musicIcon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/music2.png")}
        />
        <Image
          style={[styles.soundIcon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/sound.png")}
        />
      </View>
      <Pressable
        style={styles.group}
        onPress={() => navigation.navigate("HomePage")}
      >
        <Image
          style={[styles.icon, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/group.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.customizeParent, styles.parentPosition]}
        onPress={() => navigation.navigate("Customize")}
      >
        <Pressable
          style={[styles.customize, styles.howPosition]}
          onPress={() => navigation.navigate("Customize")}
        >
          <Text style={[styles.customize1, styles.howToPlayFlexBox]}>
            Customize
          </Text>
        </Pressable>
        <Image
          style={[styles.groupChild, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/group-22696.png")}
        />
      </Pressable>
      <View style={[styles.groupParent, styles.parentPosition]}>
        <Pressable
          style={[styles.howToPlayWrapper, styles.howPosition]}
          onPress={() => navigation.navigate("HowToPlay")}
        >
          <Pressable
            style={[styles.howToPlayContainer, styles.howPosition]}
            onPress={() => navigation.navigate("HowToPlay")}
          >
            <Text style={[styles.howToPlay, styles.howToPlayFlexBox]}>
              How To Play
            </Text>
          </Pressable>
        </Pressable>
        <Image
          style={[styles.groupItem, styles.iconGroupLayout]}
          contentFit="cover"
          source={require("../assets/group-22693.png")}
        />
      </View>
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
    width: 285,
    position: "absolute",
  },
  frameLayout: {
    height: 26,
    width: 183,
    position: "absolute",
  },
  iconGroupLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  parentPosition: {
    top: "80%",
    position: "absolute",
    flexDirection: "row",
  },
  howPosition: {
    left: "0%",
    position: "absolute",
  },
  howToPlayFlexBox: { //customize
    alignItems: "center",
    color: Color.white,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: 20,
    left: 10,
  },
  pxfuel1Icon: {
    width: 390,
    position: "absolute",
    height: 844,
    top: 0,
  },
  frameChild: {
    height: 68,
    left: 2,
    top: 0,
  },
  ravensStudio1: {
    fontSize: 34,
    lineHeight: 68,
    fontFamily: FontFamily.itimRegular,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    left: "-1%",
    flexDirection: "row",
    right: "100%",
    top: "-5%",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  ravensStudio: {
    top: -2,
    left: 44,
    width: 200,
    height: 45,
    position: "absolute",
  },
  vectorParent: {
    top: 1,
    left: 3,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#000",
    borderWidth: 0.9,
    height: 51,
    borderStyle: "solid",
    overflow: "hidden",
  },
  frameItem: { //music bar
    top: 240,
    left: 80,
    width: 200,
  },
  frameInner: { //sound bar
    top: 118,
    left: 80,
    width: 200,

  },
  slider: {
    width: '80%',
    marginVertical: 10,
  },
  musicIcon: {
    top: "69%",
    right: "78.38%",
    bottom: "29.53%",
    left: "10%",
    width: "11.53%",
    height: "8.86%",
    maxWidth: "100%",
    position: "absolute",
  },
  soundIcon: {
    top: "38%",
    right: "78.09%",
    bottom: "57.45%",
    left: "10%",
    width: "11.53%",
    height: "8.86%",
    maxWidth: "100%",
    position: "absolute",
  },
  frameParent: {
    height: "45.62%",
    width: "75.9%",
    top: "17.42%",
    right: "12.31%",
    bottom: "36.96%",
    left: "11.79%",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.14)",
    shadowOffset: {
      width: 0,
      height: 30.300195693969727,
    },
    shadowRadius: 47.98,
    elevation: 47.98,
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
    left: "81.03%",
    top: "15.76%",
    right: "8.72%",
    bottom: "79.5%",
    width: "10%",
    height: "5.1%",
    position: "absolute",
  },
  customize1: {
    height: "38.33%",
    fontSize: 13,
    flexDirection: "row"
  },
  customize: {
    top: "61%",
    
  },
  groupChild: {
    height: "55.38%",
    width: "43.65%",
    right: "28.78%",
    bottom: "44.62%",
    left: "27.56%",
    top: "0%",
    position: "absolute",
  },
  customizeParent: {
    height: "8%",
    top: 50,
    width: "20%",
    right: "3.33%",
    bottom: "10%",
    left: "76.67%",
  },
  howToPlay: {
    fontSize: 12,
    height: "100%",
    left: 10,
  },
  howToPlayContainer: {
    top: "0%",
  },
  howToPlayWrapper: {
    height: "41.11%",
    top: "58.89%",
    right: "0%",
    bottom: "0%",
    width: "100%",
  },
  groupItem: {
    height: "50.56%",
    width: "48.64%",
    right: "24.18%",
    bottom: "49.44%",
    left: "27.17%",
    top: "0%",
    position: "absolute",
  },
  groupParent: {
    height: "9%",
    flexDirection: "row",
    width: "17.69%",
    right: "78.21%",
    bottom: "18.07%",
    left: "4.1%",
  },
  settings: {
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

export default Settings;
