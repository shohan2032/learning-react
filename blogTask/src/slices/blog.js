import { createSlice } from "@reduxjs/toolkit";

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

const blogSlice = createSlice({
  name: "favoriteBlogs",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { username, blogId } = action.payload;

      if (!state.favoriteBlogs.has(username)) {
        state.favoriteBlogs.set(username, []);
      }

      const userFavorites = state.favoriteBlogs.get(username);
      if (!userFavorites.includes(blogId)) {
        userFavorites.push(blogId);
      }

      localStorage.setItem(
        "favoriteBlogs",
        JSON.stringify(Object.fromEntries(state.favoriteBlogs))
      );
    },
    removeFavorite: (state, action) => {
      const { username, blogId } = action.payload;

      if (state.favoriteBlogs.has(username)) {
        const userFavorites = state.favoriteBlogs.get(username);
        state.favoriteBlogs.set(
          username,
          userFavorites.filter((id) => id !== blogId)
        );

        localStorage.setItem(
          "favoriteBlogs",
          JSON.stringify(Object.fromEntries(state.favoriteBlogs))
        );
      }
    },
    addBlog: (state, action) => {
      const { title, author, content, isPrivate, imageId } = action.payload;
      // console.log(action.payload);
      const blog = {
        id: Date.now(),
        title,
        author,
        content,
        likeCount: 0,
        private: isPrivate,
        imageId: imageId
      };

      state.allBlogs.push(blog);
      localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
    },
    likeBlog: (state, action) => {
      const { blogId } = action.payload;

      const blog = state.allBlogs.find((b) => b.id === blogId);
      if (blog) {
        blog.likeCount++;
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
    },
    dislikeBlog: (state, action) => {
      const { blogId } = action.payload;

      const blog = state.allBlogs.find((b) => b.id === blogId);
      if (blog && blog.likeCount > 0) {
        blog.likeCount--;
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
    },
    deleteBlog: (state, action) => {
      const { blogId } = action.payload;

      const index = state.allBlogs.findIndex((b) => b.id === blogId);
      if (index > -1) {
        state.allBlogs.splice(index, 1);
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
    },
    updateBlog: (state, action) => {
      const { blogId, title, author, content, isPrivate } = action.payload;

      const blog = state.allBlogs.find((b) => b.id === blogId);
      if (blog) {
        blog.title = title;
        blog.author = author;
        blog.content = content;
        blog.private = isPrivate;
        localStorage.setItem("allBlogs", JSON.stringify(state.allBlogs));
      }
      state.error = null;
    },
    filterBlogsByAuthor: (state, action) => {
      const { author } = action.payload;
      state.myBlogs = state.allBlogs.filter((b) => b.author === author);
      localStorage.setItem("myBlogs", JSON.stringify(state.myBlogs));
      state.error = null;
    },
    filteredBlogById: (state, action) => {
      const { blogId } = action.payload;
      state.BlogById = state.allBlogs.find((b) => b.id === blogId);
      localStorage.setItem(
        "filteredBlogById",
        JSON.stringify(state.BlogById)
      );
      state.error = null;
    },
    filterBlogsBySearchTerm: (state, action) => {
      const { searchTerm } = action.payload;
      state.filteredBlogs = state.allBlogs.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      localStorage.setItem(
        "filteredBlogs",
        JSON.stringify(state.filteredBlogs)
      );
      state.error = null;
    },
    addLikedBlog: (state, action) => {
      const { username, blogId } = action.payload;

      if (!state.allLikedBlogs.has(username)) {
        state.allLikedBlogs.set(username, []);
      }

      const userLikedBlogs = state.allLikedBlogs.get(username);
      if (!userLikedBlogs.includes(blogId)) {
        userLikedBlogs.push(blogId);
      }

      localStorage.setItem(
        "allLikedBlogs",
        JSON.stringify(Object.fromEntries(state.allLikedBlogs))
      );
    },
    removeLikedBlog: (state, action) => {
      const { username, blogId } = action.payload;

      if (state.allLikedBlogs.has(username)) {
        const userLikedBlogs = state.allLikedBlogs.get(username);
        state.allLikedBlogs.set(
          username,
          userLikedBlogs.filter((id) => id!== blogId)
        );

        localStorage.setItem(
          "allLikedBlogs",
          JSON.stringify(Object.fromEntries(state.allLikedBlogs))
        );
      } 
    },
    clearError: (state) => {
      state.error = null;
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
