import {
  Pressable,
  Text,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "../../constants/colors";

interface IOutlineButtonProps extends PressableProps {
  children: React.ReactNode;
  iconName: any;
}

export default function OutlineButton({
  children,
  iconName,
  ...props
}: IOutlineButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      {...props}
    >
      <View style={styles.buttonInnerContainer}>
        <MaterialIcons name={iconName} size={24} color={Colors.primary500} />
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray700,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.primary500,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
});
