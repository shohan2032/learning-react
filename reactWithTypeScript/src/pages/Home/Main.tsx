import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BlogCard from "./BlogCard";
import { useSelector, useDispatch } from "react-redux";
import { filterBlogsBySearchTerm } from "../../slices/blog";
import { Store } from "../../interface/reduxInterface";
function Main() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useDispatch();

  const allBlogs = useSelector((state:Store) => state.favoriteBlogs.allBlogs);
  const filteredBlogs = useSelector(
    (state:Store) => state.favoriteBlogs.filteredBlogs
  );

  useEffect(() => {
    if (searchTerm.trim() === "") {
      dispatch(filterBlogsBySearchTerm({ searchTerm: "" }));
    } else {
      dispatch(filterBlogsBySearchTerm({ searchTerm }));
    }
  }, [searchTerm, dispatch]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar searchText={searchTerm} onChangeSearchText={setSearchTerm} />
      </div>

      {/* No Blogs Found Message */}
      {filteredBlogs.length === 0 && searchTerm !== "" && (
        <p className="text-center text-2xl font-semibold text-gray-600 mt-6">
          🚀 No blogs found. Try a different search!
        </p>
      )}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-6">
        {(searchTerm ? filteredBlogs : allBlogs)
          .filter((blog) => !blog.isPrivate)
          .map((blog) => (
            <div key={blog.id} className="transform transition hover:scale-105">
              <BlogCard blog={blog} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Main;
