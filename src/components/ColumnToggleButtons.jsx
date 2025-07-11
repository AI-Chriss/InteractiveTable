import React from "react";

export default function ColumnToggleButtons({ columns, toggleColumn, showAllColumns }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {columns.map((col) => (
        <button
          key={col.key}
          onClick={() => toggleColumn(col.key)}
          className="bg-gray-200 text-sm px-2 py-1 rounded hover:bg-gray-300"
        >
          {col.visible ? `Ukryj: ${col.label}` : `Pokaż: ${col.label}`}
        </button>
      ))}
      <button
        onClick={showAllColumns}
        className="bg-blue-500 text-sm px-2 py-1 rounded hover:bg-blue-600"
      >
        Pokaż wszystkie
      </button>
    </div>
  );
}