import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const truncateContent = (content) => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 my-4 flex flex-col">
      <div className="relative">
        <img
          className="w-full h-48 object-cover"
          src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
          alt="Blog Cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-4 w-full">
          <h2 className="text-white text-xl font-semibold">Title: {blog.title}</h2>
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 bg-gray-50 flex-grow">
        <p className="text-sm text-gray-700 mb-4 flex-grow">
          Content: {truncateContent(blog.content)}
        </p>
        <h5 className="text-black text-xl font-semibold">Author: {blog.author}</h5>
        <h5 className="text-black text-xl font-semibold">LikedBy: {blog.likeCount}</h5>
        <p className="text-gray-500 text-sm">
          Published: {new Date(blog.id).toLocaleDateString()}
        </p>
        <button
          onClick={() => navigate(`/blog-details/${blog.id}`)}
          className="inline-block text-center bg-green-500 text-white font-medium rounded-lg py-2 px-6 text-sm transition-colors hover:bg-green-600 focus:ring-4 focus:ring-green-300 mt-auto"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
