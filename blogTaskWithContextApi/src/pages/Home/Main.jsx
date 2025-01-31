import React, { useState, useEffect, useContext } from "react";
import SearchBar from "./SearchBar";
import BlogCard from "./BlogCard";
import BlogContext from "../../contexts/blogContext";

function Main() {
  const { state, dispatch } = useContext(BlogContext);
  const [searchTerm, setSearchTerm] = useState("");

  const allBlogs = state.allBlogs;
  const filteredBlogs = state.filteredBlogs;

  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch({ type: "filterBlogsBySearchTerm", payload: "" });
    } else {
      dispatch({ type: "filterBlogsBySearchTerm", payload: searchTerm });
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar searchText={searchTerm} onChangeSearchText={setSearchTerm} />
      </div>

      {filteredBlogs.length === 0 && searchTerm !== "" && (
        <p className="text-center text-xl">No blogs found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
        {(searchTerm ? filteredBlogs : allBlogs)
          .filter((blog) => !blog.private)
          .map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
}

export default Main;


// import React, { useState, useEffect, useContext } from "react";
// import SearchBar from "./SearchBar";
// import BlogCard from "./BlogCard";
// import BlogContext from "../../context/BlogContext"; // Import BlogContext

// function Main() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { state, dispatch } = useContext(BlogContext); // Use context instead of Redux

//   const { allBlogs, filteredBlogs } = state;

//   useEffect(() => {
//     dispatch({
//       type: "filterBlogsBySearchTerm",
//       payload: { searchTerm },
//     });
//   }, [searchTerm, dispatch]);

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
//         <SearchBar searchText={searchTerm} onChangeSearchText={setSearchTerm} />
//       </div>

//       {filteredBlogs.length === 0 && searchTerm !== "" && (
//         <p className="text-center text-xl">No blogs found.</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
//         {(searchTerm ? filteredBlogs : allBlogs)
//           .filter((blog) => !blog.private) 
//           .map((blog) => (
//             <BlogCard key={blog.id} blog={blog} />
//           ))}
//       </div>
//     </div>
//   );
// }

// export default Main;

