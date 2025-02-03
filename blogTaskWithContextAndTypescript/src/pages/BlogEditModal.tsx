import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import BlogContext from "../contexts/blogContext";
interface BlogEditModalProps {
  blogId: number;
  closeModal: () => void;
}
const BlogEditModal: React.FC<BlogEditModalProps> = ({ blogId, closeModal }) => {
  const { state, dispatch } = useContext(BlogContext);
  const blog = state.allBlogs.find((b) => b.id === blogId);
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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    dispatch({
      type: "updateBlog",
      payload: { blogId, ...formData },
    });

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

// import React, { useState, useEffect, useContext } from "react";
// import BlogContext from "../context/BlogContext"; // Assuming BlogContext is in the context folder
// import Swal from "sweetalert2";

// function BlogEditModal({ blogId, closeModal }) {
//   const { state, dispatch } = useContext(BlogContext); // Access context state and dispatch
//   const blog = state.allBlogs.find((b) => b.id === blogId);

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     content: "",
//     isPrivate: false,
//   });

//   useEffect(() => {
//     if (blog) {
//       setFormData({
//         title: blog.title,
//         author: blog.author,
//         content: blog.content,
//         isPrivate: blog.private,
//       });
//     }
//   }, [blog]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Dispatch the action to update the blog
//     dispatch({
//       type: "updateBlog",
//       payload: {
//         blogId,
//         ...formData,
//       },
//     });

//     // Show a sweet success message after saving changes
//     Swal.fire({
//       title: "Success!",
//       text: "Your blog has been updated successfully.",
//       icon: "success",
//       confirmButtonText: "Great!",
//     });

//     closeModal();
//   };

//   if (!blog) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//         <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="title">
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="content">
//               Content
//             </label>
//             <textarea
//               id="content"
//               name="content"
//               value={formData.content}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded mt-1"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="isPrivate">
//               Private
//             </label>
//             <input
//               type="checkbox"
//               id="isPrivate"
//               name="isPrivate"
//               checked={formData.isPrivate}
//               onChange={(e) =>
//                 setFormData({ ...formData, isPrivate: e.target.checked })
//               }
//               className="mt-1"
//             />
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={closeModal}
//               className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BlogEditModal;
