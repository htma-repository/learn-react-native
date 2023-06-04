import { Pressable, View, Text, StyleSheet } from "react-native";

import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";

export default function PlaceItem({ address, location, title }: Place) {
  return (
    <Pressable style={styles.itemContainer}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.addressText}>{address}</Text>
        <View style={styles.locationContainer}>
          <Text>{location.latitude}</Text>
          <Text>{location.longitude}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent500,
    padding: 8,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    elevation: 2,
  },
  container: {
    rowGap: 8,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary700,
    marginVertical: 4,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.primary50,
  },
});
