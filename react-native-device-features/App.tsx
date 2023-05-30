import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";

import { RootStackParamList } from "./types/types";
import { Colors } from "./constants/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
