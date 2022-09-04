import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import DetailFilmWatching from "../../components/DetailFilmWatching";
import Similar from "../../components/Similar";
import TvEpisode from "../../components/TvEpisode";
import Video from "../../components/Video";
import { getDataFilm } from "../../shared/actions";
import useFilmDetail from "../../store/film";
import useTypeSearch from "../../store/type";

function FilmWatch() {
  const { id } = useParams();
  const { typeSearch } = useTypeSearch();
  const { film, setFilm } = useFilmDetail();

  useEffect(() => {
    getDataFilm(typeSearch, id, setFilm);
  }, [typeSearch, id, setFilm]);

  return (
    <div className="lg:px-8 px-5 py-5 flex lg:flex-row flex-col items-start justify-between gap-6">
      <div className="lg:flex-[3_3_0%] flex-1">
        <Video type={typeSearch} film={film} />
        <DetailFilmWatching type={typeSearch} film={film} />
        <Comment />
      </div>
      {(typeSearch === "movie" && (
        <Similar type={typeSearch} film={film} />
      )) || <TvEpisode film={film} />}
    </div>
  );
}

export default FilmWatch;
