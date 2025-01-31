import React from "react";
import { useSelector } from "react-redux";
import BlogCard from "./Home/BlogCard";
function LastTenLikedBlogs() {
  const username = useSelector((state) => state.auth.user);
  const allLikedBlogs = useSelector(
    (state) => state.favoriteBlogs.allLikedBlogs
  );
  const allBlogs = useSelector((state) => state.favoriteBlogs.allBlogs);
  const userLikedBlogs = allLikedBlogs.get(username) || [];
  const sortedLikedBlogIds = [...userLikedBlogs].sort((a, b) => b - a);
  const lastTenLikedBlogs = sortedLikedBlogIds.slice(0, 11);
  const lastTenBlogsDetails = lastTenLikedBlogs
    .map((blogId) => allBlogs.find((blog) => blog.id === blogId))
    .filter(Boolean);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-3xl font-semibold">
        Last 10 Liked Blogs
      </h2>

      {lastTenBlogsDetails.length === 0 ? (
        <h1 className="text-gray-500 text-center font-semibold">
          No liked blogs found.
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lastTenBlogsDetails.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LastTenLikedBlogs;
