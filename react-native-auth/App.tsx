import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import AuthNavigation from "./components/Auth/AuthNavigation";
import { retrieveUserStorage } from "./utils/storage";
import { useAuthStore } from "./store/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const retrieveStorage = useAuthStore((state) => state.retrieveStorage);

  useEffect(() => {
    const getStorage = async () => {
      try {
        const accessTokenStorage = await retrieveUserStorage("accessToken");
        if (accessTokenStorage) {
          retrieveStorage(accessTokenStorage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAppIsReady(true);
      }
    };

    getStorage();
  }, [retrieveStorage, retrieveUserStorage]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
