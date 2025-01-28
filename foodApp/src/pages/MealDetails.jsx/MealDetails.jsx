import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../slices/favoriteMealsSlice";
import Swal from "sweetalert2";


function MealDetails() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);
  const favoriteMeals = useSelector(
    (state) => state.favoriteMeals.favoriteMeals.get(username) || []
  );
  //   console.log(username);
  const isFavorite = favoriteMeals.includes(mealId);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal details:", error);
        setError(error.message);
      }
    };
    fetchMealDetails();
  }, [mealId]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ username, mealId }));
    } else {
      Swal.fire({
        title: "Successfully Save To Favorite",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
      dispatch(addFavorite({ username, mealId }));
    }
  };

  if (!meal) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded-xl shadow-lg mb-6"
      />
      <div className="text-center">
        <p className="text-lg mb-2">
          <span className="font-semibold">Category:</span> {meal.strCategory}
        </p>
        <p className="text-lg mb-4">
          <span className="font-semibold">Area:</span> {meal.strArea}
        </p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        {meal.strInstructions}
      </p>
      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <ul className="list-disc pl-6 mb-6">
        {Array.from({ length: 20 }, (_, index) => index + 1).map((i) => {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            return (
              <li key={i} className="text-gray-700">
                {ingredient} - {measure}
              </li>
            );
          }
          return null;
        })}
      </ul>
      {username && (
        <div className="flex justify-center">
          <button
            onClick={handleFavoriteClick}
            className={`px-6 py-2 rounded-lg font-medium shadow-md transition ${
              isFavorite
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">
          Video Recipe:{" "}
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Watch here
          </a>
        </p>
      </div>
    </div>
  );
}

export default MealDetails;
