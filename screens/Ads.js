import * as React from "react";
import { Text, StyleSheet, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

const Ads = () => {
  return (
    <ImageBackground
      style={styles.adsIcon}
      resizeMode="cover"
      source={require("../assets/pxfuel-11.png")}
    >
      <Text style={[styles.removeAds, styles.removeAdsTypo]}>REMOVE ADS</Text>
      <Text style={[styles.subscriptions, styles.removeAdsTypo]}>
        SUBSCRIPTIONS
      </Text>
      <View style={[styles.adsChild, styles.adsLayout]} />
      <View style={[styles.adsItem, styles.adsLayout]} />
      <View style={[styles.adsInner, styles.adsLayout]} />
      <Text style={[styles.month099, styles.month099Typo]}>1 Month $0.99</Text>
      <Text style={styles.months199}>3 Months $1.99</Text>
      <Text style={[styles.months499, styles.month099Typo]}>
        12 Months $4.99
      </Text>
      <Text style={styles.yourSubscriptionWill}>Your subscription
will be.......</Text>
      <View style={[styles.button, styles.buttonLayout1]}>
        <View style={[styles.buttonChild, styles.childShadowBox]} />
        <View style={[styles.rectangleParent, styles.rectanglePosition]}>
          <LinearGradient
            style={[styles.frameChild, styles.frameChildBg]}
            locations={[0, 1]}
            colors={["#fff", "rgba(255, 255, 255, 0)"]}
          />
          <View style={[styles.frameItem, styles.framePosition]} />
          <Image
            style={[styles.frameInner, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-285.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-295.png")}
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
          <Text style={[styles.cancel, styles.saveTypo]}>Cancel</Text>
        </View>
      </View>
      <View style={[styles.button1, styles.button1Layout]}>
        <View style={[styles.buttonItem, styles.buttonItemShadowBox]} />
        <View style={[styles.rectangleGroup, styles.button1Layout]}>
          <LinearGradient
            style={[styles.frameChild2, styles.buttonItemShadowBox]}
            locations={[0, 1]}
            colors={["#fff", "rgba(255, 255, 255, 0)"]}
          />
          <View style={[styles.frameItem, styles.framePosition]} />
          <Image
            style={[styles.frameInner, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-286.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.frameInnerLayout]}
            contentFit="cover"
            source={require("../assets/ellipse-296.png")}
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
          <Text style={[styles.save, styles.saveTypo]}>Save</Text>
        </View>
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  removeAdsTypo: {
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  adsLayout: {
    height: 60,
    width: 227,
    backgroundColor: Color.goldenrod_100,
    borderRadius: Border.br_8xs,
    left: 81,
    position: "absolute",
  },
  month099Typo: {
    width: 208,
    color: Color.black,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  buttonLayout1: {
    height: 47,
    top: 636,
  },
  childShadowBox: {
    shadowOpacity: 1,
    elevation: 4.02,
    shadowRadius: 4.02,
    shadowOffset: {
      width: 0,
      height: 2.0096230506896973,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  rectanglePosition: {
    height: 44,
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  frameChildBg: {
    backgroundColor: "transparent",
    height: "100%",
    top: "0%",
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
  saveTypo: {
    textShadowOffset: {
      width: 1.0048116445541382,
      height: 0,
    },
    textShadowColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.archivoBlackRegular,
    letterSpacing: 0.6,
    left: "17.83%",
    top: "30.33%",
    width: "64.33%",
    textAlign: "center",
    color: Color.white,
    position: "absolute",
  },
  button1Layout: {
    width: 127,
    position: "absolute",
  },
  buttonItemShadowBox: {
    elevation: 4.27,
    shadowRadius: 4.27,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2.0096230506896973,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    left: "0%",
    bottom: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  removeAds: {
    top: 67,
    fontSize: 32,
    left: 102,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
  },
  subscriptions: {
    top: 135,
    left: 121,
    fontSize: FontSize.size_xl,
  },
  adsChild: {
    top: 215,
  },
  adsItem: {
    top: 328,
  },
  adsInner: {
    top: 427,
  },
  month099: {
    top: 229,
    left: 89,
  },
  months199: {
    top: 342,
    left: 91,
    width: 207,
    color: Color.black,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  months499: {
    top: 445,
    left: 87,
  },
  yourSubscriptionWill: {
    top: 526,
    fontSize: FontSize.size_5xl,
    textAlign: "center",
    color: Color.white,
    fontFamily: FontFamily.inriaSansBold,
    fontWeight: "700",
    left: "11%",
    position: "absolute",
  },
  buttonChild: {
    backgroundColor: Color.darkkhaki,
    top: "6.63%",
    height: "93.37%",
    borderRadius: 10,
  },
  frameChild: {
    shadowOpacity: 1,
    elevation: 4.02,
    shadowRadius: 4.02,
    shadowOffset: {
      width: 0,
      height: 2.0096230506896973,
    },
    shadowColor: "rgba(0, 0, 0, 0.14)",
    left: "0%",
    bottom: "0%",
    right: "0%",
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
  cancel: {
    fontSize: 19,
    textShadowRadius: 3.01,
  },
  rectangleParent: {
    borderRadius: 10,
    width: 120,
    position: "absolute",
  },
  button: {
    left: 50,
    width: 120,
    position: "absolute",
  },
  buttonItem: {
    borderRadius: 11,
    backgroundColor: Color.darkkhaki,
    top: "6.63%",
    height: "93.37%",
  },
  frameChild2: {
    backgroundColor: "transparent",
    height: "100%",
    top: "0%",
  },
  save: {
    height: "46.8%",
    fontSize: 20,
    textShadowRadius: 3.21,
  },
  rectangleGroup: {
    borderRadius: 11,
    height: 44,
    left: 0,
    top: 0,
    overflow: "hidden",
  },
  button1: {
    left: 202,
    height: 47,
    top: 636,
  },
  vectorIcon: {
    top: 25,
    left: 329,
    width: 40,
    height: 40,
    position: "absolute",
  },
  adsIcon: {
    flex: 1,
    height: 844,
    overflow: "hidden",
    width: "100%",
  },
});

export default Ads;
