import React from "react";
import { Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { Image } from "@chakra-ui/react";

function FilmItem() {
  return (
    <>
      <Link to="/movie/:slug" className="relative w-full h-full">
        <Image
          className="w-full h-3/4 opacity-75 image-film-section transition-all"
          objectFit="cover"
          src="https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw=="
          alt="Dan Abramov"
        />
        <p className="mt-3 text-lg text-white font-normal text-center w-full text-ellipsis whitespace-nowrap overflow-hidden ">
          Stranger things
        </p>
      </Link>
      <div className="flex items-center absolute top-5 left-5 px-3 py-1 bg-red rounded-full">
        <span className="text-xs text-white mr-2">8.5</span>
        <BsFillStarFill className="text-xs text-white" />
      </div>
    </>
  );
}

export default FilmItem;
