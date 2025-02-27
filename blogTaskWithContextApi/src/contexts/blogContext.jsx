import { createContext, useReducer } from "react";

const storedFavorites = JSON.parse(localStorage.getItem("favoriteBlogs")) || {};
const allBlogs = JSON.parse(localStorage.getItem("allBlogs")) || [];
const myBlogs = JSON.parse(localStorage.getItem("myBlogs")) || [];
const filteredBlogs = JSON.parse(localStorage.getItem("filtereddBlogs")) || [];
const BlogById = JSON.parse(localStorage.getItem("BlogById")) || null;
const allLikedBlogs = JSON.parse(localStorage.getItem("allLikedBlogs")) || [];
const initialState = {
  favoriteBlogs: new Map(Object.entries(storedFavorites)),
  allLikedBlogs: new Map(Object.entries(allLikedBlogs)),
  allBlogs: allBlogs,
  myBlogs: myBlogs,
  filteredBlogs: filteredBlogs,
  BlogById: BlogById,
  error: null,
};

function blogReducer(state, action) {
  switch (action.type) {
    case "addFavorite": {
      const { username, blogId } = action.payload;

      const updatedFavorites = new Map(state.favoriteBlogs);
      if (!updatedFavorites.has(username)) {
        updatedFavorites.set(username, []);
      }

      const userFavorites = updatedFavorites.get(username);
      if (!userFavorites.includes(blogId)) {
        updatedFavorites.set(username, [...userFavorites, blogId]);
      }

      localStorage.setItem(
        "favoriteBlogs",
        JSON.stringify(Object.fromEntries(updatedFavorites))
      );

      return { ...state, favoriteBlogs: updatedFavorites };
    }

    case "removeFavorite": {
      const { username, blogId } = action.payload;

      const updatedFavorites = new Map(state.favoriteBlogs);
      if (updatedFavorites.has(username)) {
        const filteredFavorites = updatedFavorites
          .get(username)
          .filter((id) => id !== blogId);
        updatedFavorites.set(username, filteredFavorites);
      }

      localStorage.setItem(
        "favoriteBlogs",
        JSON.stringify(Object.fromEntries(updatedFavorites))
      );

      return { ...state, favoriteBlogs: updatedFavorites };
    }

    case "addBlog": {
      const newBlog = {
        id: Date.now(),
        ...action.payload,
        likeCount: 0,
      };

      const updatedBlogs = [...state.allBlogs, newBlog];
      localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

      return { ...state, allBlogs: updatedBlogs };
    }

    case "likeBlog": {
      const { blogId } = action.payload;

      const updatedBlogs = state.allBlogs.map((blog) =>
        blog.id === blogId ? { ...blog, likeCount: blog.likeCount + 1 } : blog
      );

      localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

      return { ...state, allBlogs: updatedBlogs };
    }

    case "dislikeBlog": {
      const { blogId } = action.payload;

      const updatedBlogs = state.allBlogs.map((blog) =>
        blog.id === blogId && blog.likeCount > 0
          ? { ...blog, likeCount: blog.likeCount - 1 }
          : blog
      );

      localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

      return { ...state, allBlogs: updatedBlogs };
    }

    case "deleteBlog": {
      const { blogId } = action.payload;

      const updatedBlogs = state.allBlogs.filter((blog) => blog.id !== blogId);
      localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

      return { ...state, allBlogs: updatedBlogs };
    }

    case "updateBlog": {
      const { blogId, ...updatedData } = action.payload;

      const updatedBlogs = state.allBlogs.map((blog) =>
        blog.id === blogId ? { ...blog, ...updatedData } : blog
      );

      localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

      return { ...state, allBlogs: updatedBlogs };
    }

    case "filterBlogsByAuthor": {
      const { author } = action.payload;
      const myBlogs = state.allBlogs.filter((blog) => blog.author === author);

      localStorage.setItem("myBlogs", JSON.stringify(myBlogs));

      return { ...state, myBlogs };
    }

    case "filteredBlogById": {
      // console.log(action.payload);
      const BlogById = state.allBlogs.find(
        (blog) => blog.id === action.payload.blogId
      );
      // console.log(BlogById);
      localStorage.setItem("BlogById", JSON.stringify(BlogById));

      return { ...state, BlogById };
    }

    case "filterBlogsBySearchTerm": {
      const filteredBlogs = state.allBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          blog.content.toLowerCase().includes(action.payload.toLowerCase())
      );

      localStorage.setItem("filteredBlogs", JSON.stringify(filteredBlogs));

      return { ...state, filteredBlogs };
    }

    case "addLikedBlog": {
      const { username, blogId } = action.payload;

      const updatedLikes = new Map(state.allLikedBlogs);
      if (!updatedLikes.has(username)) {
        updatedLikes.set(username, []);
      }

      const userLikes = updatedLikes.get(username);
      if (!userLikes.includes(blogId)) {
        updatedLikes.set(username, [...userLikes, blogId]);
      }

      localStorage.setItem(
        "allLikedBlogs",
        JSON.stringify(Object.fromEntries(updatedLikes))
      );

      return { ...state, allLikedBlogs: updatedLikes };
    }

    case "removeLikedBlog": {
      const { username, blogId } = action.payload;

      const updatedLikes = new Map(state.allLikedBlogs);
      if (updatedLikes.has(username)) {
        const filteredLikes = updatedLikes
          .get(username)
          .filter((id) => id !== blogId);
        updatedLikes.set(username, filteredLikes);
      }

      localStorage.setItem(
        "allLikedBlogs",
        JSON.stringify(Object.fromEntries(updatedLikes))
      );

      return { ...state, allLikedBlogs: updatedLikes };
    }

    case "CLEAR_ERROR":
      return { ...state, error: null };

    default:
      return state;
  }
}

const BlogContext = createContext();
export function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(blogReducer, initialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContext;
