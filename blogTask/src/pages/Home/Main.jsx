import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BlogCard from "./BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { filterBlogsBySearchTerm } from "../../slices/blog";

function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const allBlogs = useSelector((state) => state.favoriteBlogs.allBlogs);
  const filteredBlogs = useSelector(
    (state) => state.favoriteBlogs.filteredBlogs
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(filterBlogsBySearchTerm({ searchTerm: "" }));
    } else {
      dispatch(filterBlogsBySearchTerm({ searchTerm }));
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
