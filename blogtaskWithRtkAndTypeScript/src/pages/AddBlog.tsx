import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../slices/blogSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Store } from "../interface/reduxInterface";

function AddBlog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state:Store) => state.auth.user) || "";

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [estimateReadingTime, setEstimateReadingTime] = useState<number>(10);
  const [randomNumber, setRandomNumber] = useState<number>(100);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 1000 + 1));
  }, []); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      Swal.fire("Error", "Title is required!", "error");
      return;
    }
    if (!content.trim()) {
      Swal.fire("Error", "Content is required!", "error");
      return;
    }

    dispatch(
      addBlog({
        title,
        author: username,
        content,
        isPrivate,
        imageId: randomNumber,
        estimateReadingTime,
      })
    );

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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={6}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEstimateReadingTime(Number(e.target.value))}
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
