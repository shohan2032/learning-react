import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryWiseMealCard({ category }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 my-4 flex flex-col">
      {/* Image Section */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={category.strCategoryThumb}
          alt={category.strCategory}
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
          <h2 className="text-white text-xl font-semibold">
            {category.strCategory}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-6 bg-gray-50 flex-grow">
        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 flex-grow">
          {category.strCategoryDescription}
        </p>

        {/* Button */}
        <button
          onClick={() => {
            navigate(`/categories/${category.strCategory}`);
          }}
          className="inline-block text-center bg-green-500 text-white font-medium rounded-lg py-2 px-6 text-sm transition-colors hover:bg-green-600 focus:ring-4 focus:ring-green-300 mt-auto"
        >
          See Meals With {category.strCategory}
        </button>
      </div>
    </div>
  );
}

export default CategoryWiseMealCard;
