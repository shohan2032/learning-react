import React from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr className="bg-gray-200">
      <th
        colSpan="6"
        className="py-2 px-4 text-left text-gray-700 font-bold uppercase tracking-wide"
      >
        {category}
      </th>
    </tr>
  );
}

export default ProductCategoryRow;
