import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  PressableProps,
} from "react-native";

import { Place } from "../../models/Place";
import { Colors } from "../../constants/colors";

type IPlaceItemProps = Place & PressableProps;

export default function PlaceItem({
  title,
  address,
  imageUri,
  location,
  ...props
}: IPlaceItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed, styles.container]}
      android_ripple={{ color: Colors.primary200 }}
      {...props}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 4,
    backgroundColor: Colors.primary500,
    alignItems: "flex-start",
    justifyContent: "space-between",
    columnGap: 8,
    marginBottom: 16,
  },
  titleContainer: {
    flex: 2,
    padding: 8,
  },
  image: {
    flex: 1,
    height: 125,
    width: "25%",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  addressText: { fontSize: 14, fontWeight: "400", color: Colors.gray700 },
  pressed: {
    opacity: 0.9,
  },
});
