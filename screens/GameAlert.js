import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GameAlert = ({ message, onRestart, onExit }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.alert}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={onRestart} style={styles.button}>
          <Text style={styles.buttonText}>Restart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onExit} style={styles.button}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    backgroundColor: 'grey',
    padding: 50,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 400,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -60,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GameAlert;
