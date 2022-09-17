import { Avatar } from "@chakra-ui/react";
import moment from "moment/moment";
import { BiPlay } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { updateDocument } from "../../firebase/service";
import useCollect from "../../hooks/useCollect";
import useToastify from "../../hooks/useToastify";
import { getImage } from "../../shared/utils";
import useAuthStore from "../../store/auth";

function DetailOfFilm({ type, film }) {
  const { id } = useParams();
  const { currentUser } = useAuthStore();
  const user = useCollect("users", currentUser.uid);

  const showToast = useToastify();

  const handleClickFavBtn = ({ type, filmId }) => {
    if (currentUser.uid) {
      if (!user.favoriteFilms || user.favoriteFilms.length <= 0) {
        updateDocument("users", currentUser.uid, {
          favoriteFilms: [{ type, filmId }],
        });
      } else {
        if (user.favoriteFilms.some((film) => film.filmId === filmId)) {
          updateDocument("users", currentUser.uid, {
            favoriteFilms: user.favoriteFilms.filter(
              (film) => film.filmId !== filmId.toString()
            ),
          });
        } else {
          updateDocument("users", currentUser.uid, {
            favoriteFilms: [...user.favoriteFilms, { type, filmId }],
          });
        }
      }
    } else {
      showToast({
        title: "Error",
        description: "You need to login to add a favorite film.",
        status: "error",
      });
    }
  };

  const handleClickWatchBtn = ({ type, filmId }) => {
    if (currentUser.uid) {
      if (!user.historyFilms || user.historyFilms.length <= 0) {
        updateDocument("users", currentUser.uid, {
          historyFilms: [{ type, filmId }],
        });
      } else {
        if (user.historyFilms.some((film) => film.filmId === filmId)) {
          return;
        } else {
          updateDocument("users", currentUser.uid, {
            historyFilms: [...user.historyFilms, { type, filmId }],
          });
        }
      }
    }
  };

  return (
    <div className="lg:px-8 flex-[3_3_0%]">
      <div className="flex md:flex-row flex-col md:items-start items-center justify-start">
        <LazyLoadImage
          className="w-[150px] h-[200px] object-cover rounded-lg md:mr-8"
          src={getImage("original", film?.detail?.poster_path)}
          alt={film?.detail?.title || film?.detail?.name}
        />
        <div className="md:mt-0 mt-8">
          <h2 className="text-4xl text-white md:text-start text-center font-semibold">
            {film?.detail?.title || film?.detail?.name}
          </h2>
          <ul className="mt-5 flex flex-wrap items-center md:justify-start justify-center gap-3">
            {film?.detail?.genres?.map((genre) => (
              <li
                className=" px-3 py-1 text-lg text-white bg-white/20 rounded-full border-white"
                key={genre.id}
              >
                {genre.name}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center md:justify-start justify-center gap-4">
            <Link
              to={`/${type}/${id}/watch`}
              onClick={() => handleClickWatchBtn({ type, filmId: id })}
              className="px-8 py-2 flex items-center justify-between gap-5 bg-red rounded-full hover:bg-red/80 transition-all"
            >
              <BiPlay className="text-xl text-white" />
              <span className="text-lg text-white font-semibold">WATCH</span>
            </Link>
            <button
              onClick={() => handleClickFavBtn({ type, filmId: id })}
              className={`${
                (user?.favoriteFilms?.some((film) => film.filmId === id) &&
                  "active") ||
                ""
              } p-3 w-[50px] h-[50px] flex items-center justify-center border border-1 rounded-full hover:border-red btn-like`}
            >
              <BsFillHeartFill className="text-lg text-white icon-like" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 flex lg:flex-row flex-col items-start justify-between gap-8">
        <p className="lg:w-fit w-full text-3xl text-white text-center font-thin leading-snug">
          {moment(
            film?.detail?.release_date || film?.detail?.first_air_date
          ).format("yyyy")}{" "}
          <br /> {film?.detail?.runtime || film?.detail?.episode_run_time} Min
        </p>
        <div>
          <h3 className="text-2xl text-white font-semibold">Story Line</h3>
          <p className="mt-6 lg:max-w-[500px] text-white text-justify">
            {film?.detail?.overview}
          </p>
        </div>
        <div className="lg:w-fit w-full">
          <h3 className="text-2xl text-white font-semibold">Cast</h3>
          <ul className="mt-6 lg:px-5 w-full max-h-[500px] overflow-y-auto">
            {film?.credits?.map((credit) => (
              <li key={v4()} className="mb-5 flex credits-center">
                <Avatar src={getImage("original", credit.profile_path)} />
                <div className="ml-4">
                  <p className="text-lg text-red font-medium">{credit.name}</p>
                  <p className="text-white">{credit.character}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailOfFilm;
