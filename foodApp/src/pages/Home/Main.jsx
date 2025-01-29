import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import UseDebounce from "../../components/hooks/UseDebounce";
import CategoryWiseMealCard from "./CategoryWiseMealCard";
import MealCard from "./MealCard";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  // const debouncedSearchTerm = UseDebounce(searchTerm, 500);
  const [selectedArea, setSelectedArea] = useState("");
  const [allMealCategory, setAllMealCategory] = useState([]);
  const [allMealByArea, setAllMealByArea] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedMeal, setSavedMeal] = useState([]);
  const [isMealCategory, setIsMealCategory] = useState(true);
  
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
      setSelectedArea("");
      setIsMealCategory(true);

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
      setSavedMeal(data.categories);
      setIsMealCategory(true);
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
      setIsMealCategory(false);

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
      setSavedMeal(data.meals);
      setIsMealCategory(false);
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
    } else {
      fetchMealCategory();
    }
  };

  useEffect(() => {
    if (searchTerm) {
      if (isMealCategory) {
        const filteredResults = savedMeal.filter((meal) =>
          meal.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMeals(filteredResults);
        setAllMealCategory([]);
        setAllMealByArea([]);
      } else {
        const filteredResults = savedMeal.filter((meal) =>
          meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMeals(filteredResults);
        setAllMealCategory([]);
        setAllMealByArea([]);
      }
    } else {
      if (isMealCategory) {
        fetchMealCategory();
      } else {
        setFilteredMeals(savedMeal);
      }
    }
  }, [searchTerm]);

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
        {selectedArea && (
          <button
            onClick={() => {
              setSelectedArea("");
              setAllMealByArea([]);
              fetchMealCategory();
            }}
            className="mt-6 px-3 py-2 bg-blue-700 text-white rounded-md hover:bg-red-600 transition text-sm"
          >
            Cancel
          </button>
        )}
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

          {filteredMeals.length > 0 && isMealCategory
            ? filteredMeals.map((category) => (
                <CategoryWiseMealCard
                  key={category.idCategory}
                  category={category}
                />
              ))
            : filteredMeals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
        </div>
      )}
    </div>
  );
}

export default Main;
