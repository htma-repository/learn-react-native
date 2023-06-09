import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Maps from "./screens/Maps";
import PlaceDetail from "./screens/PlaceDetail";
import MapProvider from "./store/context/MapContext";
import { initDatabase } from "./services/database";

import { RootStackParamList } from "./types/types";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        await initDatabase();
        setAppIsReady(true);
      } catch (error) {
        console.error(error);
      }
    }

    init();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <MapProvider>
        <View style={styles.root} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="AllPlaces"
              screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: Colors.gray700,
                contentStyle: { backgroundColor: Colors.gray700 },
              }}
            >
              <Stack.Screen
                name="AllPlaces"
                component={AllPlaces}
                options={{ title: "Favourite Places" }}
              />
              <Stack.Screen
                name="AddPlace"
                component={AddPlace}
                options={{ presentation: "modal", title: "Add New Place" }}
              />
              <Stack.Screen
                name="Maps"
                component={Maps}
                options={{ title: "Pick Location" }}
              />
              <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </MapProvider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
