import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import BlogEditModal from "./BlogEditModal";
import { useNavigate } from "react-router-dom";
import {
  filteredBlogById,
  removeFavorite,
  addFavorite,
  likeBlog,
  dislikeBlog,
  addLikedBlog,
  removeLikedBlog,
  deleteBlog,
} from "../slices/blog";
import { Store } from "../interface/reduxInterface";

function BlogDetails() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const username = useSelector((state:Store) => state.auth.user) || "";
  const blog = useSelector((state:Store) => state.favoriteBlogs.BlogById);
  console.log(blog);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentBlogId, setCurrentBlogId] = useState<any>(null);
  const navigate = useNavigate();

  const favoriteBlogs = useSelector(
    (state:Store) => state.favoriteBlogs.favoriteBlogs.get(username) || []
  );
  const allLikedBlogs = useSelector((state:Store) =>
    state.favoriteBlogs.allLikedBlogs.has(username)
      ? state.favoriteBlogs.allLikedBlogs.get(username)
      : []
  );

  const blogIdInNumber = Number(blogId);

  const isFavorite = favoriteBlogs.includes(blogIdInNumber);
  let hasLiked = allLikedBlogs?.includes(blogIdInNumber);

  const [localLikeCount, setLocalLikeCount] = useState(0);

  useEffect(() => {
    dispatch(filteredBlogById({ blogId: blogIdInNumber }));
  }, [dispatch]);

  useEffect(() => {
    if (blog) {
      setLocalLikeCount(blog.likeCount);
    }
  }, [blog]);
  console.log(blog);
  const handleFavoriteClick = async () => {
    if (isFavorite) {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      });

      if (result.isConfirmed) {
        dispatch(removeFavorite({ username, blogId: blogIdInNumber }));
        Swal.fire(
          "Removed!",
          "This blog has been removed from favorites.",
          "success"
        );
      }
    } else {
      dispatch(addFavorite({ username, blogId: blogIdInNumber }));
    }
  };

  const handleLikeClick = () => {
    if (hasLiked) {
      dispatch(removeLikedBlog({ username, blogId: blogIdInNumber }));
      dispatch(dislikeBlog({ blogId: blogIdInNumber }));
      setLocalLikeCount(localLikeCount - 1);
      hasLiked = false;
    } else {
      dispatch(addLikedBlog({ username, blogId: blogIdInNumber }));
      dispatch(likeBlog({ blogId: blogIdInNumber }));
      setLocalLikeCount(localLikeCount + 1);
      hasLiked = true;
    }
  };

  const handleDelete = (blogId:number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlog({ blogId }));
        Swal.fire({
          title: "Deleted!",
          text: "Your blog has been deleted.",
          icon: "success",
          confirmButtonText: "Cool",
        });
        navigate("/");
      }
    });
  };

  const handleEdit = (blogId:any) => {
    setCurrentBlogId(blogId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlogId(null);
    dispatch(filteredBlogById({ blogId: blogIdInNumber }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {blog ? (
        <>
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
            {blog.title}
          </h1>
          <img
            src={`https://picsum.photos/seed/${blog.imageId}/800/500`}
            alt="Blog Cover"
            className="w-full rounded-xl shadow-xl mb-6"
          />
          <div className="text-center">
            <p className="text-xl mb-2 text-gray-800">
              <span className="font-semibold text-indigo-700">Author:</span>{" "}
              {blog.author}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Published:{" "}
              {formatDistanceToNow(new Date(blog.id), { addSuffix: true })}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Estimated Reading Time: {blog.estimateReadingTime}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold">
              Content:
              <hr /> {blog.content}
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4 my-6">
            <div className="flex items-center space-x-2">
              <span className="text-xl text-gray-700">❤️ {localLikeCount}</span>
              <button
                onClick={handleLikeClick}
                className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
                  hasLiked
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-500 hover:bg-gray-600 text-white"
                }`}
              >
                {hasLiked ? "Dislike" : "Like"}
              </button>
            </div>

            <button
              onClick={handleFavoriteClick}
              className={`px-6 py-2 rounded-lg font-semibold shadow-md transition ${
                isFavorite
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
            </button>
          </div>

          {username === blog.author && (
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => handleEdit(blog.id)}
                className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}

          {isModalOpen && (
            <BlogEditModal blogId={currentBlogId} closeModal={closeModal} />
          )}
        </>
      ) : (
        <p className="text-center text-xl text-gray-600">
          Loading blog details...
        </p>
      )}
    </div>
  );
}

export default BlogDetails;
