import React from "react";
import Banner from "../../components/Banner";
import DetailOfFilm from "../../components/DetailOfFilm";
import Similar from "../../components/Similar";

function FilmDetail() {
  return (
    <div className="lg:px-8 px-5 py-5">
      <Banner />
      <div className="mt-8 flex lg:flex-row flex-col items-start justify-between gap-8">
        <DetailOfFilm />
        <Similar />
      </div>
    </div>
  );
}

export default FilmDetail;
