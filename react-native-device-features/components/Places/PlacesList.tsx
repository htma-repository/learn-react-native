import { View, Text, FlatList } from "react-native";

import PlaceItem from "./PlaceItem";
import { Place } from "../../models/Place";

interface IPlacesList {
  PlacesData: Place[];
}

export default function PlacesList({ PlacesData }: IPlacesList) {
  if (!PlacesData || PlacesData.length === 0) {
    return (
      <View>
        <Text>Places Empty</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={PlacesData}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <PlaceItem {...item} />}
    />
  );
}
