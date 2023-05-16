import {
  View,
  Text,
  Pressable,
  PressableProps,
  StyleSheet,
} from "react-native";

import Card from "../UI/Card";
import { colors } from "../../utils/colors";

interface ICategoryItem extends PressableProps {
  categoryName: string;
  backgroundColor: string;
  onPress?: () => void;
}

const CategoryItem = ({
  categoryName,
  backgroundColor,
  onPress,
  ...props
}: ICategoryItem) => {
  return (
    <Card style={[styles.itemContainer, { backgroundColor }]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: colors.white }}
        style={({ pressed }) => [
          pressed && styles.rippleIOS,
          styles.pressContainer,
        ]}
        {...props}
      >
        <View style={[styles.innerContainer]}>
          <Text style={styles.itemText}>{categoryName}</Text>
        </View>
      </Pressable>
    </Card>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    height: 125,
    margin: 16,
  },
  pressContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rippleIOS: {
    opacity: 0.75,
  },
});
