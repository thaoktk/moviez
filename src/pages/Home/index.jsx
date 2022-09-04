import React from "react";
import SliderSection from "../../components/SliderSection";
import SliderTopHome from "../../components/SliderTopHome";
import useTypeSearch from "../../store/type";

function Home() {
  const { typeSearch } = useTypeSearch();

  return (
    <div className="flex-1">
      <SliderTopHome type={typeSearch} />
      <SliderSection
        type={typeSearch}
        paramSearch="popular"
        heading="Popular"
      />
      <SliderSection
        type={typeSearch}
        paramSearch="top_rated"
        heading="Top Rated"
      />
      <SliderSection
        type={typeSearch}
        paramSearch="trending"
        heading="Trending"
      />
      <SliderSection
        type={typeSearch}
        paramSearch={typeSearch === "movie" ? "upcoming" : "on_the_air"}
        heading={typeSearch === "movie" ? "Upcoming" : "On the Air"}
      />
    </div>
  );
}

export default Home;
