import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/authContext";
import BlogContext from "../contexts/blogContext";
import BlogEditModal from "./BlogEditModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MyBlog() {
  const { state: authState } = useContext(AuthContext);
  const { state: blogState, dispatch } = useContext(BlogContext);
  const username = authState.user;
  const myBlogs = blogState.myBlogs;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const navigate = useNavigate();

  const sortedMyBlogs = [...myBlogs].sort((a, b) => b.id - a.id);

  const truncateContent = (content) => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  useEffect(() => {
    dispatch({
      type: "filterBlogsByAuthor",
      payload: { author: username },
    });
  }, [dispatch, username]);

  const handleDelete = (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "deleteBlog",
          payload: { blogId },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your blog has been deleted.",
          icon: "success",
          confirmButtonText: "Cool",
        });
        dispatch({
          type: "filterBlogsByAuthor",
          payload: { author: username },
        });
      }
    });
  };

  const handleEdit = (blogId) => {
    setCurrentBlogId(blogId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlogId(null);
    dispatch({
      type: "filterBlogsByAuthor",
      payload: { author: username },
    });
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        My Blogs
      </h2>
      {sortedMyBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        sortedMyBlogs.map((blog) => (
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
            <p className="text-black text-xl font-semibold">
              Published: {getRelativeTime(blog.id)}
            </p>
            <h3 className="text-black-500 font-semibold">
              This blog is {blog.private ? "private" : "public"}
            </h3>
            <p className="text-gray-500 text-sm font-semibold">
              Estimate Reading Time: {blog.estimateReadingTime}
            </p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-500">Likes: {blog.likeCount}</p>

              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md transition"
                  onClick={() => navigate(`/blog-details/${blog.id}`)}
                >
                  Details
                </button>
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {isModalOpen && (
        <BlogEditModal blogId={currentBlogId} closeModal={closeModal} />
      )}
    </div>
  );
}

export default MyBlog;

// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { BlogContext } from "../context/BlogContext";
// import BlogEditModal from "./BlogEditModal";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

// function MyBlog() {
//   const { state: authState } = useContext(AuthContext);
//   const { state: blogState, dispatch: blogDispatch } = useContext(BlogContext);

//   const username = authState.user;
//   const myBlogs = blogState.myBlogs;
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentBlogId, setCurrentBlogId] = useState(null);
//   const navigate = useNavigate();

//   const sortedMyBlogs = [...myBlogs].sort((a, b) => b.id - a.id);

//   const truncateContent = (content) => {
//     return (
//       content.split(" ").slice(0, 100).join(" ") +
//       (content.split(" ").length > 100 ? "..." : "")
//     );
//   };

//   useEffect(() => {
//     blogDispatch({ type: "FILTER_BLOGS_BY_AUTHOR", payload: { author: username } });
//   }, [blogDispatch, username]);

//   const handleDelete = (blogId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         blogDispatch({ type: "DELETE_BLOG", payload: { blogId } });
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your blog has been deleted.",
//           icon: "success",
//           confirmButtonText: "Cool",
//         });
//         blogDispatch({ type: "FILTER_BLOGS_BY_AUTHOR", payload: { author: username } });
//       }
//     });
//   };

//   const handleEdit = (blogId) => {
//     setCurrentBlogId(blogId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentBlogId(null);
//     blogDispatch({ type: "FILTER_BLOGS_BY_AUTHOR", payload: { author: username } });
//   };

//   const getRelativeTime = (timestamp) => {
//     const now = new Date();
//     const createdAt = new Date(timestamp);
//     const diffInSeconds = Math.floor((now - createdAt) / 1000);

//     if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24) return `${diffInHours} hours ago`;

//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays < 30) return `${diffInDays} days ago`;

//     const diffInMonths = Math.floor(diffInDays / 30);
//     if (diffInMonths < 12) return `${diffInMonths} months ago`;

//     const diffInYears = Math.floor(diffInMonths / 12);
//     return `${diffInYears} years ago`;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
//         My Blogs
//       </h2>
//       {sortedMyBlogs.length === 0 ? (
//         <p className="text-center text-gray-500">No blogs found.</p>
//       ) : (
//         sortedMyBlogs.map((blog) => (
//           <div
//             key={blog.id}
//             className="bg-white shadow-md rounded-lg p-5 mb-4 hover:bg-gray-100 transition"
//           >
//             <div className="relative">
//               <img
//                 className="w-full h-48 object-cover"
//                 src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
//                 alt="Blog Cover"
//               />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900">
//               Title: {blog.title}
//             </h3>
//             <p className="text-gray-700 mt-2">Content: {truncateContent(blog.content)}</p>
//             <p className="text-black text-xl font-semibold">
//               Published: {getRelativeTime(blog.id)}
//             </p>
//             <h3 className="text-black-500 font-semibold">This blog is {blog.private ? "private" : "public"}</h3>
//             <p className="text-gray-500 text-sm font-semibold">
//               Estimate Reading Time: {blog.estimateReadingTime}
//             </p>
//             <div className="flex justify-between items-center mt-4">
//               <p className="text-gray-500">Likes: {blog.likeCount}</p>
//               <div className="flex space-x-4">
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md transition"
//                   onClick={() => navigate(`/blog-details/${blog.id}`)}
//                 >
//                   Details
//                 </button>
//                 <button
//                   onClick={() => handleEdit(blog.id)}
//                   className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(blog.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {isModalOpen && (
//         <BlogEditModal blogId={currentBlogId} closeModal={closeModal} />
//       )}
//     </div>
//   );
// }

// export default MyBlog;
