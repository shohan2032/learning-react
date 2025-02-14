import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Store } from "../interface/reduxInterface";
import conf from "../conf/conf";

function AddBlog() {
  const navigate = useNavigate();
  const id = useSelector((state: Store) => state.auth.user.id);
  const username = useSelector((state: Store) => state.auth.user.username);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [estimateReadingTime, setEstimateReadingTime] = useState<number>(10);
  const [randomNumber, setRandomNumber] = useState<number>(100);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setRandomNumber(Math.floor(Math.random() * 1000 + 1));
  }, []);

  const createBlog = async () => {
    const apiUrl = conf.apiUrl;
    const payload = {
      title: title,
      author_id: id,
      author_name: username,
      content: content,
      is_private: isPrivate,
      image_url: `https://picsum.photos/seed/${randomNumber}/600/400`,
      estimate_reading_time: estimateReadingTime,
    };

    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`${apiUrl}/blog/create-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      console.log("🚀 ~ createBlog ~ response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create blog. Try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

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

    createBlog();

    Swal.fire("Success", "Blog added successfully!", "success");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        ✍️ Add a New Blog
      </h1>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      {isLoading && (
        <div className="text-center">
          <svg
            className="animate-spin w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          ></svg>
          <p className="text-gray-500 text-xs">Creating blog...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEstimateReadingTime(Number(e.target.value))
            }
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
