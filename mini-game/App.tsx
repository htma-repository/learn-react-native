import { useState, useCallback, useEffect } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { color } from "./utils/colors";

const customFonts = {
  "Inter-Black": require("./assets/fonts/inter/Inter-Black.ttf"),
  "Inter-Bold": require("./assets/fonts/inter/Inter-Bold.ttf"),
  "Inter-ExtraBold": require("./assets/fonts/inter/Inter-ExtraBold.ttf"),
  "Inter-ExtraLight": require("./assets/fonts/inter/Inter-ExtraLight.ttf"),
  "Inter-Light": require("./assets/fonts/inter/Inter-Light.ttf"),
  "Inter-Medium": require("./assets/fonts/inter/Inter-Medium.ttf"),
  "Inter-Regular": require("./assets/fonts/inter/Inter-Regular.ttf"),
  "Inter-SemiBold": require("./assets/fonts/inter/Inter-SemiBold.ttf"),
  "Inter-Thin": require("./assets/fonts/inter/Inter-Thin.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [pickNumber, setPickedNumber] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const [maxGuesses, setMaxGuesses] = useState<number>(0);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync(customFonts);
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const pickNumberHandler = (pickedNumber: number) => {
    setPickedNumber(pickedNumber);
    setIsGameOver(false);
  };

  let screen = <HomeScreen onPickedNumber={pickNumberHandler} />;

  if (pickNumber) {
    screen = (
      <GameScreen
        userNumber={pickNumber}
        maxGuesses={maxGuesses}
        onGameOver={setIsGameOver}
        onMaxGuesses={setMaxGuesses}
      />
    );
  }

  if (pickNumber && isGameOver) {
    screen = (
      <GameOverScreen
        onSetGameOver={setIsGameOver}
        onSetPickedNumber={setPickedNumber}
        onMaxGuesses={setMaxGuesses}
        maxGuesses={maxGuesses}
        pickedNumber={pickNumber}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[color.orange, color.yellow]}
        style={styles.rootScreen}
        end={{ x: 0.7, y: 0.7 }}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          source={require("./assets/image/dice.jpg")}
          style={styles.rootScreen}
          imageStyle={styles.imgBackground}
          resizeMode="cover"
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  imgBackground: {
    opacity: 0.25,
  },
});
