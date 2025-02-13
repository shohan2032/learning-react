import { useSelector } from "react-redux";
import BlogCard from "./Home/BlogCard";
import { Store } from "../interface/reduxInterface";
function LastTenLikedBlogs() {
  const username = useSelector((state:Store) => state.auth.user)||"";
  const allLikedBlogs = useSelector(
    (state:Store) => state.favoriteBlogs.allLikedBlogs
  );
  const allBlogs = useSelector((state:Store) => state.favoriteBlogs.allBlogs);
  const userLikedBlogs = allLikedBlogs.get(username) || [];
  const sortedLikedBlogIds = [...userLikedBlogs].sort((a, b) => b - a);
  const lastTenLikedBlogs = sortedLikedBlogIds.slice(0, 10); // Fix for last 10 blogs
  const lastTenBlogsDetails = lastTenLikedBlogs
    .map((blogId) => allBlogs.find((blog) => blog.id === blogId))
    .filter(Boolean);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        Last 10 Liked Blogs
      </h2>

      {lastTenBlogsDetails.length === 0 ? (
        <h1 className="text-gray-500 text-center font-semibold text-xl">
          No liked blogs found.
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lastTenBlogsDetails.map((blog) => 
            blog && <BlogCard key={blog.id} blog={blog} />
          )}
        </div>
      )}
    </div>
  );
}

export default LastTenLikedBlogs;
