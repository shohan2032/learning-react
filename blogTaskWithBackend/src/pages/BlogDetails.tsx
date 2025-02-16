import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import BlogEditModal from "./BlogEditModal";
import { useNavigate } from "react-router-dom";
import { Store, Blog } from "../interface/reduxInterface";
import conf from "../conf/conf";

function BlogDetails() {
  const { blogId } = useParams();
  const userId = useSelector((state: Store) => state.auth.user.id);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editableBlog, setEditableBlog] = useState<Blog | null>(null);
  const [localLikeCount, setLocalLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const getBlogDetails = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!blogId) {
        throw new Error("Blog ID is undefined");
      }

      const response = await fetch(
        `${conf.apiUrl}/blog/blog-by-id?blogId=${encodeURIComponent(blogId)}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBlog(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, [blogId]);

  const addLike = async () => {
    setIsLoading(true);
    setError("");
    const payload = {
      user_id: userId,
      blog_id: blogId,
    };
    try {
      const response = await fetch(`${conf.apiUrl}/like/add-like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // console.log("🚀 ~ addLikeToLikeTable ~ response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await fetch(`${conf.apiUrl}/blog/increment-like-count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      // console.log("🚀 ~ addLikeToBlog ~ res:", res);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete blog!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeLike = async () => {
    setIsLoading(true);
    setError("");
    const payload = {
      user_id: userId,
      blog_id: blogId,
    };
    try {
      const response = await fetch(`${conf.apiUrl}/like/remove-like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // console.log("🚀 ~ removeLikeFromLikeTable ~ response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await fetch(`${conf.apiUrl}/blog/decrement-like-count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      // console.log("🚀 ~ removeLikeFromBlog ~ res:", res);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete blog!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getHasLiked = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!blogId) {
        throw new Error("Blog ID is undefined");
      }

      const response = await fetch(
        `${conf.apiUrl}/like/has-liked?blog_id=${encodeURIComponent(
          blogId
        )}&user_id=${encodeURIComponent(userId)}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data.hasLiked);
      setIsLiked(data.hasLiked);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId !== 0) {
      getHasLiked();
    } else {
      setIsLiked(false);
    }
  }, [blogId, userId]);

  const addFavorite = async () => {
    setIsLoading(true);
    setError("");
    const payload = {
      user_id: userId,
      blog_id: blogId,
    };
    try {
      const response = await fetch(`${conf.apiUrl}/favorite/add-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // console.log("🚀 ~ addfavoriteTofavoriteTable ~ response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete blog!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async () => {
    setIsLoading(true);
    setError("");
    const payload = {
      user_id: userId,
      blog_id: blogId,
    };
    try {
      const response = await fetch(`${conf.apiUrl}/favorite/remove-favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      // console.log("🚀 ~ removefavoriteTofavoriteTable ~ response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data = await response.json();
      // console.log(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete blog!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getHasFavorite = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!blogId) {
        throw new Error("Blog ID is undefined");
      }

      const response = await fetch(
        `${conf.apiUrl}/favorite/has-favorite?blog_id=${encodeURIComponent(
          blogId
        )}&user_id=${encodeURIComponent(userId)}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data.hasFavorite);
      setIsFavorite(data.hasFavorite);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId !== 0) {
      getHasFavorite();
    } else {
      setIsFavorite(false);
    }
  }, [blogId, userId]);

  // const favoriteBlogs = useSelector(
  //   (state: Store) => state.favoriteBlogs.favoriteBlogs.get(username) || []
  // );
  // const allLikedBlogs = useSelector((state: Store) =>
  //   state.favoriteBlogs.allLikedBlogs.has(username)
  //     ? state.favoriteBlogs.allLikedBlogs.get(username)
  //     : []
  // );

  // const blogIdInNumber = Number(blogId);

  // const isFavorite = favoriteBlogs.includes(blogIdInNumber);
  // let hasLiked = allLikedBlogs?.includes(blogIdInNumber);

  useEffect(() => {
    if (blog) {
      setLocalLikeCount(blog.likeCount);
    }
  }, [blog]);

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
        removeFavorite();
        setIsFavorite(false);
        Swal.fire(
          "Removed!",
          "This blog has been removed from favorites.",
          "success"
        );
      }
    } else {
      // dispatch(addFavorite({ username, blogId: blogIdInNumber }));
      addFavorite();
      setIsFavorite(true);
    }
  };

  const handleLikeClick = () => {
    if (isLiked) {
      // dispatch(removeLikedBlog({ username, blogId: blogIdInNumber }));
      // dispatch(dislikeBlog({ blogId: blogIdInNumber }));
      removeLike();
      setLocalLikeCount(localLikeCount - 1);
      setIsLiked(false);
    } else {
      // dispatch(addLikedBlog({ username, blogId: blogIdInNumber }));
      // dispatch(likeBlog({ blogId: blogIdInNumber }));
      addLike();
      setLocalLikeCount(localLikeCount + 1);
      setIsLiked(true);
    }
  };

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
      // console.log("🚀 ~ deleteBlog ~ response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // const data = await response.json();
      // console.log(data);
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
        navigate("/");
      }
    });
  };

  const handleEdit = (blog: Blog) => {
    setEditableBlog(blog);
  };

  const closeModal = () => {
    setEditableBlog(null);
    getBlogDetails();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {userId === 0 && (
        <div className="text-center p-4 mb-6 bg-red-50 rounded-lg">
          <p className="text-red-600 font-medium">
            Please, Login in to save this blog in favorites!
          </p>
        </div>
      )}

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
      {blog ? (
        <>
          <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-6">
            {blog.title}
          </h1>
          <img
            src={`${blog.imageUrl}`}
            alt="Blog Cover"
            className="w-full rounded-xl shadow-xl mb-6"
          />
          <div className="text-center">
            <p className="text-xl mb-2 text-gray-800">
              <span className="font-semibold text-indigo-700">Author:</span>{" "}
              {blog.authorName}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Published:{" "}
              {formatDistanceToNow(new Date(blog.createdAt), {
                addSuffix: true,
              })}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Estimated Reading Time: {blog.estimateReadingTime}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold">
              Content:
              {blog.content}
            </p>
          </div>

          {userId !== 0 && (
            <div className="flex justify-center items-center space-x-4 my-6">
              <div className="flex items-center space-x-2">
                <span className="text-xl text-gray-700">
                  ❤️ {localLikeCount}
                </span>
                <button
                  onClick={handleLikeClick}
                  className={`px-4 py-2 rounded-lg font-semibold shadow-md transition ${
                    isLiked
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-500 hover:bg-gray-600 text-white"
                  }`}
                >
                  {isLiked ? "Dislike" : "Like"}
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
          )}

          {userId === blog.authorId && (
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => handleEdit(blog)}
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

          {editableBlog && (
            <BlogEditModal blog={editableBlog} closeModal={closeModal} />
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
