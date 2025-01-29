import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  todos: [],
  CategoryWiseTodos: new Map(),
  addCategory: (category) => {},
  deleteCategory: (categoryName) => {},
  addTodo: (todo) => {},
  deleteTodo: (todoId) => {},
});

export const ToDoContextProvider = ToDoContext.Provider;

export default function useToDo() {
  return useContext(ToDoContext);
}
