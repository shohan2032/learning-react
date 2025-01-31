import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../slices/blog";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [estimateReadingTime, setEstimateReadingTime] = useState(10);
  const [randomNumber, setRandomNumber] = useState(100);
  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 1000 + 1));
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      Swal.fire("Error", "Title and Content are required!", "error");
      return;
    }

    dispatch(addBlog({ title, author: username, content, isPrivate, imageId: randomNumber, estimateReadingTime }));

    Swal.fire("Success", "Blog added successfully!", "success");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Add a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows="5"
            placeholder="Enter blog content"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Estimate Reading Time</label>
          <input
            type="text"
            value={estimateReadingTime}
            onChange={(e) => setEstimateReadingTime(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter blog title"
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="w-5 h-5"
          />
          <label className="text-gray-700">Make this blog private</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md font-medium"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
