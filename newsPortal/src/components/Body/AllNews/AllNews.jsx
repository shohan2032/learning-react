import React from "react";
import NewsCard from "./NewsCard";
import { useEffect } from "react";
function AllNews({ category }) {
    console.log(category);
  let allNews = [];
  const apiKey = "a69b0a318e82427da4c741dd0e432337";
  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then(
        (data) => {
          allNews = data.articles;
        }
      );
      console.log(allNews);
  },[category]);
  return (
    <div>
      {allNews.map((news) => (
        <NewsCard key={news.url} news={news} />
      ))}
    </div>
  );
}

export default AllNews;
