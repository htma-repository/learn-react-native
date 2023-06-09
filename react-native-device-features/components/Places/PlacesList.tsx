import { View, Text, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import PlaceItem from "./PlaceItem";
import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";

import { AllPlacesScreenNavigationProp } from "../../types/types";

interface IPlacesList {
  PlacesData: Place[];
}

export default function PlacesList({ PlacesData }: IPlacesList) {
  const navigation = useNavigation<AllPlacesScreenNavigationProp>();

  function viewDetailHandler(id: string) {
    navigation.navigate("PlaceDetail", { placeId: id });
  }

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
      renderItem={({ item }) => (
        <PlaceItem
          {...item}
          onPress={viewDetailHandler.bind(null, item.id as string)}
        />
      )}
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
    margin: 16,
  },
});
