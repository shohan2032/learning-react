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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        My Blogs
      </h2>
      {myBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        myBlogs.map((blog) => (
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
            <h3 className="text-black-500 font-semibold">This blog is {blog.private?"private":"public"}</h3>
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
