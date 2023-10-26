import { useState, useEffect } from 'react';
import { checkWin, isTie, makeEasyMove, makeMediumMove, makeHardMove } from '../screens/Result';

const useAIGameplay = (gameLevel, map, currentTurn, setMap, setGameOver, showAlert) => {
  useEffect(() => {
    if (currentTurn === 'O') {
      // AI's turn based on the selected game level
      let move;

      switch (gameLevel) {
        case 'BOT_EASY':
          move = makeEasyMove(map, 'O');
          break;
        case 'BOT_MEDIUM':
          move = makeMediumMove(map, 'O');
          break;
        case 'BOT_HARD':
          move = makeHardMove(map, 'O');
          break;
        default:
          // Handle unknown game level
          break;
      }

      if (move) {
        const [row, col] = move;
        const updatedMap = [...map];
        updatedMap[row][col] = 'O';
        setMap(updatedMap);

        if (checkWin(updatedMap, 'O')) {
          setGameOver(true);
          showAlert('AI wins!', 'Restart', 'Exit', resetGame, exitGame);
        } else if (isTie(updatedMap)) {
          setGameOver(true);
          showAlert('It\'s a tie!', 'Restart', 'Exit', resetGame, exitGame);
        }

        setCurrentTurn('X');
      }
    }
  }, [map, currentTurn]);

  return {
    // You can return any state or functions that your component might need.
    // For example, you can return a function to reset the game.
    resetGame,
  };
};

export default useAIGameplay;
