import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TokenSelectionScreen = ({ onSelectToken }) => {
  const [selectedToken, setSelectedToken] = useState(null);

  const handleSelectToken = (token) => {
    setSelectedToken(token);
  };

  const startGame = () => {
    if (selectedToken) {
      onSelectToken(selectedToken);
    } else {
      // Show an alert or message to select a token
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Token</Text>
      <View style={styles.tokenContainer}>
        <TouchableOpacity
          style={[styles.token, selectedToken === 'X' && styles.selectedToken]}
          onPress={() => handleSelectToken('X')}
        >
          <Text style={styles.tokenText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.token, selectedToken === 'O' && styles.selectedToken]}
          onPress={() => handleSelectToken('O')}
        >
          <Text style={styles.tokenText}>O</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={startGame}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    backgroundColor: "white",
  },
  tokenContainer: {
    flexDirection: 'row',
  },
  token: {
    width: 80,
    height: 80,
    borderRadius: 40,
    fontWeight: 700,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  selectedToken: {
    backgroundColor: 'green', // You can choose your own selected token style
  },
  tokenText: {
    fontSize: 32,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default TokenSelectionScreen;
