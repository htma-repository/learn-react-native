import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

export default function App() {
  async function locationHandler() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Alert", "Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log({ location });
  }

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Button title="get Location" onPress={locationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
