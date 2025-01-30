import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BlogCard from "./BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { filterBlogsBySearchTerm } from "../../slices/blog";
function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogsToShow, setblogsToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const allBlogs = useSelector((state) => state.favoriteBlogs.allBlogs);

  useEffect(() => {
    setblogsToShow(allBlogs);
    setIsLoading(true);
    setError(null);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setblogsToShow(allBlogs);
    } else {
      dispatch(filterBlogsBySearchTerm({ searchTerm }));
      const filteredBlogs = useSelector(
        (state) => state.favoriteBlogs.filteredBlogs
      );
      setblogsToShow(filteredBlogs);
    }

    setIsLoading(false);
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar searchText={searchTerm} onChangeSearchText={setSearchTerm} />
      </div>

      {isLoading && <p className="text-center text-xl">Loading...</p>}
      {error && <p className="text-center text-red-500 text-xl">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
          {blogsToShow
            .filter((blog) => !blog.private) 
            .map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Main;
