import { Spinner } from "@chakra-ui/react";
import React from "react";
import SliderSection from "../../components/SliderSection";
import SliderTopHome from "../../components/SliderTopHome";
import useCommonStore from "../../store/common";
import useTypeSearchStore from "../../store/typeSearch";

function Home() {
  const { typeSearch } = useTypeSearchStore();
  const { isLoading } = useCommonStore();

  return (
    <div className="flex-1">
      {(isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner color="red.500" />
        </div>
      )) || (
        <>
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
        </>
      )}
    </div>
  );
}

export default Home;
