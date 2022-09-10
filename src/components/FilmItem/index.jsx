import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { alternativePoster } from "../../shared/constant";
import { getImage } from "../../shared/utils";

function FilmItem({ type, film }) {
  return (
    <>
      <Link
        to={`/${type}/${film?.id}`}
        title={film?.title || film?.name}
        className="relative w-full h-full"
      >
        <LazyLoadImage
          className="w-full h-full object-cover opacity-75 image-film-section transition-all rounded-lg"
          src={
            (film?.poster_path && getImage("original", film?.poster_path)) ||
            alternativePoster
          }
          alt={film?.title || film?.name}
        />
        <p className="p-2 w-full absolute bottom-0 left-0 z-10 backdrop-blur-2xl bg-white/20 text-lg text-white text-center text-ellipsis whitespace-nowrap overflow-hidden rounded-b-lg">
          {film?.title || film?.name}
        </p>
      </Link>
      <div className="flex items-center absolute top-5 left-5 px-3 py-1 bg-red rounded-full">
        <span className="text-xs text-white mr-2">
          {(film?.vote_average &&
            parseFloat(film?.vote_average?.toFixed(1)).toString()) ||
            "0"}
        </span>
        <BsFillStarFill className="text-xs text-white" />
      </div>
    </>
  );
}

export default FilmItem;
