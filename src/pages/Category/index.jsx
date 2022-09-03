import React, { useState } from "react";
import CategoryExplore from "../../components/CategoryExplore";
import ListFilm from "../../components/ListFilm";

function Category() {
  const [activeTab, setActiveTab] = useState("movie");
  return (
    <div className="flex-1">
      <CategoryExplore />
      <div className="mt-4">
        <ul className="flex items-center">
          <li
            onClick={() => setActiveTab("movie")}
            className={`${
              (activeTab === "movie" && "!text-red !bg-white/10") || ""
            } mr-4 px-5 py-2 md:w-fit w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
          >
            Movie
          </li>
          <li
            onClick={() => setActiveTab("tv")}
            className={`${
              (activeTab === "tv" && "!text-red !bg-white/10") || ""
            } px-5 py-2 md:w-fit w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
          >
            Tv Show
          </li>
        </ul>
        <ListFilm />
        <div className="mt-8 flex justify-center w-[full]">
          <button className="px-8 py-2 md:w-[200px] w-[full] text-xl text-white bg-gray-800 hover:bg-gray-900 transition-all rounded-full">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
