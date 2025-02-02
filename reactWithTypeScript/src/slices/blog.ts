import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog, BlogState } from "../interface/reduxInterface"; // Import types

const storedFavorites = JSON.parse(localStorage.getItem("favoriteBlogs") || "{}");
const allBlogs = JSON.parse(localStorage.getItem("allBlogs") || "[]");
const myBlogs = JSON.parse(localStorage.getItem("myBlogs") || "[]");
const filteredBlogs = JSON.parse(localStorage.getItem("filteredBlogs") || "[]");
const BlogById = JSON.parse(localStorage.getItem("BlogById") || "null");
const allLikedBlogs = JSON.parse(localStorage.getItem("allLikedBlogs") || "{}");

const initialState: BlogState = {
  favoriteBlogs: new Map<string, number[]>(Object.entries(storedFavorites)),
  allLikedBlogs: new Map<string, number[]>(Object.entries(allLikedBlogs)),
  allBlogs: allBlogs,
  myBlogs: myBlogs,
  filteredBlogs: filteredBlogs,
  BlogById: BlogById,
  error: null,
};

const blogSlice = createSlice({
  name: "favoriteBlogs",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<{ username: string; blogId: number }>) => {
      const { username, blogId } = action.payload;

      if (!state.favoriteBlogs.has(username)) {
        state.favoriteBlogs.set(username, []);
      }

      const userFavorites = state.favoriteBlogs.get(username);
      if (userFavorites && !userFavorites.includes(blogId)) {
        userFavorites.push(blogId);
      }

      localStorage.setItem("favoriteBlogs", JSON.stringify(Object.fromEntries(state.favoriteBlogs)));
    },

    removeFavorite: (state, action: PayloadAction<{ username: string; blogId: number }>) => {
      const { username, blogId } = action.payload;

      if (state.favoriteBlogs.has(username)) {
        const userFavorites = state.favoriteBlogs.get(username) || [];
        state.favoriteBlogs.set(username, userFavorites.filter((id) => id !== blogId));

        localStorage.setItem("favoriteBlogs", JSON.stringify(Object.fromEntries(state.favoriteBlogs)));
      }
    },

    addBlog: (state, action: PayloadAction<Omit<Blog, "id" | "likeCount">>) => {
      const newBlog: Blog = {
        id: Date.now(),
        likeCount: 0,
        ...action.payload,
      };

      state.allBlogs.push(newBlog);
      localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
    },

    likeBlog: (state, action: PayloadAction<{ blogId: number }>) => {
      const blog = state.allBlogs.find((b) => b.id === action.payload.blogId);
      if (blog) {
        blog.likeCount++;
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
    },

    dislikeBlog: (state, action: PayloadAction<{ blogId: number }>) => {
      const blog = state.allBlogs.find((b) => b.id === action.payload.blogId);
      if (blog && blog.likeCount > 0) {
        blog.likeCount--;
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
    },

    deleteBlog: (state, action: PayloadAction<{ blogId: number }>) => {
      state.allBlogs = state.allBlogs.filter((b) => b.id !== action.payload.blogId);
      localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
    },

    updateBlog: (state, action: PayloadAction<Omit<Blog, "likeCount">>) => {
      const blogIndex = state.allBlogs.findIndex((b) => b.id === action.payload.id);
      if (blogIndex !== -1) {
        state.allBlogs[blogIndex] = { ...state.allBlogs[blogIndex], ...action.payload };
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
    },

    filterBlogsByAuthor: (state, action: PayloadAction<{ author: string }>) => {
      state.myBlogs = state.allBlogs.filter((b) => b.author === action.payload.author);
      localStorage.setItem("myBlogs", JSON.stringify(state.myBlogs));
    },

    filterBlogsBySearchTerm: (state, action: PayloadAction<{ searchTerm: string }>) => {
      state.filteredBlogs = state.allBlogs.filter(
        (b) => b.title.toLowerCase().includes(action.payload.searchTerm.toLowerCase()) ||
          b.content.toLowerCase().includes(action.payload.searchTerm.toLowerCase())
      );
      localStorage.setItem("filteredBlogs", JSON.stringify(state.filteredBlogs));
    },

    filteredBlogById: (state, action: PayloadAction<{ blogId: number }>) => {
      state.BlogById = state.allBlogs.find((b) => b.id === action.payload.blogId) || null;
      localStorage.setItem("BlogById", JSON.stringify(state.BlogById));
    },

    addLikedBlog: (state, action: PayloadAction<{ username: string; blogId: number }>) => {
      if (!state.allLikedBlogs.has(action.payload.username)) {
        state.allLikedBlogs.set(action.payload.username, []);
      }

      const userLikedBlogs = state.allLikedBlogs.get(action.payload.username);
      if (userLikedBlogs && !userLikedBlogs.includes(action.payload.blogId)) {
        userLikedBlogs.push(action.payload.blogId);
      }

      localStorage.setItem("allLikedBlogs", JSON.stringify(Object.fromEntries(state.allLikedBlogs)));
    },

    removeLikedBlog: (state, action: PayloadAction<{ username: string; blogId: number }>) => {
      if (state.allLikedBlogs.has(action.payload.username)) {
        const userLikedBlogs = state.allLikedBlogs.get(action.payload.username) || [];
        state.allLikedBlogs.set(action.payload.username, userLikedBlogs.filter((id) => id !== action.payload.blogId));

        localStorage.setItem("allLikedBlogs", JSON.stringify(Object.fromEntries(state.allLikedBlogs)));
      }
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  addBlog,
  likeBlog,
  dislikeBlog,
  deleteBlog,
  updateBlog,
  filterBlogsByAuthor,
  filterBlogsBySearchTerm,
  filteredBlogById,
  addLikedBlog,
  removeLikedBlog,
  clearError,
} = blogSlice.actions;

export default blogSlice.reducer;
