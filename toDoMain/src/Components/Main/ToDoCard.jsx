import React from "react";

function ToDoCard({ todo }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-400">
      <h4 className="text-md font-semibold">{todo.title}</h4>
      <p className="text-sm text-gray-600">{todo.description}</p>
      <span
        className={`text-xs ${
          todo.priority === "high"
            ? "text-red-600"
            : todo.priority === "medium"
            ? "text-yellow-500"
            : "text-green-500"
        }`}
      >
        {todo.priority} priority
      </span>
    </div>
  );
}

export default ToDoCard;
