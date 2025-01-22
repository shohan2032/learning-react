import React, { useState } from "react";

function Header({category, onCategoryChange}) {
  const newsCategory = [
    "Business",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Sports",
    "Technology",
  ];

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">News Portal</h1>
        <nav>
          <ul className="flex space-x-4">
            {newsCategory.map((item) => (
              <li key={item}>
                <button
                  className={`px-3 py-2 rounded-md ${
                    category === item ? "bg-blue-500" : "bg-gray-700"
                  } hover:bg-blue-400`}
                  onClick={() => onCategoryChange(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
