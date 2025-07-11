import React from "react";

export default function TableFilterButton({ filterFunction, name }) {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={filterFunction}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        {name}
      </button>
  </div>
  );
}