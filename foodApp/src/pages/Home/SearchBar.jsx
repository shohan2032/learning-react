import React from "react";

function SearchBar({
  searchText,
  onChangeSearchText,
}) {
  return (
    <form className="bg-white shadow-md rounded-lg p-6 mb-4 w-2/3">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search By Food Category. Ex: Beef...."
          value={searchText}
          onChange={(e) => onChangeSearchText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </form>
  );
}

export default SearchBar;
