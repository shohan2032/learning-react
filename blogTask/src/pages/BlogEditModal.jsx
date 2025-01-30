import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../slices/blog";
import Swal from "sweetalert2";

function BlogEditModal({ blogId, closeModal }) {
  const dispatch = useDispatch();
  const blog = useSelector((state) =>
    state.favoriteBlogs.allBlogs.find((b) => b.id === blogId)
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    isPrivate: false,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        author: blog.author,
        content: blog.content,
        isPrivate: blog.private,
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBlog({ blogId, ...formData }));

    // Show a sweet success message after saving changes
    Swal.fire({
      title: "Success!",
      text: "Your blog has been updated successfully.",
      icon: "success",
      confirmButtonText: "Great!",
    });

    closeModal();
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="isPrivate">
              Private
            </label>
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={(e) =>
                setFormData({ ...formData, isPrivate: e.target.checked })
              }
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogEditModal;
