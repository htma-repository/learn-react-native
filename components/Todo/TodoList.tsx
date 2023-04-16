import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import TodoItem from "./TodoItem";

import { ITodos } from "../../types/types";

type TodoListProps = {
  todos: ITodos[];
  deleteHandler: (id: string) => void;
  editHandler: (todo: ITodos) => void;
};

const TodoList = ({ todos, deleteHandler, editHandler }: TodoListProps) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TodoItem
            todo={item.todo}
            id={item.id}
            onDelete={deleteHandler}
            onEdit={editHandler}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <ScrollView>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo.todo}
              id={todo.id}
              onDelete={deleteHandler}
              onEdit={editHandler}
            />
          );
        })}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1.5,
    paddingTop: 16,
  },
});

export default TodoList;
