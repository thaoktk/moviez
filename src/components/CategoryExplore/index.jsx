import React, { useEffect, useState } from "react";
import { getAllGenresByType } from "../../shared/actions";
import useActiveGenres from "../../store/activeGenres";

function CategoryExplore({ type }) {
  const { activeGenres, setActiveGenres } = useActiveGenres();
  const [genresByType, setGenresByType] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    getAllGenresByType(type).then((res) => {
      if (res) {
        setGenresByType(res);
      }
    });
  }, [type]);

  useEffect(() => {
    setActiveGenres([]);
  }, [type, setActiveGenres]);

  const genresRender = (showMore && genresByType) || genresByType.slice(0, 8);

  const handleSetGenres = (genreId) => {
    if (activeGenres.includes(genreId)) {
      const genres = activeGenres.filter(
        (activeGenre) => activeGenre !== genreId
      );
      setActiveGenres(genres);
    } else {
      setActiveGenres([...activeGenres, genreId]);
    }
  };

  return (
    <div className="lg:px-8 px-5 py-5 w-full">
      <ul className="w-full h-full flex flex-wrap items-center justify-center gap-4">
        {genresRender.map((genre) => (
          <li
            key={genre.id}
            onClick={() => handleSetGenres(genre.id)}
            className={` ${
              activeGenres.includes(genre.id) ? "!text-white !border-white" : ""
            }
            px-3 py-1 text-lg text-white/60 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all`}
          >
            {genre.name}
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
