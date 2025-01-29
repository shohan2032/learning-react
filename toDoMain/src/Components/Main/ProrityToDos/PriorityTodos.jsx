import React from "react";
import useToDo from "../../../Context/ToDoContext";

function PriorityTodos() {
  const { todos } = useToDo();

  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow">
      {sortedTodos.length === 0 ? (
        <p className="text-gray-500 text-center">No todos available.</p>
      ) : (
        <ul className="list-disc pl-4 space-y-3">
          {sortedTodos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center text-gray-700"
            >
              <span>{todo.title}</span>
              <span
                className={`text-xs ${
                  todo.priority === "high"
                    ? "text-red-600"
                    : todo.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {todo.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PriorityTodos;
