import React from "react";
import { BiSearch } from "react-icons/bi";
import useSearchStore from "../../store/search";

function ResultSearch({
  listResultSearch,
  setValueSearch,
  setShowResultSearch,
}) {
  const { setQuerySearch } = useSearchStore();
  return (
    <div className="flex items-center justify-center">
      <ul className="px-3 py-2 bg-gray-800 max-h-[200px] w-[450px] overflow-y-auto rounded-b-lg">
        {listResultSearch.map((result) => (
          <li
            onClick={() => {
              setQuerySearch(result.name);
              setValueSearch(result.name);
              setShowResultSearch(false);
            }}
            key={result.id}
            className="mb-3"
          >
            <button className="flex items-center">
              <BiSearch className="text-white mr-4" />
              <span className="text-xl text-white">{result.name}</span>
            </button>
            <div className="mt-2 w-full h-[1px] bg-white/20" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultSearch;
