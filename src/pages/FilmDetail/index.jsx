import { Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import DetailOfFilm from "../../components/DetailOfFilm";
import Similar from "../../components/Similar";
import { getDataFilm } from "../../shared/actions";
import useFilmDetail from "../../store/film";
import useTypeSearch from "../../store/type";

function FilmDetail() {
  const { id } = useParams();
  const { typeSearch } = useTypeSearch();
  const { film, setFilm } = useFilmDetail();

  useEffect(() => {
    getDataFilm(typeSearch, id, setFilm);
  }, [typeSearch, id, setFilm]);

  return (
    <div className="lg:px-8 px-5 py-5">
      {!film ? (
        <Spinner color="red.500" />
      ) : (
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
