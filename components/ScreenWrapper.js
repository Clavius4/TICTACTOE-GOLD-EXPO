import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const ScreenWrapper = ({ children }) => (
    <ImageBackground
      source={require('../assets/pxfuel-1.png')}
      style={styles.background}>
        {children}
    </ImageBackground>
  );


const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
  container: {
    flex: 1,  
  },
});

export default ScreenWrapper;
