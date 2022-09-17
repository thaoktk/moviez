import { Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import notFoundImage from "../../assets/image/pngwing.com.png";
import CategoryExplore from "../../components/CategoryExplore";
import FilmItem from "../../components/FilmItem";
import Pagination from "../../components/Pagination";
import { getFilmsByGenres } from "../../shared/actions";
import useActiveGenresStore from "../../store/activeGenres";
import useCommonStore from "../../store/common";

function Category() {
  const { activeGenres } = useActiveGenresStore();
  const { isLoading } = useCommonStore();
  const [activeTab, setActiveTab] = useState("movie");
  const [listFilms, setListFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getFilmsByGenres(activeTab, activeGenres, activePage).then((res) => {
      if (res) {
        setListFilms(res.results);
        if (res.total_pages > 500) {
          setTotalPages(500);
        } else {
          setTotalPages(res.total_pages);
        }
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activeGenres, activeTab, activePage]);

  useEffect(() => {
    setActivePage(1);
  }, [activeTab, activeGenres]);

  return (
    <div className="flex-1">
      {(isLoading && (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner color="red.500" />
        </div>
      )) || (
        <div className="">
          <div className="mb-10">
            <p className="text-4xl text-white text-center font-semibold">
              Find a movie or tv show that best fit you
            </p>
          </div>
          <ul className="mb-5 flex items-center">
            <li
              onClick={() => setActiveTab("movie")}
              className={`${
                (activeTab === "movie" && "!text-red !bg-white/10") || ""
              } mr-4 px-5 py-2 md:w-fit w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
            >
              Movie
            </li>
            <li
              onClick={() => setActiveTab("tv")}
              className={`${
                (activeTab === "tv" && "!text-red !bg-white/10") || ""
              } px-5 py-2 md:w-fit w-full text-lg text-white bg-transparent hover:text-red hover:bg-white/20 rounded-lg transition-all`}
            >
              Tv Show
            </li>
          </ul>
          <CategoryExplore type={activeTab} />
          {listFilms.length <= 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center">
              <LazyLoadImage
                className="md:w-[500px] w-full h-full object-cover rounded-lg"
                src={notFoundImage}
                alt="404"
              />
              <p className="mt-7 text-4xl text-white text-center font-semibold">
                There is no such films
              </p>
            </div>
          ) : (
            <>
              <ul className="mt-8 flex flex-wrap items-center lg:justify-start justify-center md:gap-10 gap-x-4 gap-y-5">
                {listFilms?.map((film) => (
                  <li
                    key={film.id}
                    className="relative w-[150px] h-[250px] rounded-lg film-section overflow-hidden"
                  >
                    <FilmItem type={film.media_type || activeTab} film={film} />
                  </li>
                ))}
              </ul>
              <Pagination
                pageCount={totalPages}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Category;
