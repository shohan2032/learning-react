import React, { useState } from "react";
import AddTodo from "./AddTodo";
import AddCategory from "./AddCategory";

function Header() {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  return (
    <header className="bg-gray-200 p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">ToDo App</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setShowTodoModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add ToDo
        </button>
        <button
          onClick={() => setShowCategoryModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Category
        </button>
      </div>

      {/* Modals */}
      {showTodoModal && <AddTodo closeModal={() => setShowTodoModal(false)} />}
      {showCategoryModal && (
        <AddCategory closeModal={() => setShowCategoryModal(false)} />
      )}
    </header>
  );
}

export default Header;
