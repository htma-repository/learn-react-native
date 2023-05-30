import { Pressable, PressableProps, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IIconButtonProps extends PressableProps {
  iconName: any;
  color: string;
  size: number;
}

function IconButton({ iconName, color, size, ...props }: IIconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      {...props}
    >
      <MaterialIcons name={iconName} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
