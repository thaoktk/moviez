import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import { getResultSearch } from "../../shared/actions";
import useQuerySearchStore from "../../store/querySearch";
import ResultSearch from "./ResultSearch";

function SearchSection() {
  const { setQuerySearch } = useQuerySearchStore();
  const [valueSearch, setValueSearch] = useState("");
  const [listResultSearch, setListResultSearch] = useState([]);
  const [showResultSearch, setShowResultSearch] = useState(false);

  const navigate = useNavigate();
  const valueDebounce = useDebounce(valueSearch);
  const inputRef = useRef(null);

  useEffect(() => {
    const hideResultSearch = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResultSearch(false);
      } else {
        setShowResultSearch(true);
      }
    };
    document.addEventListener("click", hideResultSearch);

    return () => {
      document.removeEventListener("click", hideResultSearch);
    };
  }, [inputRef]);

  useEffect(() => {
    getResultSearch(valueDebounce).then((res) => {
      if (res) {
        setListResultSearch(res);
      } else {
        setListResultSearch([]);
      }
    });
  }, [valueDebounce]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuerySearch(valueDebounce);
    navigate("/search");
    setShowResultSearch(false);
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative md:w-[400px] w-full">
        <div className="px-4 py-3 w-full flex items-center bg-gray-800 rounded-lg">
          <BiSearch className="text-white" />
          <form onSubmit={handleSubmit} action="" className="w-full">
            <input
              ref={inputRef}
              value={valueSearch}
              type="text"
              placeholder="Search"
              onChange={(e) => setValueSearch(e.target.value)}
              className="px-3 w-full text-lg outline-none border-none text-white bg-transparent"
            />
          </form>
        </div>
        {listResultSearch.length > 0 && showResultSearch && (
          <div className="absolute top-full left-0 z-10 w-full">
            <ResultSearch
              listResultSearch={listResultSearch}
              setValueSearch={setValueSearch}
              setShowResultSearch={setShowResultSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchSection;
