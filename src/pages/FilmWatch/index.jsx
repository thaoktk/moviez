import { Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../components/Comment";
import DetailFilmWatching from "../../components/DetailFilmWatching";
import Similar from "../../components/Similar";
import TvEpisode from "../../components/TvEpisode";
import Video from "../../components/Video";
import { getDataFilm } from "../../shared/actions";
import useCommonStore from "../../store/common";
import useFilmDetailStore from "../../store/film";
import useSearchStore from "../../store/search";

function FilmWatch() {
  const { id } = useParams();
  // zustand store
  const { isLoading } = useCommonStore();
  const { typeSearch } = useSearchStore();
  const { film, setFilm } = useFilmDetailStore();

  useEffect(() => {
    getDataFilm(typeSearch, id).then((res) => {
      if (res) {
        setFilm(res);
      }
    });
  }, [typeSearch, id, setFilm]);

  return (
    <div className="lg:px-8 px-5 py-5 flex lg:flex-row flex-col items-start justify-between gap-6">
      {(isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner color="red.500" />
        </div>
      )) || (
        <>
          <div className="lg:flex-[3_3_0%] flex-1">
            <Video type={typeSearch} film={film} />
            <DetailFilmWatching type={typeSearch} film={film} />
            <Comment />
          </div>
          {(typeSearch === "movie" && (
            <Similar type={typeSearch} film={film} />
          )) || <TvEpisode film={film} />}
        </>
      )}
    </div>
  );
}

export default FilmWatch;
