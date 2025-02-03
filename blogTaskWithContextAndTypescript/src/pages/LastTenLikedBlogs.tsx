import { useContext } from "react";
import BlogContext from "../contexts/blogContext";
import AuthContext from "../contexts/authContext";
import BlogCard from "./Home/BlogCard";
function LastTenLikedBlogs() {
  const { state: authState } = useContext(AuthContext);
  const { state: blogState } = useContext(BlogContext);
  const username = authState.user || "";
  const allLikedBlogs = blogState.allLikedBlogs;
  const allBlogs = blogState.allBlogs;
  const userLikedBlogs = allLikedBlogs.get(username) || [];
  const sortedLikedBlogIds = [...userLikedBlogs].sort((a, b) => b - a);
  const lastTenLikedBlogs = sortedLikedBlogIds.slice(0, 11);
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
          {lastTenBlogsDetails.map((blog) => (
            blog && <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LastTenLikedBlogs;

// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { BlogContext } from "../context/BlogContext";
// import BlogCard from "./Home/BlogCard";

// function LastTenLikedBlogs() {
//   const { state: authState } = useContext(AuthContext);
//   const { state: blogState } = useContext(BlogContext);

//   const username = authState.user;
//   const allLikedBlogs = blogState.allLikedBlogs;
//   const allBlogs = blogState.allBlogs;

//   const userLikedBlogs = allLikedBlogs.get(username) || [];
//   const sortedLikedBlogIds = [...userLikedBlogs].sort((a, b) => b - a);
//   const lastTenLikedBlogs = sortedLikedBlogIds.slice(0, 10);
//   const lastTenBlogsDetails = lastTenLikedBlogs
//     .map((blogId) => allBlogs.find((blog) => blog.id === blogId))
//     .filter(Boolean);

//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-center text-3xl font-semibold">
//         Last 10 Liked Blogs
//       </h2>

//       {lastTenBlogsDetails.length === 0 ? (
//         <h1 className="text-gray-500 text-center font-semibold">
//           No liked blogs found.
//         </h1>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {lastTenBlogsDetails.map((blog) => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LastTenLikedBlogs;
