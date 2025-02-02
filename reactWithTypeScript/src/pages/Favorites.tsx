import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../slices/blog";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Store } from "../interface/reduxInterface";

function Favorites() {
  const dispatch = useDispatch();
  const username = useSelector((state:Store) => state.auth.user) || "";
  const navigate = useNavigate();
  const allBlogs = useSelector((state:Store) => state.favoriteBlogs.allBlogs);
  const favoriteBlogsId = useSelector(
    (state:Store) => state.favoriteBlogs.favoriteBlogs.get(username) || []
  );
  const favoriteBlogs = favoriteBlogsId
    .map((blogId) => allBlogs.find((b) => b.id === blogId))
    .filter(Boolean);
  const sortedFavoriteBlogs = [...favoriteBlogs].sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));

  const handleRemoveFavorite = async (blogId:number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      dispatch(removeFavorite({ username, blogId }));
      Swal.fire(
        "Removed!",
        "This blog has been removed from favorites.",
        "success"
      );
    }
  };

  const getRelativeTime = (timestamp:number) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

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

  const truncateContent = (content:string) => {
    return (
      content.split(" ").slice(0, 100).join(" ") +
      (content.split(" ").length > 100 ? "..." : "")
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-semibold text-center text-gray-800 mb-8">
        My Favorite Blogs
      </h2>

      {sortedFavoriteBlogs.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          No favorite blogs found.
        </p>
      ) : (
        sortedFavoriteBlogs.map((blog) => (
          <div
            key={blog?.id}
            className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="relative">
              <img
                className="w-full h-56 object-cover rounded-lg"
                src={`https://picsum.photos/seed/${blog?.imageId}/600/400`}
                alt="Blog Cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mt-6">
              {blog?.title}
            </h3>
            <p className="text-gray-700 mt-3">
              {blog && truncateContent(blog.content)}
            </p>
            <div className="text-gray-500 text-sm font-semibold mt-4">
              Published: {blog?.id ? getRelativeTime(blog.id) : "Unknown"}
            </div>
            <p className="text-gray-500 text-sm font-semibold">
              Estimate Reading Time: {blog?.estimateReadingTime}
            </p>

            <div className="flex justify-between items-center mt-6">
              <p className="text-gray-500 text-sm">Likes: {blog?.likeCount}</p>
              <div className="flex space-x-6">
                <button
                  onClick={() => blog && handleRemoveFavorite(blog.id)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Remove from Favorites
                </button>
                <button
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => navigate(`/blog-details/${blog?.id}`)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
