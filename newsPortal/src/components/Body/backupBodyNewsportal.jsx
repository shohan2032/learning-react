import React, { useEffect, useState } from "react";
import Filtering from "./Filtering/Filtering";
import NewsCard from "./NewsCard/NewsCard";
import Pagination from "./Pagination/Pagination";
import UseDebounce from "../hooks/UseDebounce";

function Body({ category }) {
  const [allNews, setAllNews] = useState([]);
  const [totalNews, setTotalNews] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [searchText, setsearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  const apiKey = "7088795b40d74fb29f483f00567079fd";
  const debouncedSearchText = UseDebounce(searchText, 1000);

  const fetchNews = async () => {
    const cacheKey = `${category}-${debouncedSearchText}-${currentPage}`;
    if (cache[cacheKey]) {
      setAllNews(cache[cacheKey].articles);
      setTotalNews(cache[cacheKey].totalResults);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&q=${debouncedSearchText}&page=${currentPage}&pageSize=5&apiKey=${apiKey}`
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
      setAllNews(data.articles || []);
      setTotalNews(data.totalResults || 0);
      setCache((prev) => ({
        ...prev,
        [cacheKey]: data,
      }));
    } catch (err) {
      setError(err.message);
      setAllNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setPreviousPage(0);
    fetchNews();
  }, [category, debouncedSearchText]);

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setPreviousPage(previousPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setPreviousPage(previousPage - 1);
  };

  return (
    <>
      <Filtering searchText={searchText} onChangeSearchText={setsearchText} />

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {allNews.length > 0
          ? allNews.map((news) => <NewsCard key={news.url} news={news} />)
          : !isLoading && <p className="text-center">No news available.</p>}
      </div>

      <Pagination
        totalCountOfNews={totalNews}
        next={currentPage}
        previous={previousPage}
        onChangeCurrentPage={handleNextPage}
        onChangePreviousPage={handlePreviousPage}
      />
    </>
  );
}

export default Body;
