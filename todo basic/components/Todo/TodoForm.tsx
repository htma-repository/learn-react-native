import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

import ModalView from "../UI/ModalView";
import Button from "../UI/Button";
import { useStore } from "../../store/useStore";

import { ITodos } from "../../types/types";

interface ITodoFormProps {
  todoInput: string;
  editTodo: ITodos;
  onTodoInputHandler: (input: string) => void;
  onSubmitTodoHandler: () => void;
  onSetTodoInput: (input: string) => void;
  onSetEditTodo: (todo: ITodos) => void;
}

const TodoForm = ({
  todoInput,
  editTodo,
  onTodoInputHandler,
  onSubmitTodoHandler,
  onSetTodoInput,
  onSetEditTodo,
}: ITodoFormProps) => {
  const isModalShow = useStore((state) => state.isModalShow);
  const modalToggle = useStore((state) => state.isModalShowHandler);

  const modalToggleHandler = () => {
    modalToggle();
  };

  const cancelTodoHandler = () => {
    modalToggle();
    onSetTodoInput("");
    onSetEditTodo({} as ITodos);
  };

  const submitHandler = () => {
    onSubmitTodoHandler();
    modalToggle();
  };

  return (
    <>
      <Button
        title="Create Todo"
        onPress={modalToggleHandler}
        style={styles.createButton}
      />
      <ModalView isModalShow={isModalShow}>
        <View style={styles.inputContainer}>
          <Image
            source={require("../../assets/image/to-do-list.png")}
            style={styles.image}
          />
          <TextInput
            style={styles.todoInput}
            placeholder="add todo-list"
            onChangeText={onTodoInputHandler}
            value={todoInput}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={cancelTodoHandler} />
            <Button
              title={editTodo.id ? "Update" : "Submit"}
              onPress={submitHandler}
            />
          </View>
        </View>
      </ModalView>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 8,
    padding: 16,
    backgroundColor: "#00ADB5",
  },
  todoInput: {
    width: "100%",
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 4,
    color: "black",
    backgroundColor: "#EEEEEE",
  },
  buttonContainer: {
    marginVertical: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "80%",
  },
  createButton: {
    marginVertical: 32,
    paddingVertical: 16,
    width: "80%",
  },
  image: {
    width: 75,
    height: 75,
    margin: 24,
  },
});

export default TodoForm;
