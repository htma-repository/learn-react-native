import { View, StyleSheet } from "react-native";

import OutlineButton from "../ui/OutlineButton";

export default function LocationPicker() {
  function openMapHandler() {}

  function pickOnMapHandler() {}

  return (
    <View style={styles.locationContainer}>
      <View style={styles.buttonContainer}>
        <OutlineButton iconName="map" onPress={openMapHandler}>
          Open Map
        </OutlineButton>
        <OutlineButton iconName="map" onPress={pickOnMapHandler}>
          Pick Location
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    width: "100%",
  },
});
