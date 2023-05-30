import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { RootStackParamList } from "../../types/types";
import { Colors } from "../../constants/styles";
import LoginScreen from "../../screens/LoginScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import WelcomeScreen from "../../screens/WelcomeScreen";
import { useAuthStore } from "../../store/store";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthNavigation() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      {isAuth ? (
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
