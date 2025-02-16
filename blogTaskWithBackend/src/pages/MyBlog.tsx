import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BlogEditModal from "./BlogEditModal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Store, Blog } from "../interface/reduxInterface";
import conf from "../conf/conf";
function MyBlog() {
  const userId = useSelector((state: Store) => state.auth.user.id);
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const [editableBlog, setEditableBlog] = useState<Blog | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const truncateContent = (content: string) => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  const getMyBlogs = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${conf.apiUrl}/blog/blogs-by-user?userId=${encodeURIComponent(
          userId
        )}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMyBlogs([...data].sort((a, b) => b.id - a.id));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBlogs();
  }, [userId]);

  const deleteBlog = async (blogId: number) => {
    setIsLoading(true);
    setError("");
    const payload = {
      blogId: blogId,
      authorId: userId,
    };
    try {
      const response = await fetch(`${conf.apiUrl}/blog/delete-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      console.log("🚀 ~ deleteBlog ~ response:", response);
      // console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data = await response.json();
      // console.log(data);
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete blog!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (blogId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBlog(blogId);
        Swal.fire({
          title: "Deleted!",
          text: "Your blog has been deleted.",
          icon: "success",
          confirmButtonText: "Cool",
        });
        // getMyBlogs();
      }
    });
  };

  const handleEdit = (blog: Blog) => {
    setEditableBlog(blog);
  };

  const closeModal = () => {
    setEditableBlog(null);
    getMyBlogs();
  };

  const getRelativeTime = (timestamp: Date) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (now.getTime() - createdAt.getTime()) / 1000
    );

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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        My Blogs
      </h2>
      {error && (
        <div className="text-center p-4 mb-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      {myBlogs.length === 0 ? (
        <p className="text-center text-2xl font-semibold text-gray-600 mt-6">
          🚀 No blogs found! Click the "Add Blog" button to create your first
          blog!
        </p>
      ) : (
        myBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg p-5 mb-4 hover:bg-gray-100 transition"
          >
            <div className="relative">
              <img
                className="w-full h-48 object-cover"
                src={blog.imageUrl || "https://via.placeholder.com/300"}
                alt="Blog Cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Title: {blog.title}
            </h3>
            <p className="text-gray-700 mt-2">
              Content: {truncateContent(blog.content)}
            </p>
            <p className="text-black text-xl font-semibold">
              Published: {getRelativeTime(blog.createdAt)}
            </p>
            <h3 className="text-black-500 font-semibold">
              This blog is {blog.isPrivate ? "private" : "public"}
            </h3>
            <p className="text-gray-500 text-sm font-semibold">
              Estimate Reading Time: {blog.estimateReadingTime}
            </p>
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
                  onClick={() => handleEdit(blog)}
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

      {editableBlog && (
        <BlogEditModal blog={editableBlog} closeModal={closeModal} />
      )}
    </div>
  );
}

export default MyBlog;
