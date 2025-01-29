import React, { useState } from "react";
import useToDo from "../../../Context/ToDoContext";
import CategoryCard from "./CategoryCard";

function ToDoCategories() {
  const { CategoryWiseTodos, addCategory } = useToDo();

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Categories</h2>

      {/* Display Categories */}
      {Array.from(CategoryWiseTodos.keys()).length === 0 ? (
        <p className="text-gray-500 text-center mt-4">
          No categories available.
        </p>
      ) : (
        Array.from(CategoryWiseTodos.keys()).map((category) => (
          <CategoryCard key={category} categoryName={category} />
        ))
      )}
    </div>
  );
}

export default ToDoCategories;
