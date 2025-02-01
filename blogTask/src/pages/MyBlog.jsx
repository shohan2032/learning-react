import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, filterBlogsByAuthor } from "../slices/blog";
import BlogEditModal from "./BlogEditModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MyBlog() {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user);
  const myBlogs = useSelector((state) => state.favoriteBlogs.myBlogs);
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
    dispatch(filterBlogsByAuthor({ author: username }));
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
        dispatch(deleteBlog({ blogId }));
        Swal.fire({
          title: "Deleted!",
          text: "Your blog has been deleted.",
          icon: "success",
          confirmButtonText: "Cool",
        });
        dispatch(filterBlogsByAuthor({ author: username }));
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
    dispatch(filterBlogsByAuthor({ author: username }));
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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        My Blogs
      </h2>
      {sortedMyBlogs.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">No blogs found.</p>
      ) : (
        sortedMyBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="relative">
              <img
                className="w-full h-56 object-cover rounded-lg"
                src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
                alt="Blog Cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mt-6">
              {blog.title}
            </h3>
            <p className="text-gray-700 mt-3">
              {truncateContent(blog.content)}
            </p>
            <div className="text-gray-500 text-sm font-semibold mt-4">
              Published: {getRelativeTime(blog.id)}
            </div>
            <h3 className="text-black-500 font-semibold mt-2">
              This blog is {blog.private ? "private" : "public"}
            </h3>
            <p className="text-gray-500 text-sm font-semibold">
              Estimate Reading Time: {blog.estimateReadingTime}
            </p>

            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-500 text-sm">Likes: {blog.likeCount}</p>

              <div className="flex space-x-6">
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => navigate(`/blog-details/${blog.id}`)}
                >
                  Details
                </button>
                <button
                  onClick={() => handleEdit(blog.id)}
                  className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200"
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
