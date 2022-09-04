import React from "react";
import { Link } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import { Image } from "@chakra-ui/react";
import { getImage } from "../../shared/utils";

function FilmItem({ type, film }) {
  return (
    <>
      <Link to={`/${type}/${film.id}`} className="relative w-full h-full">
        <Image
          className="w-full h-full opacity-75 image-film-section transition-all"
          objectFit="cover"
          src={getImage("original", film.poster_path)}
          alt={film.title || film.name}
        />
        <p className="p-2 w-full absolute bottom-0 left-0 backdrop-blur-2xl bg-white/20 text-lg text-white text-center text-ellipsis whitespace-nowrap overflow-hidden rounded-b-lg">
          {film.title || film.name}
        </p>
      </Link>
      <div className="flex items-center absolute top-5 left-5 px-3 py-1 bg-red rounded-full">
        <span className="text-xs text-white mr-2">
          {parseFloat(film.vote_average.toFixed(1)).toString()}
        </span>
        <BsFillStarFill className="text-xs text-white" />
      </div>
    </>
  );
}

export default FilmItem;
