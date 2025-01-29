import React from "react";
import useToDo from "../../../Context/ToDoContext";
import ToDoCard from "../ToDoCard";

function CategoryCard({ categoryName }) {
  const { CategoryWiseTodos, deleteCategory } = useToDo();
  const todos = CategoryWiseTodos.get(categoryName) || [];

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
      deleteCategory(categoryName);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex justify-between items-start">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{categoryName}</h3>
        <ul className="mt-4 space-y-3">
          {todos.length === 0 ? (
            <p className="text-gray-500">No tasks in this category</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id}>
                <ToDoCard todo={todo} />
              </li>
            ))
          )}
        </ul>
      </div>

      <button
        onClick={handleDelete}
        className="text-red-500 hover:text-red-700"
      >
        🗑️
      </button>
    </div>
  );
}

export default CategoryCard;
