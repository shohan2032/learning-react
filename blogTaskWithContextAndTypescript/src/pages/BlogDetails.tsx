import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatDistanceToNow } from "date-fns";
import BlogEditModal from "./BlogEditModal";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/authContext";
import BlogContext from "../contexts/blogContext";

function BlogDetails() {
  const { state: authState } = useContext(AuthContext);
  const { state: blogState, dispatch } = useContext(BlogContext);
  const { blogId } = useParams();
  const username = authState.user || "";
  const blog = blogState.BlogById;
  const favoriteBlogs = blogState.favoriteBlogs.get(username) || [];
  const allLikedBlogs = blogState.allLikedBlogs.has(username) 
    ? blogState.allLikedBlogs.get(username)
    : [];
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentBlogId, setCurrentBlogId] = useState<any>(null);
  const navigate = useNavigate();
  const blogIdInNumber = Number(blogId);

  const isFavorite = favoriteBlogs.includes(blogIdInNumber);
  let hasLiked = allLikedBlogs ? allLikedBlogs.includes(blogIdInNumber) : false;

  const [localLikeCount, setLocalLikeCount] = useState(0);

  useEffect(() => {
    dispatch({ type: "filteredBlogById", payload: { blogId: blogIdInNumber } });
  }, [dispatch]);

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
        dispatch({
          type: "removeFavorite",
          payload: { username, blogId: blogIdInNumber },
        });
        Swal.fire(
          "Removed!",
          "This blog has been removed from favorites.",
          "success"
        );
      }
    } else {
      dispatch({
        type: "addFavorite",
        payload: { username, blogId: blogIdInNumber },
      });
      // Swal.fire("Saved!", "", "success");
    }
  };

  const handleLikeClick = () => {
    if (hasLiked) {
      dispatch({
        type: "removeLikedBlog",
        payload: { username, blogId: blogIdInNumber },
      });
      dispatch({
        type: "dislikeBlog",
        payload: { blogId: blogIdInNumber },
      });
      setLocalLikeCount(localLikeCount - 1);
      // Swal.fire("Unliked!", "", "success");
      hasLiked = false;
    } else {
      dispatch({
        type: "addLikedBlog",
        payload: { username, blogId: blogIdInNumber },
      });
      dispatch({
        type: "likeBlog",
        payload: { blogId: blogIdInNumber },
      });
      setLocalLikeCount(localLikeCount + 1);
      // Swal.fire("Liked!", "", "success");
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
        dispatch({
          type: "deleteBlog",
          payload: { blogId },
        });
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

  const handleEdit = (blogId:number) => {
    setCurrentBlogId(blogId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBlogId(null);
    dispatch({
      type: "filteredBlogById",
      payload: {blogId: blogIdInNumber},
    });
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

// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { formatDistanceToNow } from "date-fns";
// import BlogEditModal from "./BlogEditModal";
// import AuthContext from "../contexts/authContext";
// import BlogContext from "../contexts/blogContext";
// function BlogDetails() {
//   const { blogId } = useParams();
//   // console.log(blogId);
//   const { state: authState } = useContext(AuthContext); // Access user state from AuthContext
//   const { state: blogState, dispatch } = useContext(BlogContext); // Access blog state and dispatch from BlogContext
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentBlogId, setCurrentBlogId] = useState(null);
//   const navigate = useNavigate();

//   const username = authState.user;
//   // console.log(username);
//   const blog = blogState.BlogById;
//   const favoriteBlogs = blogState.favoriteBlogs.get(username) || [];
//   const allLikedBlogs = blogState.allLikedBlogs.get(username) || [];

//   const blogIdInNumber = Number(blogId);
//   const isFavorite = favoriteBlogs.includes(blogIdInNumber);
//   const hasLiked = allLikedBlogs.includes(blogIdInNumber);

//   const [localLikeCount, setLocalLikeCount] = useState(0);

//   useEffect(() => {
//     dispatch({ type: "filteredBlogById", payload: blogIdInNumber });
//   }, [dispatch]);

//   useEffect(() => {
//     if (blog) {
//       setLocalLikeCount(blog.likeCount);
//     }
//   }, [blog]);
//   // console.log(blog);
//   const handleFavoriteClick = async () => {
//     if (isFavorite) {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, remove it!",
//       });

//       if (result.isConfirmed) {
//         dispatch({
//           type: "REMOVE_FAVORITE",
//           payload: { username, blogId: blogIdInNumber },
//         });
//         Swal.fire(
//           "Removed!",
//           "This blog has been removed from favorites.",
//           "success"
//         );
//       }
//     } else {
//       dispatch({
//         type: "ADD_FAVORITE",
//         payload: { username, blogId: blogIdInNumber },
//       });
//     }
//   };

//   const handleLikeClick = () => {
//     if (hasLiked) {
//       dispatch({
//         type: "REMOVE_LIKED_BLOG",
//         payload: { username, blogId: blogIdInNumber },
//       });
//       dispatch({ type: "DISLIKE_BLOG", payload: blogIdInNumber });
//       setLocalLikeCount(localLikeCount - 1);
//     } else {
//       dispatch({
//         type: "ADD_LIKED_BLOG",
//         payload: { username, blogId: blogIdInNumber },
//       });
//       dispatch({ type: "LIKE_BLOG", payload: blogIdInNumber });
//       setLocalLikeCount(localLikeCount + 1);
//     }
//   };

//   const handleDelete = (blogId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch({ type: "DELETE_BLOG", payload: blogId });
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your blog has been deleted.",
//           icon: "success",
//           confirmButtonText: "Cool",
//         });
//         navigate("/");
//       }
//     });
//   };

//   const handleEdit = (blogId) => {
//     setCurrentBlogId(blogId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentBlogId(null);
//     dispatch({ type: "FETCH_BLOG_BY_ID", payload: blogIdInNumber }); // Re-fetch the blog data after editing
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {blog ? (
//         <>
//           <h1 className="text-3xl font-bold text-center mb-6">{blog.title}</h1>
//           <img
//             src={`https://picsum.photos/seed/${blog.imageId}/600/400`}
//             alt="Blog Cover"
//             className="w-full rounded-xl shadow-lg mb-6"
//           />
//           <div className="text-center">
//             <p className="text-lg mb-2">
//               <span className="font-semibold">Author:</span> {blog.author}
//             </p>
//             <p className="text-gray-500 text-sm font-semibold">
//               Published:{" "}
//               {formatDistanceToNow(new Date(blog.id), { addSuffix: true })}
//             </p>
//             <p className="text-gray-500 text-sm font-semibold">
//               Estimate Reading Time: {blog.estimateReadingTime}
//             </p>
//           </div>
//           <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
//             Content: <hr /> {blog.content}
//           </p>
//           <hr />
//           <div className="text-gray-700 text-center text-lg mb-6">
//             ❤️ {localLikeCount} Likes
//           </div>

//           {username && (
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={handleFavoriteClick}
//                 className={`px-6 py-2 rounded-lg font-medium shadow-md transition ${
//                   isFavorite
//                     ? "bg-red-500 hover:bg-red-600 text-white"
//                     : "bg-green-500 hover:bg-green-600 text-white"
//                 }`}
//               >
//                 {isFavorite ? "Remove from Favorites" : "Save to Favorites"}
//               </button>

//               <button
//                 onClick={handleLikeClick}
//                 className={`px-6 py-2 rounded-lg font-medium shadow-md transition ${
//                   hasLiked
//                     ? "bg-blue-500 hover:bg-blue-600 text-white"
//                     : "bg-gray-500 hover:bg-gray-600 text-white"
//                 }`}
//               >
//                 {hasLiked ? "Dislike" : "Like"}
//               </button>
//               {username === blog.author && (
//                 <>
//                   <button
//                     onClick={() => handleEdit(blog.id)}
//                     className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(blog.id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           )}

//           {isModalOpen && (
//             <BlogEditModal blogId={currentBlogId} closeModal={closeModal} />
//           )}
//         </>
//       ) : (
//         <p className="text-center text-xl">Loading blog details...</p>
//       )}
//     </div>
//   );
// }

// export default BlogDetails;
