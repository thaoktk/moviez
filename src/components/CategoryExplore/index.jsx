import React, { useState } from "react";
import { v4 } from "uuid";

function CategoryExplore() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="lg:px-8 px-5 py-5 w-full">
      <ul className="w-full h-full flex flex-wrap items-center justify-center gap-4">
        {(showMore &&
          new Array(20).fill(null).map(() => (
            <li
              key={v4()}
              className="px-3 py-1 text-lg text-white/60 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all"
            >
              Drama
            </li>
          ))) ||
          new Array(10).fill(null).map(() => (
            <li
              key={v4()}
              className="px-3 py-1 text-lg text-white/60 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all"
            >
              Drama
            </li>
          ))}
        <button
          onClick={() => setShowMore((prev) => !prev)}
          className="text-lg text-red"
        >
          {(showMore && "Show less") || "Show more"}
        </button>
      </ul>
    </div>
  );
}

export default CategoryExplore;
