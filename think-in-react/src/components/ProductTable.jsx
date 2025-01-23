import React from "react";
import ProductCategoryRow from "./ProductCategoryRow";
import ProductRow from "./ProductRow";

function ProductTable({
  filterText,
  inStockOnly,
  products
}) {
  // Filter products based on filterText and inStockOnly
  let lastCategory = null;
  const filteredProducts = [];
  products.forEach((product) => {
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
      return;
    }
    if (product.category !== lastCategory) {
      lastCategory = product.category;
      filteredProducts.push(<ProductCategoryRow category={product.category} key={product.category}/>);
    }
    filteredProducts.push(<ProductRow product={product} key={product.name}/>);

  });
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-b">Name</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 border-b">Price</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{filteredProducts}</tbody>
      </table>
    </div>
  );
}

export default ProductTable;
