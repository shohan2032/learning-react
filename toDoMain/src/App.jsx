import { useState, useEffect } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { ToDoContextProvider } from "./Context/ToDoContext";

function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("Todos")) || [];
  });

  const [CategoryWiseTodos, setCategoryWiseTodos] = useState(() => {
    const storedData = localStorage.getItem("CategoryWiseTodos");
    return storedData ? new Map(JSON.parse(storedData)) : new Map();
  });

  // Save Todos to localStorage
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  // Save CategoryWiseTodos to localStorage
  useEffect(() => {
    localStorage.setItem(
      "CategoryWiseTodos",
      JSON.stringify(Array.from(CategoryWiseTodos.entries()))
    );
  }, [CategoryWiseTodos]);

  const addCategory = (categoryName) => {
    setCategoryWiseTodos((prev) => {
      if (!prev.has(categoryName)) {
        const newCategories = new Map(prev).set(categoryName, []);
        return newCategories;
      }
      return prev;
    });
  };

  const deleteCategory = (categoryName) => {
    setCategoryWiseTodos((prev) => {
      const newMap = new Map(prev);
      newMap.delete(categoryName);
      return newMap;
    });
  };

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo]);

    setCategoryWiseTodos((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(todo.category)) {
        newMap.set(todo.category, [...newMap.get(todo.category), todo]);
      } else {
        newMap.set(todo.category, [todo]);
      }
      return newMap;
    });
  };

  const deleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));

    setCategoryWiseTodos((prev) => {
      const newMap = new Map(prev);
      newMap.forEach((todos, category) => {
        newMap.set(
          category,
          todos.filter((todo) => todo.id !== todoId)
        );
      });
      return newMap;
    });
  };

  return (
    <ToDoContextProvider
      value={{
        todos,
        CategoryWiseTodos,
        addCategory,
        deleteCategory,
        addTodo,
        deleteTodo,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Main />
        </main>
        <Footer />
      </div>
    </ToDoContextProvider>
  );
}

export default App;
