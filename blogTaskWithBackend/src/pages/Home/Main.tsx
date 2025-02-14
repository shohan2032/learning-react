import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BlogCard from "./BlogCard";
import { Blog } from "../../interface/reduxInterface";
import conf from "../../conf/conf";
import useDebounce from "../../hooks/UseDebounce";

function Main() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const getAllBlogs = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${conf.apiUrl}/blog/all-blogs`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllBlogs(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load blogs");
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredBlogs = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredBlogs([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${conf.apiUrl}/blog/filtered-blogs/?searchTerm=${encodeURIComponent(searchTerm)}`,// used Query Parameters
        {
          credentials: "include",
        }
      );
      // console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFilteredBlogs(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load filtered blogs"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getFilteredBlogs(debouncedSearchTerm);
    } else {
      setFilteredBlogs([]);
    }
  }, [debouncedSearchTerm]);

  const displayedBlogs = searchTerm ? filteredBlogs : allBlogs;
  const noResultsFound = searchTerm && filteredBlogs.length === 0 && !isLoading;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <SearchBar
          searchText={searchTerm}
          onChangeSearchText={setSearchTerm}
          disabled={isLoading}
        />
      </div>

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

      {noResultsFound && (
        <p className="text-center text-2xl font-semibold text-gray-600 mt-6">
          🚀 No blogs found. Try a different search!
        </p>
      )}

      {!isLoading && !error && displayedBlogs.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-6">
          {displayedBlogs
            .map((blog) => (
              <div
                key={blog.id}
                className="transform transition duration-300 hover:scale-105"
              >
                <BlogCard blog={blog} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Main;
