import { useState } from "react";
import Swal from "sweetalert2";
import { Blog } from "../interface/reduxInterface";
import conf from "../conf/conf";
interface BlogEditModalInterface {
  blog: Blog;
  closeModal: () => void;
}

const BlogEditModal: React.FC<BlogEditModalInterface> = ({
  blog,
  closeModal,
}) => {
  const [formData, setFormData] = useState({
    id: blog.id,
    title: blog.title,
    authorId: blog.authorId,
    content: blog.content,
    isPrivate: blog.isPrivate,
    estimateReadingTime: blog.estimateReadingTime,
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const editBlog = async () => {
    const apiUrl = conf.apiUrl;
    const payload = {
      blog_id: formData.id,
      title: formData.title,
      author_id: formData.authorId,
      content: formData.content,
      is_private: formData.isPrivate,
      estimate_reading_time: formData.estimateReadingTime,
    };

    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${apiUrl}/blog/edit-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();

      Swal.fire({
        title: "Success!",
        text: "Your blog has been updated successfully.",
        icon: "success",
        confirmButtonText: "Great!",
      });

      closeModal();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to update blog. Try again later"
      );
      Swal.fire("Error", "Failed to update blog. Try again later", "error");
    } finally {
      setIsLoading(false);
    }
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

    editBlog();
  };

  if (!blog) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-all scale-95 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-center">✏️ Edit Blog</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg">
            <p className="text-red-600 font-medium text-center">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <label htmlFor="isPrivate" className="text-gray-700">
                Make this blog private
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogEditModal;
