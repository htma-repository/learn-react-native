import { View, Text, FlatList, StyleSheet } from "react-native";

import PlaceItem from "./PlaceItem";
import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";

interface IPlacesList {
  PlacesData: Place[];
}

export default function PlacesList({ PlacesData }: IPlacesList) {
  if (!PlacesData || PlacesData.length === 0) {
    return (
      <View style={styles.containerText}>
        <Text style={styles.textEmpty}>Places Empty</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={PlacesData}
      keyExtractor={({ id }) => id as string}
      renderItem={({ item }) => <PlaceItem {...item} />}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  containerText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textEmpty: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary50,
  },
  list: {
    marginTop: 16,
    rowGap: 8,
  },
});
