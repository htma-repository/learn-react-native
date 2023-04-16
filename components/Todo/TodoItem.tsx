import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";

import { ITodos } from "../../types/types";

interface ITodoItemProps {
  id: string;
  todo: string;
  onDelete: (id: string) => void;
  onEdit: (todo: ITodos) => void;
}

const TodoItem = ({ todo, id, onDelete, onEdit }: ITodoItemProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: "#cccccc" }}
        style={({ pressed }) => [
          pressed && styles.pressedIOS,
          styles.pressContainer,
        ]}
      >
        <Text style={styles.itemText}>{todo}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={onEdit.bind(this, { id, todo })} />
          <Button
            color={"red"}
            title="Delete"
            onPress={onDelete.bind(this, id)}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 16,
    borderRadius: 6,
    elevation: 3,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  pressContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 16,
  },
  pressedIOS: {
    backgroundColor: "#ccc",
    borderRadius: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8,
  },
  itemText: {
    fontSize: 20,
    maxWidth: "60%",
  },
});

export default TodoItem;
