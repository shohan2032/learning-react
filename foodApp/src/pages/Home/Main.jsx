import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UseDebounce from "../../components/hooks/UseDebounce";
import CategoryWiseMealCard from "./CategoryWiseMealCard";
import MealCard from "./MealCard";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = UseDebounce(searchTerm, 500);
  const [selectedArea, setSelectedArea] = useState("");
  const [allMealCategory, setAllMealCategory] = useState([]);
  const [allMealByArea, setAllMealByArea] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const mealAreas = [
    "American",
    "British",
    "Canadian",
    "Chinese",
    "Croatian",
    "Dutch",
    "Egyptian",
    "Filipino",
    "French",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Jamaican",
    "Japanese",
    "Kenyan",
    "Malaysian",
    "Mexican",
    "Moroccan",
    "Polish",
    "Portuguese",
    "Russian",
    "Spanish",
    "Thai",
    "Tunisian",
    "Turkish",
    "Ukrainian",
    "Unknown",
    "Vietnamese",
  ];

  const fetchMealCategory = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setAllMealByArea([]);
      setFilteredMeals([]);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch category-wise meals. Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setAllMealCategory(data.categories);
    } catch (err) {
      setError(err.message);
      setAllMealCategory([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMealCategory();
  }, []);

  const fetchMealsByArea = async (area) => {
    try {
      setIsLoading(true);
      setError(null);
      setAllMealCategory([]);
      setFilteredMeals([]);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch meals in ${area}. Status: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setAllMealByArea(data.meals);
    } catch (err) {
      setError(err.message);
      setAllMealByArea([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAreaChange = (event) => {
    const area = event.target.value;
    setSelectedArea(area);

    if (area) {
      fetchMealsByArea(area);
      // setSelectedArea("");
    } else {
      fetchMealCategory();
    }
  };

  const fetchMealBySearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setAllMealByArea([]);
      setAllMealCategory([]);

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${debouncedSearchTerm}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch meals by search term. Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setFilteredMeals(data.meals);
    } catch (err) {
      setError(err.message);
      setFilteredMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchMealBySearch();
      setSearchTerm("");
    } else {
      fetchMealCategory();
    }
  }, [debouncedSearchTerm]);


  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar searchText={searchTerm} onChangeSearchText={setSearchTerm} />

        <div className="w-full sm:w-1/3">
          <label
            htmlFor="area-select"
            className="block text-sm font-medium text-gray-700"
          >
            Meals By Country
          </label>
          <select
            id="area-select"
            value={selectedArea}
            onChange={handleAreaChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-3 text-sm"
          >
            <option value="">All Areas</option>
            {mealAreas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
          {allMealCategory.length > 0 &&
            allMealCategory.map((category) => (
              <CategoryWiseMealCard
                key={category.idCategory}
                category={category}
              />
            ))}

          {allMealByArea.length > 0 &&
            allMealByArea.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}

          {filteredMeals.length > 0 &&
            filteredMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Main;
