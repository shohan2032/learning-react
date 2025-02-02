import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../contexts/authContext";
import BlogContext from "../contexts/blogContext";

function AddBlog() {
  const { state } = useContext(AuthContext);
  const { dispatch } = useContext(BlogContext);
  const navigate = useNavigate();
  const username = state.user;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [estimateReadingTime, setEstimateReadingTime] = useState(10);
  const [randomNumber, setRandomNumber] = useState(100);
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 1000 + 1));
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      Swal.fire("Error", "Title and Content are required!", "error");
      return;
    }
    dispatch({
      type: "addBlog",
      payload: {
        title,
        author: username,
        content,
        isPrivate,
        imageId: randomNumber,
        estimateReadingTime,
      },
    });

    Swal.fire("Success", "Blog added successfully!", "success");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        ✍️ Add a New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows="6"
            placeholder="Write your blog content..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">
            Estimate Reading Time (minutes)
          </label>
          <input
            type="number"
            min={1}
            value={estimateReadingTime}
            onChange={(e) => setEstimateReadingTime(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter estimate reading time"
            required
          />
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="w-5 h-5 accent-blue-500"
          />
          <label className="text-gray-700">Make this blog private</label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import BlogContext from "../contexts/blogContext";
// import AuthContext from "../contexts/authContext";

// function AddBlog() {
//   const { state: authState } = useContext(AuthContext);
//   const { dispatch } = useContext(BlogContext);
//   const navigate = useNavigate();

//   const username = authState.user;
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [estimateReadingTime, setEstimateReadingTime] = useState(10);
//   const [randomNumber] = useState(Math.floor(Math.random() * 1000 + 1));

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!title || !content) {
//       Swal.fire("Error", "Title and Content are required!", "error");
//       return;
//     }

//     dispatch({
//       type: "addBlog",
//       payload: {
//         title,
//         author: username,
//         content,
//         isPrivate,
//         imageId: randomNumber,
//         estimateReadingTime,
//       },
//     });

//     Swal.fire("Success", "Blog added successfully!", "success");
//     navigate("/");
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Add a New Blog</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter blog title"
//             required
//           />
//         </div>
//         <div>
//           <label className="block font-medium">Content</label>
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             rows="5"
//             placeholder="Enter blog content"
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label className="block font-medium">Estimate Reading Time</label>
//           <input
//             type="number"
//             value={estimateReadingTime}
//             onChange={(e) => setEstimateReadingTime(e.target.value)}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter estimated reading time"
//             required
//           />
//         </div>
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             checked={isPrivate}
//             onChange={() => setIsPrivate(!isPrivate)}
//             className="w-5 h-5"
//           />
//           <label className="text-gray-700">Make this blog private</label>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md font-medium"
//         >
//           Add Blog
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddBlog;
