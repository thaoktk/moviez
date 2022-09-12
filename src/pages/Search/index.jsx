import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import notFoundImage from "../../assets/image/pngwing.com.png";
import FilmItem from "../../components/FilmItem";
import Pagination from "../../components/Pagination";
import SearchSection from "../../components/SearchSection";
import { getFilmSearch } from "../../shared/actions";
import useQuerySearchStore from "../../store/search";

function Search() {
  const { querySearch } = useQuerySearchStore();
  const [listFilms, setListFilms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (querySearch) {
      getFilmSearch(querySearch, activePage).then((res) => {
        if (res) {
          setListFilms(res.results);
          setTotalPages(res.total_pages);
        }
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setListFilms([]);
    }
  }, [querySearch, activePage]);

  return (
    <div className="w-full">
      <div className="mb-10">
        <p className="text-4xl text-white text-center font-semibold">
          Find a movie or tv show you want to watch
        </p>
      </div>
      <SearchSection />
      {listFilms.length > 0 && (
        <div className="mt-8">
          <p className="text-xl text-white font-medium">
            Search results for "{querySearch}".
          </p>
        </div>
      )}
      {listFilms.length <= 0 && !querySearch && (
        <div className="mt-10 w-full">
          <LazyLoadImage
            className="w-full h-full object-cover rounded-lg"
            src="https://decider.com/wp-content/uploads/2016/07/stranger-things-eleven.jpg?quality=75&strip=all"
            alt="Eleven"
          />
        </div>
      )}
      {listFilms.length <= 0 && querySearch && (
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
      )}
      {listFilms.length > 0 && (
        <ul className="mt-8 flex flex-wrap items-center lg:justify-start justify-center md:gap-10 gap-x-4 gap-y-5">
          {listFilms?.map((film) => (
            <li
              key={film.id}
              className="relative w-[150px] h-[250px] rounded-lg film-section overflow-hidden"
            >
              <FilmItem type={film.media_type} film={film} />
            </li>
          ))}
        </ul>
      )}
      {listFilms.length > 0 && (
        <Pagination
          pageCount={totalPages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      )}
    </div>
  );
}

export default Search;
