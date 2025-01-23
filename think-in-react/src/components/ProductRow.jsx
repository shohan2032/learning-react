import React from "react";

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-red-500 font-semibold">{product.name}</span>
  );
  return (
    <tr className="hover:bg-gray-100">
      <td className="border px-4 py-2 text-gray-700">{name}</td>
      <td className="border px-4 py-2 text-gray-700">{product.price}</td>
    </tr>
  );
}

export default ProductRow;
