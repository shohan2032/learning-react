import { createContext, useReducer } from "react";
import { BlogState, Blog, BlogAction } from "../interface/contextInterface";

const storedFavorites = JSON.parse(localStorage.getItem("favoriteBlogs") || "{}");
const allBlogs = JSON.parse(localStorage.getItem("allBlogs") || "[]");
const myBlogs = JSON.parse(localStorage.getItem("myBlogs") || "[]");
const filteredBlogs = JSON.parse(localStorage.getItem("filtereddBlogs") || "[]");
const BlogById = JSON.parse(localStorage.getItem("BlogById") || "null");
const allLikedBlogs = JSON.parse(localStorage.getItem("allLikedBlogs") || "[]");

const initialState:BlogState = {
  favoriteBlogs: new Map(Object.entries(storedFavorites)),
  allLikedBlogs: new Map(Object.entries(allLikedBlogs)),
  allBlogs: allBlogs,
  myBlogs: myBlogs,
  filteredBlogs: filteredBlogs,
  BlogById: BlogById,
  error: null,
};

function blogReducer(state:BlogState, action:BlogAction) {
  switch (action.type) {
    case "addFavorite": {
      const { username, blogId } = action.payload;

      const updatedFavorites = new Map(state.favoriteBlogs);
      if (!updatedFavorites.has(username)) {
        updatedFavorites.set(username, []);
      }

      const userFavorites = updatedFavorites.get(username);
      if (userFavorites && !userFavorites.includes(blogId)) {
        updatedFavorites.set(username, [...userFavorites, blogId]);
      }

      localStorage.setItem(
        "favoriteBlogs",
        JSON.stringify(Object.fromEntries(updatedFavorites))
      );

      return { ...state, favoriteBlogs: updatedFavorites };blogReducer
    }

    case "removeFavorite": {
      const { username, blogId } = action.payload;

      const updatedFavorites = new Map(state.favoriteBlogs);
      if (updatedFavorites.has(username)) {
        const userFavorites = updatedFavorites.get(username);
        const filteredFavorites = userFavorites ? userFavorites.filter((id) => id !== blogId) : [];
        updatedFavorites.set(username, filteredFavorites);
      }

      localStorage.setItem(
        "favoriteBlogs",
        JSON.stringify(Object.fromEntries(updatedFavorites))
      );

      return { ...state, favoriteBlogs: updatedFavorites };
    }

    case "addBlog": {
      const newBlog: Blog = {
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
      ) || null;
      // console.log(BlogById);
      localStorage.setItem("BlogById", JSON.stringify(BlogById));

      return { ...state, BlogById };
    }

    case "filterBlogsBySearchTerm": {
      const filteredBlogs = state.allBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(action.payload.searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(action.payload.searchTerm.toLowerCase())
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
      if (userLikes && !userLikes.includes(blogId)) {
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
        const userLikes = updatedLikes.get(username);
        const filteredLikes = userLikes ? userLikes.filter((id) => id !== blogId) : [];
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

const BlogContext = createContext<{ state: BlogState; dispatch: React.Dispatch<BlogAction> }>({
  state: initialState,
  dispatch: () => null,
});
export function BlogProvider({ children }:{children: React.ReactNode}) {
  // const [state, dispatch] = useReducer<React.Reducer<BlogState, BlogAction>>(blogReducer, initialState);
  const [state, dispatch] = useReducer(blogReducer, initialState);
  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}

export default BlogContext;



// import { createContext, useReducer, ReactNode, Dispatch } from "react";

// // Define the structure of a blog
// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   likeCount: number;
// }

// // Define the state structure
// interface BlogState {
//   favoriteBlogs: Map<string, number[]>; // username -> array of blog IDs
//   allLikedBlogs: Map<string, number[]>; // username -> array of liked blog IDs
//   allBlogs: Blog[];
//   myBlogs: Blog[];
//   filteredBlogs: Blog[];
//   BlogById: Blog | null;
//   error: string | null;
// }

// // Define action types
// type BlogAction =
//   | { type: "addFavorite"; payload: { username: string; blogId: number } }
//   | { type: "removeFavorite"; payload: { username: string; blogId: number } }
//   | { type: "addBlog"; payload: Omit<Blog, "id" | "likeCount"> }
//   | { type: "likeBlog"; payload: { blogId: number } }
//   | { type: "dislikeBlog"; payload: { blogId: number } }
//   | { type: "deleteBlog"; payload: { blogId: number } }
//   | { type: "updateBlog"; payload: { blogId: number; title?: string; content?: string } }
//   | { type: "filterBlogsByAuthor"; payload: { author: string } }
//   | { type: "filteredBlogById"; payload: number }
//   | { type: "filterBlogsBySearchTerm"; payload: string }
//   | { type: "addLikedBlog"; payload: { username: string; blogId: number } }
//   | { type: "removeLikedBlog"; payload: { username: string; blogId: number } }
//   | { type: "CLEAR_ERROR" };

// // Load stored data from localStorage
// const storedFavorites = JSON.parse(localStorage.getItem("favoriteBlogs") || "{}");
// const allBlogs: Blog[] = JSON.parse(localStorage.getItem("allBlogs") || "[]");
// const myBlogs: Blog[] = JSON.parse(localStorage.getItem("myBlogs") || "[]");
// const filteredBlogs: Blog[] = JSON.parse(localStorage.getItem("filteredBlogs") || "[]");
// const BlogById: Blog | null = JSON.parse(localStorage.getItem("BlogById") || "null");
// const storedLikedBlogs = JSON.parse(localStorage.getItem("allLikedBlogs") || "{}");

// // Initial state
// const initialState: BlogState = {
//   favoriteBlogs: new Map<string, number[]>(Object.entries(storedFavorites)),
//   allLikedBlogs: new Map<string, number[]>(Object.entries(storedLikedBlogs)),
//   allBlogs,
//   myBlogs,
//   filteredBlogs,
//   BlogById,
//   error: null,
// };

// // Reducer function
// function blogReducer(state: BlogState, action: BlogAction): BlogState {
//   switch (action.type) {
//     case "addFavorite": {
//       const { username, blogId } = action.payload;
//       const updatedFavorites = new Map(state.favoriteBlogs);

//       if (!updatedFavorites.has(username)) {
//         updatedFavorites.set(username, []);
//       }

//       const userFavorites = updatedFavorites.get(username)!;
//       if (!userFavorites.includes(blogId)) {
//         updatedFavorites.set(username, [...userFavorites, blogId]);
//       }

//       localStorage.setItem("favoriteBlogs", JSON.stringify(Object.fromEntries(updatedFavorites)));

//       return { ...state, favoriteBlogs: updatedFavorites };
//     }

//     case "removeFavorite": {
//       const { username, blogId } = action.payload;
//       const updatedFavorites = new Map(state.favoriteBlogs);

//       if (updatedFavorites.has(username)) {
//         const filteredFavorites = updatedFavorites.get(username)!.filter((id) => id !== blogId);
//         updatedFavorites.set(username, filteredFavorites);
//       }

//       localStorage.setItem("favoriteBlogs", JSON.stringify(Object.fromEntries(updatedFavorites)));

//       return { ...state, favoriteBlogs: updatedFavorites };
//     }

//     case "addBlog": {
//       const newBlog: Blog = {
//         id: Date.now(),
//         ...action.payload,
//         likeCount: 0,
//       };

//       const updatedBlogs = [...state.allBlogs, newBlog];
//       localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

//       return { ...state, allBlogs: updatedBlogs };
//     }

//     case "likeBlog": {
//       const { blogId } = action.payload;
//       const updatedBlogs = state.allBlogs.map((blog) =>
//         blog.id === blogId ? { ...blog, likeCount: blog.likeCount + 1 } : blog
//       );

//       localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

//       return { ...state, allBlogs: updatedBlogs };
//     }

//     case "dislikeBlog": {
//       const { blogId } = action.payload;
//       const updatedBlogs = state.allBlogs.map((blog) =>
//         blog.id === blogId && blog.likeCount > 0
//           ? { ...blog, likeCount: blog.likeCount - 1 }
//           : blog
//       );

//       localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

//       return { ...state, allBlogs: updatedBlogs };
//     }

//     case "deleteBlog": {
//       const { blogId } = action.payload;
//       const updatedBlogs = state.allBlogs.filter((blog) => blog.id !== blogId);
//       localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

//       return { ...state, allBlogs: updatedBlogs };
//     }

//     case "updateBlog": {
//       const { blogId, ...updatedData } = action.payload;
//       const updatedBlogs = state.allBlogs.map((blog) =>
//         blog.id === blogId ? { ...blog, ...updatedData } : blog
//       );

//       localStorage.setItem("allBlogs", JSON.stringify(updatedBlogs));

//       return { ...state, allBlogs: updatedBlogs };
//     }

//     case "filterBlogsByAuthor": {
//       const { author } = action.payload;
//       const myBlogs = state.allBlogs.filter((blog) => blog.author === author);
//       localStorage.setItem("myBlogs", JSON.stringify(myBlogs));

//       return { ...state, myBlogs };
//     }

//     case "filteredBlogById": {
//       const BlogById = state.allBlogs.find((blog) => blog.id === action.payload) || null;
//       localStorage.setItem("BlogById", JSON.stringify(BlogById));

//       return { ...state, BlogById };
//     }

//     case "filterBlogsBySearchTerm": {
//       const filteredBlogs = state.allBlogs.filter(
//         (blog) =>
//           blog.title.toLowerCase().includes(action.payload.toLowerCase()) ||
//           blog.content.toLowerCase().includes(action.payload.toLowerCase())
//       );

//       localStorage.setItem("filteredBlogs", JSON.stringify(filteredBlogs));

//       return { ...state, filteredBlogs };
//     }

//     case "addLikedBlog": {
//       const { username, blogId } = action.payload;
//       const updatedLikes = new Map(state.allLikedBlogs);

//       if (!updatedLikes.has(username)) {
//         updatedLikes.set(username, []);
//       }

//       const userLikes = updatedLikes.get(username)!;
//       if (!userLikes.includes(blogId)) {
//         updatedLikes.set(username, [...userLikes, blogId]);
//       }

//       localStorage.setItem("allLikedBlogs", JSON.stringify(Object.fromEntries(updatedLikes)));

//       return { ...state, allLikedBlogs: updatedLikes };
//     }

//     case "removeLikedBlog": {
//       const { username, blogId } = action.payload;
//       const updatedLikes = new Map(state.allLikedBlogs);

//       if (updatedLikes.has(username)) {
//         const filteredLikes = updatedLikes.get(username)!.filter((id) => id !== blogId);
//         updatedLikes.set(username, filteredLikes);
//       }

//       localStorage.setItem("allLikedBlogs", JSON.stringify(Object.fromEntries(updatedLikes)));

//       return { ...state, allLikedBlogs: updatedLikes };
//     }

//     case "CLEAR_ERROR":
//       return { ...state, error: null };

//     default:
//       return state;
//   }
// }

// // Define context type
// interface BlogContextType {
//   state: BlogState;
//   dispatch: Dispatch<BlogAction>;
// }

// // Create context
// const BlogContext = createContext<BlogContextType | undefined>(undefined);

// // BlogProvider component
// interface BlogProviderProps {
//   children: ReactNode;
// }

// export function BlogProvider({ children }: BlogProviderProps) {
//   const [state, dispatch] = useReducer(blogReducer, initialState);

//   return <BlogContext.Provider value={{ state, dispatch }}>{children}</BlogContext.Provider>;
// }

// export default BlogContext;
