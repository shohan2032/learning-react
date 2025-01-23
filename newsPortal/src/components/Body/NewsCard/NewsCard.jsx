import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        {/* News Image */}
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={news.urlToImage}
            alt={news.title}
          />
        </div>
        {/* News Content */}
        <div className="p-4">
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {news.title}
          </h2>
          <p className="mt-2 text-gray-500">{news.description}</p>
          <p className="mt-2 text-sm text-gray-400">Source: {news.source.name}</p>
          <div className="mt-4">
            <Link
              to={`${news.url}`}
              target="_blank"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
