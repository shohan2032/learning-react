import React from "react";
import ToDoCategories from "./ToDoCategories/ToDoCategories";
import PriorityTodos from "./ProrityToDos/PriorityTodos";

function Main() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left Sidebar - Categories */}
      <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">To-Do Categories</h2>
        <ToDoCategories />
      </div>
    
      {/* Right Section - Priority Todos */}
      <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Priority Todos</h2>
        <PriorityTodos />
      </div>
    </div>
  );                                        
}

export default Main;
