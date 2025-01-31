import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../slices/blog";
import { useNavigate } from "react-router-dom";
function Favorites() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const truncateContent = (content) => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  const favoriteBlogsId = useSelector(
    (state) => state.favoriteBlogs.favoriteBlogs.get(username) || []
  );

  const allBlogs = useSelector((state) => state.favoriteBlogs.allBlogs);

  const favoriteBlogs = favoriteBlogsId
    .map((blogId) => allBlogs.find((b) => b.id === blogId))
    .filter(Boolean);

  const handleRemoveFavorite = (blogId) => {
    dispatch(removeFavorite({ username, blogId }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        My Favorite Blogs
      </h2>

      {favoriteBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No favorite blogs found.</p>
      ) : (
        favoriteBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg p-5 mb-4 hover:bg-gray-100 transition"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
                alt="Blog Cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Title: {blog.title}
            </h3>
            <p className="text-gray-700 mt-2">Content: {truncateContent(blog.content)}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-500">Likes: {blog.likeCount}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleRemoveFavorite(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove from Favorites
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition"
                  onClick={() => navigate(`/blog-details/${blog.id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
