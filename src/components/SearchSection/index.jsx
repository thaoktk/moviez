import React from "react";
import { BiSearch } from "react-icons/bi";
import ResultSearch from "./ResultSearch";

function SearchSection() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="px-4 py-3 md:w-[400px] w-full flex items-center bg-gray-800 rounded-lg">
        <BiSearch className="text-white" />
        <form action="">
          <input
            type="text"
            placeholder="Search"
            className="px-3 w-full text-lg outline-none border-none text-white bg-transparent"
          />
        </form>
      </div>
      {/* <div className="absolute top-full left-0 z-10 w-full">
        <ResultSearch />
      </div> */}
    </div>
  );
}

export default SearchSection;
