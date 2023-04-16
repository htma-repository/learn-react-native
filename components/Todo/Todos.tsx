import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useStore } from "../../store/useStore";

import { ITodos } from "../../types/types";

const Todos = () => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<ITodos[]>([] as ITodos[]);
  const [editTodo, setEditTodo] = useState<ITodos>({} as ITodos);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const toggleModal = useStore((state) => state.isModalShowHandler);

  useEffect(() => {
    setIsEmpty(false);
  }, [todoInput, todos]);

  const todoInputHandler = (input: string) => {
    setTodoInput(input);
  };

  const submitTodoHandler = () => {
    if (todoInput.length === 0) {
      setIsEmpty(true);
      return;
    }

    if (editTodo.id) {
      const editedTodo: ITodos = {
        id: editTodo.id,
        todo: todoInput,
      };

      const indexTodo = todos.findIndex((todo) => todo.id === editTodo.id);

      const updatedTodos = [...todos];
      updatedTodos[indexTodo] = editedTodo;

      setTodos(updatedTodos);
      setTodoInput("");
      setEditTodo({} as ITodos);
      return;
    }

    const newTodo: ITodos = {
      id: Date.now().toString(),
      todo: todoInput,
    };

    setTodos((prevState) => [...prevState, newTodo]);
    setTodoInput("");
  };

  const editHandler = (todo: ITodos) => {
    setEditTodo(todo);
    setTodoInput(todo.todo);
    toggleModal();
  };

  const deleteHandler = (id: string) => {
    setTodos((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <View style={[styles.container, styles.layout]}>
      <Text style={styles.titleText}>Todo</Text>
      {todos.length === 0 ? (
        <View style={styles.todoEmptyContainer}>
          <Image
            source={require("../../assets/image/empty.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.todoEmpty}>Todo Empty</Text>
        </View>
      ) : (
        <TodoList
          todos={todos}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      )}

      {isEmpty && (
        <Text style={[styles.emptyMessage, styles.layout]}>
          input todo correctly!
        </Text>
      )}
      <View style={styles.formContainer}>
        <TodoForm
          todoInput={todoInput}
          editTodo={editTodo}
          onTodoInputHandler={todoInputHandler}
          onSubmitTodoHandler={submitTodoHandler}
          onSetTodoInput={setTodoInput}
          onSetEditTodo={setEditTodo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    paddingTop: 50,
    rowGap: 16,
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 28,
    marginVertical: 24,
  },
  emptyMessage: {
    textTransform: "uppercase",
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  todoEmptyContainer: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  todoEmpty: {
    fontSize: 24,
    color: "green",
    fontWeight: "bold",
  },
  emptyImage: {
    width: 75,
    height: 75,
    margin: 16,
  },
});

export default Todos;
