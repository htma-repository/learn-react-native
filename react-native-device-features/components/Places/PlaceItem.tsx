import { Pressable, View, Text } from "react-native";

import { Place } from "../../models/Place";

export default function PlaceItem({ address, location, title }: Place) {
  return (
    <Pressable>
      <View>
        <Text>{title}</Text>
        <Text>{address}</Text>
        <View>
          <Text>{location.lat}</Text>
          <Text>{location.long}</Text>
        </View>
      </View>
    </Pressable>
  );
}
