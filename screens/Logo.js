import * as React from "react";
import { useEffect } from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Logo = ({navigation}) => {

  useEffect(() => {
    const timer = setTimeout(() => {

      navigation.replace('HomePage'); // Navigate to the second screen

    }, 
    3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [navigation]);
  return (
    <ImageBackground
      style={styles.logoIcon}
      resizeMode="cover"
      source={require("../assets/pxfuel-11.png")}
    >
      <Text style={styles.ravensStudio}>RAVENS STUDIO</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ravensStudio: {
    fontSize: FontSize.size_17xl,
    fontWeight: "700",
    fontFamily: FontFamily.istokWebBold,
    color: Color.white,
    textAlign: "center",
  },
  logoIcon: {
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Logo;
