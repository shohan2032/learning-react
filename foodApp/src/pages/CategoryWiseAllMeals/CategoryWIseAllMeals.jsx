import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MealCard from "../Home/MealCard";

function CategoryWiseAllMeals() {
  const { category_name } = useParams();
  const [allMeals, setAllMeals] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAllMeals = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category_name}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch meals in ${category_name}. Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setAllMeals(data.meals);
    } catch (err) {
      setError(err.message);
      setAllMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMeals();
  }, [category_name]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-500 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">
          Meals in {category_name} Category
        </h1>
        <p className="mt-2 text-lg">
          Explore a variety of delicious meals in this category
        </p>
      </div>

      <div className="container mx-auto p-6">
        {/* Loading and Error Messages */}
        {isLoading && (
          <p className="text-center text-xl text-gray-600">Loading meals...</p>
        )}
        {error && <p className="text-center text-red-500 text-xl">{error}</p>}

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
          {allMeals.length > 0
            ? allMeals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
            : !isLoading && (
                <p className="text-center text-lg text-gray-600 col-span-full">
                  No meals available in this category.
                </p>
              )}
        </div>
      </div>
    </div>
  );
}

export default CategoryWiseAllMeals;
