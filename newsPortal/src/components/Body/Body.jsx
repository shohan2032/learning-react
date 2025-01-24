import React, { useEffect, useReducer } from "react";
import Filtering from "./Filtering/Filtering";
import NewsCard from "./NewsCard/NewsCard";
import Pagination from "./Pagination/Pagination";
import UseDebounce from "../hooks/UseDebounce";

const apiKey = "7088795b40d74fb29f483f00567079fd";

// Initial State
const initialState = {
  allNews: [],
  totalNews: 0,
  currentPage: 1,
  previousPage: 0,
  searchText: "",
  isLoading: false,
  error: null,
  cache: {},
};

// Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true, error: null };
    case "SET_NEWS":
      return {
        ...state,
        allNews: action.payload.articles,
        totalNews: action.payload.totalResults,
        cache: {
          ...state.cache,
          [action.payload.cacheKey]: action.payload.data,
        },
        isLoading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false, allNews: [] };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
        currentPage: 1,
        previousPage: 0,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
        previousPage: state.previousPage + action.step,
      };
    case "RESET_PAGE":
      return { ...state, currentPage: 1, previousPage: 0 };
    default:
      return state;
  }
};

function Body({ category }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedSearchText = UseDebounce(state.searchText, 1000);

  const fetchNews = async () => {
    const cacheKey = `${category}-${debouncedSearchText}-${state.currentPage}`;
    if (state.cache[cacheKey]) {
      dispatch({
        type: "SET_NEWS",
        payload: {
          articles: state.cache[cacheKey].articles,
          totalResults: state.cache[cacheKey].totalResults,
          cacheKey,
        },
      });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING" });
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&q=${debouncedSearchText}&page=${state.currentPage}&pageSize=5&apiKey=${apiKey}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }
        throw new Error(
          `Failed to fetch news. Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      dispatch({
        type: "SET_NEWS",
        payload: {
          articles: data.articles || [],
          totalResults: data.totalResults || 0,
          cacheKey,
          data,
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to fetch news." });
    }
  };

  useEffect(() => {
    dispatch({ type: "RESET_PAGE" });
    fetchNews();
  }, [category, debouncedSearchText]);

  useEffect(() => {
    fetchNews();
  }, [state.currentPage]);

  const handleNextPage = () => {
    dispatch({ type: "SET_PAGE", payload: state.currentPage + 1, step: 1 });
  };

  const handlePreviousPage = () => {
    dispatch({ type: "SET_PAGE", payload: state.currentPage - 1, step: -1 });
  };

  return (
    <>
      <Filtering
        searchText={state.searchText}
        onChangeSearchText={(value) =>
          dispatch({ type: "SET_SEARCH_TEXT", payload: value })
        }
      />

      {state.isLoading && <p className="text-center">Loading...</p>}
      {state.error && <p className="text-center text-red-500">{state.error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {state.allNews.length > 0
          ? state.allNews.map((news) => <NewsCard key={news.url} news={news} />)
          : !state.isLoading && (
              <p className="text-center">No news available.</p>
            )}
      </div>

      <Pagination
        totalCountOfNews={state.totalNews}
        next={state.currentPage}
        previous={state.previousPage}
        onChangeCurrentPage={handleNextPage}
        onChangePreviousPage={handlePreviousPage}
      />
    </>
  );
}

export default Body;
