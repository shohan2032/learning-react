import { useSelector } from "react-redux";
import BlogCard from "./Home/BlogCard";
import { Store, Blog } from "../interface/reduxInterface";
import { useEffect, useState } from "react";
import conf from "../conf/conf";
function LastTenLikedBlogs() {
  const userId = useSelector((state: Store) => state.auth.user.id);
  const [lasTenLikedBlogs, setLastTenLikedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getLastTenLikedBlogs = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${conf.apiUrl}/blog/last-ten-liked-blogs?user_id=${encodeURIComponent(
          userId
        )}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("🚀 ~ getFavoriteBlogs ~ data:", data);
      setLastTenLikedBlogs(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLastTenLikedBlogs();
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Last 10 Liked Blogs
      </h2>
      {/* Error Message */}
      {error && (
        <div className="text-center p-4 mb-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {lasTenLikedBlogs.length === 0 && !isLoading && !error ? (
        <h1 className="text-gray-500 text-center font-semibold text-xl">
          No liked blogs found.
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lasTenLikedBlogs.map(
            (blog) => blog && <BlogCard key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  );
}

export default LastTenLikedBlogs;
