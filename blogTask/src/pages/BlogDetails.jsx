import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  filteredBlogById,
  removeFavorite,
  addFavorite,
  likeBlog,
  dislikeBlog,
  addLikedBlog,
  removeLikedBlog,
} from "../slices/blog";

function BlogDetails() {
  const dispatch = useDispatch();
  const { blogId } = useParams();
  const username = useSelector((state) => state.auth.user);
  const blog = useSelector((state) => state.favoriteBlogs.BlogById);

  const favoriteBlogs = useSelector(
    (state) => state.favoriteBlogs.favoriteBlogs.get(username) || []
  );
  const allLikedBlogs = useSelector((state) =>
    state.favoriteBlogs.allLikedBlogs.has(username)
      ? state.favoriteBlogs.allLikedBlogs.get(username)
      : []
  );

  const blogIdInNumber = Number(blogId);

  const isFavorite = favoriteBlogs.includes(blogIdInNumber);
  let hasLiked = allLikedBlogs.includes(blogIdInNumber);

  const [localLikeCount, setLocalLikeCount] = useState(0);

  useEffect(() => {
    dispatch(filteredBlogById({ blogId: blogIdInNumber }));
  }, [dispatch, blogIdInNumber]);

  useEffect(() => {
    if (blog) {
      setLocalLikeCount(blog.likeCount);
    }
  }, [blog]);
  // console.log(localLikeCount);
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
      Swal.fire("Saved!", "", "success");
    }
  };

  const handleLikeClick = () => {
    if (hasLiked) {
      dispatch(removeLikedBlog({ username, blogId: blogIdInNumber }));
      dispatch(dislikeBlog({ blogId: blogIdInNumber }));
      setLocalLikeCount(localLikeCount - 1);
      Swal.fire("Unliked!", "", "success");
      hasLiked = false;
    } else {
      dispatch(addLikedBlog({ username, blogId: blogIdInNumber }));
      dispatch(likeBlog({ blogId: blogIdInNumber }));
      setLocalLikeCount(localLikeCount + 1);
      Swal.fire("Liked!", "", "success");
      hasLiked = true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {blog ? (
        <>
          <h1 className="text-3xl font-bold text-center mb-6">{blog.title}</h1>
          <img
            src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
            alt="Blog Cover"
            className="w-full rounded-xl shadow-lg mb-6"
          />
          <div className="text-center">
            <p className="text-lg mb-2">
              <span className="font-semibold">Author:</span> {blog.author}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
            {" "}
            Content:
            <hr /> {blog.content}
          </p>
          <hr />
          <div className="text-gray-700 text-center text-lg mb-6">
            ❤️ {localLikeCount} Likes
          </div>

          {username && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleFavoriteClick}
                className={`px-6 py-2 rounded-lg font-medium shadow-md transition ${
                  isFavorite
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }`}
              >
                {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
              </button>

              <button
                onClick={handleLikeClick}
                className={`px-6 py-2 rounded-lg font-medium shadow-md transition ${
                  hasLiked
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-500 hover:bg-gray-600 text-white"
                }`}
              >
                {hasLiked ? "Dislike" : "Like"}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-xl">Loading blog details...</p>
      )}
    </div>
  );
}

export default BlogDetails;
