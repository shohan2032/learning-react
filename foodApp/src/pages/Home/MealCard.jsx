import React from "react";
import { useNavigate } from "react-router-dom";

function MealCard({ meal }) {
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 my-4">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
          <h2 className="text-white text-xl font-semibold">{meal.strMeal}</h2>
        </div>
      </div>
      <div className="p-6 bg-gray-50">
        <button
          onClick={() => {
            navigate(`/meals/${meal.idMeal}`);
          }}
          className="inline-block text-center bg-green-500 text-white font-medium rounded-lg py-2 px-6 text-sm transition-colors hover:bg-green-600 focus:ring-4 focus:ring-green-300"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default MealCard;
