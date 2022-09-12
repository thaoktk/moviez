import { Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import DetailOfFilm from "../../components/DetailOfFilm";
import Similar from "../../components/Similar";
import { getDataFilm } from "../../shared/actions";
import useCommonStore from "../../store/common";
import useFilmDetailStore from "../../store/film";
import useSearchStore from "../../store/search";

function FilmDetail() {
  const { id } = useParams();
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
    <div className="lg:px-8 px-5 py-5">
      {(isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner color="red.500" />
        </div>
      )) || (
        <>
          <Banner type={typeSearch} film={film} />
          <div className="mt-8 flex lg:flex-row flex-col items-start justify-between gap-8">
            <DetailOfFilm type={typeSearch} film={film} />
            <Similar type={typeSearch} film={film} />
          </div>
        </>
      )}
    </div>
  );
}

export default FilmDetail;
