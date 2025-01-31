import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../slices/blog";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Favorites() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const allBlogs = useSelector((state) => state.favoriteBlogs.allBlogs);
  const favoriteBlogsId = useSelector(
    (state) => state.favoriteBlogs.favoriteBlogs.get(username) || []
  );
  const favoriteBlogs = favoriteBlogsId
    .map((blogId) => allBlogs.find((b) => b.id === blogId))
    .filter(Boolean);
  const sortedFavoriteBlogs = [...favoriteBlogs].sort((a, b) => b.id - a.id);

  const handleRemoveFavorite = async (blogId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      dispatch(removeFavorite({ username, blogId }));
      Swal.fire(
        "Removed!",
        "This blog has been removed from favorites.",
        "success"
      );
    }
  };

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now - createdAt) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} days ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} months ago`;

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  };

  const truncateContent = (content) => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        My Favorite Blogs
      </h2>

      {sortedFavoriteBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No favorite blogs found.</p>
      ) : (
        sortedFavoriteBlogs.map((blog) => (
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
            <p className="text-gray-700 mt-2">
              Content: {truncateContent(blog.content)}
            </p>
            <h3 className="text-black-500 font-semibold">
              Published: {getRelativeTime(blog.id)}
            </h3>
            <p className="text-gray-500 text-sm font-semibold">
              Estimate Reading Time: {blog.estimateReadingTime}
            </p>
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
