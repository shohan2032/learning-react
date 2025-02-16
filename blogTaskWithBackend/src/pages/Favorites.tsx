import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Store, Blog } from "../interface/reduxInterface";
import { useEffect, useState } from "react";
import conf from "../conf/conf";

function Favorites() {
  const navigate = useNavigate();
  const [favoriteBlogs, setFavoriteBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const userId = useSelector((state: Store) => state.auth.user.id);

  const getFavoriteBlogs = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${conf.apiUrl}/blog/all-favorites?user_id=${encodeURIComponent(
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
      setFavoriteBlogs(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFavoriteBlogs();
  }, [userId]);

  const removeFavorite = async (blogId: number) => {
    setIsLoading(true);
    setError("");
    const payload = {
      user_id: userId,
      blog_id: blogId,
    };
    try {
      const response = await fetch(`${conf.apiUrl}/favorite/remove-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      console.log("🚀 ~ removefavoriteTofavoriteTable ~ response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setFavoriteBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogId)
      );
      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete blog!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (blogId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      removeFavorite(blogId);
      Swal.fire(
        "Removed!",
        "This blog has been removed from favorites.",
        "success"
      );
    }
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000
    );

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

  const truncateContent = (content: string) => {
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

      {/* No Favorite Blogs Message */}
      {favoriteBlogs.length === 0 && !isLoading && !error ? (
        <p className="text-center text-2xl font-semibold text-gray-600 mt-6">
          🚀 No favorite blogs found!
        </p>
      ) : (
        favoriteBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg p-5 mb-4 hover:bg-gray-100 transition"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover rounded-md"
                src={blog.imageUrl || "https://via.placeholder.com/300"}
                alt="Blog Cover"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Title: {blog.title}
            </h3>

            <p className="text-gray-700 mt-2">
              Content: {truncateContent(blog.content)}
            </p>

            <p className="text-gray-900 font-medium">
              👤 Author: {blog.authorName || "Unknown"}
            </p>

            <p className="text-black text-xl font-semibold">
              Published: {getRelativeTime(blog.createdAt)}
            </p>

            <p className="text-gray-500 text-sm font-semibold">
              Estimate Reading Time: {blog.estimateReadingTime} min
            </p>

            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-500">👍 Likes: {blog.likeCount}</p>

              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition"
                  onClick={() => navigate(`/blog-details/${blog.id}`)}
                >
                  Details
                </button>
                <button
                  onClick={() => handleRemoveFavorite(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove
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
