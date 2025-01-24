import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <p className="mt-2 text-sm text-gray-400">
            Source: {news.source.name}
          </p>
          <div className="mt-4">
            <Link
              to={`${news.url}`}
              target="_blank"
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              News Link
            </Link>
          </div>
          {/* Read More Button */}
          <button
            onClick={openModal}
            className="mt-4 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={closeModal} // Close modal when clicking outside
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside modal
          >
            <div className="mb-4">
              <img
                className="w-full rounded-lg"
                src={news.urlToImage}
                alt="news"
              />
            </div>
            <p className="text-gray-700">{news.content}</p>

            <button
              onClick={closeModal}
              className="mt-4 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
