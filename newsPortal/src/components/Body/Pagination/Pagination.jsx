import React from "react";

function Pagination({ totalCountOfNews, next, previous, onChangeCurrentPage, onChangePreviousPage }) {
  const pageSize = 5; 

  return (
    <div className="flex justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={onChangePreviousPage}
        disabled={previous === 0}
        className={`${
          previous === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-bold py-2 px-4 rounded-l`}
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        onClick={onChangeCurrentPage}
        disabled={next * pageSize >= totalCountOfNews}
        className={`${
          next * pageSize >= totalCountOfNews ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-bold py-2 px-4 rounded-r`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
