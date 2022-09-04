import React from "react";
import { v4 } from "uuid";
import FilmItem from "../FilmItem";

function ListFilm() {
  return (
    <ul className="mt-8 flex flex-wrap items-center lg:justify-start justify-center md:gap-10 gap-x-4 gap-y-5">
      {new Array(8).fill(null).map(() => (
        <li key={v4()} className="relative w-[150px] h-[250px]">
          <FilmItem />
        </li>
      ))}
    </ul>
  );
}

export default ListFilm;
