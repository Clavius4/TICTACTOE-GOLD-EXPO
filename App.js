import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider, useToast } from 'react-native-toast-message';
import { useFonts } from "expo-font";
import Logo from "./screens/Logo";
import TwoPlayer2 from "./screens/TwoPlayer2";
import TwoPlayer from "./screens/TwoPlayer";
import OnePlayer2 from "./screens/OnePlayer2";
import OnePlayer from "./screens/OnePlayer";
import Customize from "./screens/Customize";
import Favorites from "./screens/Favorites";
import Stats from "./screens/Stats";
import HowToPlay from "./screens/HowToPlay";
import Settings from "./screens/Settings";
import HomePage from "./screens/HomePage";
import Code2 from "./screens/Code2";
import Code from "./screens/Code";
import PlayOffOn from "./screens/PlayOffOn";
import PlayOffOn2 from "./screens/PlayOffOn2";
import Ads from "./screens/Ads";
import MenuDash from "./screens/MenuDash";
import { ScreenOrientation } from 'expo';
import * as SQLite from 'expo-sqlite';

// Open or create a new SQLite database
const db = SQLite.openDatabase('t4.db');


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Slider from '@react-native-community/slider';

import { View, Text, Pressable, TouchableOpacity } from "react-native";
const Stack = createNativeStackNavigator();

// Function to initialize the database and create tables if they don't exist
function initializeDatabase() {
  db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS game_stats (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'games_played INTEGER,' +
        'games_won INTEGER,' +
        'games_lost INTEGER,' + // Add the new column "games_lost"
        'games_tied INTEGER,' +
        'win_percentage REAL,' +
        'max_win_in_a_row INTEGER,' +
        'min_victory_time INTEGER,' +
        'time_played INTEGER)'
    );

    tx.executeSql(
      'SELECT * FROM game_stats LIMIT 1',
      [],
      (_, { rows }) => {
        if (rows.length === 0) {
          // If no data exists, insert the initial data
          tx.executeSql(
            'INSERT INTO game_stats (games_played, games_won, games_lost, games_tied, win_percentage, max_win_in_a_row, min_victory_time, time_played) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [0, 0, 0, 0, 0, 0, '0', '0']
            );
          }
        },
        (_, error) => {
          console.error('Error checking database:', error);
        }
      );

      

      
  });
}

// Call the initializeDatabase function when your app starts
initializeDatabase();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  //Screen delay for logo screen to display

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 3000); // Delay for 3 seconds
  }, []);
  
  const [fontsLoaded, error] = useFonts({
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "ArchivoBlack-Regular": require("./assets/fonts/ArchivoBlack-Regular.ttf"),
    "Itim-Regular": require("./assets/fonts/Itim-Regular.ttf"),
    "InriaSans-Regular": require("./assets/fonts/InriaSans-Regular.ttf"),
    "InriaSans-Bold": require("./assets/fonts/InriaSans-Bold.ttf"),
    "IstokWeb-Bold": require("./assets/fonts/IstokWeb-Bold.ttf"),
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 4000);
  }, []);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="Logo"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Logo"
              component={Logo}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TwoPlayer2"
              component={TwoPlayer2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TwoPlayer"
              component={TwoPlayer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnePlayer2"
              component={OnePlayer2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnePlayer"
              component={OnePlayer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Customize"
              component={Customize}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Stats"
              component={Stats}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HowToPlay"
              component={HowToPlay}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Code2"
              component={Code2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Code"
              component={Code}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlayOffOn"
              component={PlayOffOn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PlayOffOn2"
              component={PlayOffOn2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Ads"
              component={Ads}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MenuDash"
              component={MenuDash}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Logo />
        )}
      </NavigationContainer>
    </>
  );
};
export default App;
