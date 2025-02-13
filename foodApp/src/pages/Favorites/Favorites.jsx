import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MealCard from "../Home/MealCard";

function Favorites() {
  const [mealDetails, setMealDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const username = useSelector((state) => state.auth.user);
  const favoriteMeals = useSelector(
    (state) => state.favoriteMeals.favoriteMeals.get(username) || []
  );

  const fetchMealDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const mealPromises = favoriteMeals.map(async (mealId) => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch meal details for meal ID: ${mealId}. Status: ${response.status}`
          );
        }
        const data = await response.json();
        return data.meals[0];
      });

      const meals = await Promise.all(mealPromises);
      setMealDetails(meals);
    } catch (error) {
      console.error("Error fetching meal details:", error);
      setError("Failed to load favorite meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (favoriteMeals.length > 0) {
      fetchMealDetails();
    }
  }, [favoriteMeals]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white py-6 text-center">
        <h1 className="text-3xl font-bold">Your Favorite Meals</h1>
        <p className="mt-2 text-lg">
          Explore and revisit your favorite recipes anytime!
        </p>
      </div>

      <div className="container mx-auto p-6">
        {isLoading && (
          <p className="text-center text-xl text-gray-600">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 text-xl">{error}</p>}
        {!isLoading && favoriteMeals.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            You haven't added any favorite meals yet. Start exploring now!
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mealDetails.length > 0 &&
            mealDetails.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
