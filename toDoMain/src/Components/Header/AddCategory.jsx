import React, { useState } from "react";
import useToDo from "../../Context/ToDoContext";

function AddCategory({ closeModal }) {
  const { addCategory } = useToDo();
  const [categoryName, setCategoryName] = useState("");

  const handleAdd = () => {
    if (!categoryName.trim()) return;
    addCategory(categoryName);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>

        <input
          type="text"
          placeholder="Category Name"
          className="w-full p-2 border rounded mb-4"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
