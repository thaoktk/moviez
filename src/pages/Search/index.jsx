import { Image } from "@chakra-ui/react";
import React from "react";
import SearchSection from "../../components/SearchSection";

function Search() {
  return (
    <div className="w-full">
      <div className="mb-10">
        <p className="text-4xl text-white text-center font-semibold">
          Find a movie or tv show you want to watch
        </p>
      </div>
      <SearchSection />
      <div className="mt-10 w-full">
        <Image
          className="w-full h-full rounded-lg"
          objectFit="cover"
          src="https://decider.com/wp-content/uploads/2016/07/stranger-things-eleven.jpg?quality=75&strip=all"
          alt="Dan Abramov"
        />
      </div>
    </div>
  );
}

export default Search;
