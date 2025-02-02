import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../slices/blog";
import Swal from "sweetalert2";
interface BlogEditModalInterface {
  blogId: number;
  closeModal: () => void;
}
import { Store } from "../interface/reduxInterface";
const BlogEditModal: React.FC<BlogEditModalInterface> =  ({ blogId, closeModal }) => {
  const dispatch = useDispatch();
  const blog = useSelector((state:Store) =>
    state.favoriteBlogs.allBlogs.find((b) => b.id === blogId)
  );

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    isPrivate: false,
    estimateReadingTime: 0,
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        author: blog.author,
        content: blog.content,
        isPrivate: blog.isPrivate,
        estimateReadingTime: blog.estimateReadingTime ?? 1,
      });
    }
  }, [blog]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      Swal.fire("Error", "Title is required!", "error");
      return;
    }
    if (!formData.content.trim()) {
      Swal.fire("Error", "Content is required!", "error");
      return;
    }

    dispatch(updateBlog({ ...formData, id: blogId }));

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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Optional Blur Effect */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all scale-95 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            <label
              className="block font-semibold text-gray-700"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              rows={5}
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700">
              Estimate Reading Time (minutes)
            </label>
            <input
              id="estimateReadingTime"
              name="estimateReadingTime"
              type="number"
              min={1}
              value={formData.estimateReadingTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="w-5 h-5 accent-blue-500"
            />
            <label htmlFor="isPrivate" className="text-gray-700">
              Make this blog private
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
