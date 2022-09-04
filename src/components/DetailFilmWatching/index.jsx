import moment from "moment";
import { BsFillStarFill, BsFillCalendarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function DetailFilmWatching({ type, film }) {
  return (
    <div className="mt-8 md:px-5">
      <div className="flex md:flex-row flex-col items-start justify-between">
        <h2 className="text-4xl text-white font-medium">
          {film?.detail?.title || film?.detail?.name}
        </h2>
        {type === "tv" && (
          <div className="md:mt-0 mt-5">
            <p className="text-lg text-white md:text-end text-start">
              Chapter three: The Case of The Missing Lifeguard
            </p>
            <p className="mt-3 text-lg text-white/50 md:text-end text-start">
              Episode 3 - Season 3
            </p>
          </div>
        )}
      </div>
      <div className="mt-5 flex items-center">
        <div className="mr-5 flex items-center">
          <BsFillStarFill className="text-lg text-red mr-3" />
          <span className="text-lg text-white">
            {parseFloat(film?.detail?.vote_average?.toFixed(1)).toString()}
          </span>
        </div>
        <div className="flex items-center">
          <BsFillCalendarFill className="text-lg text-red mr-3" />
          <span className="text-lg text-white">
            {moment(
              film?.detail?.release_date || film?.detail?.first_air_date
            ).format("yyyy")}{" "}
          </span>
        </div>
      </div>
      <ul className="mt-4 flex items-center gap-3">
        {film?.detail?.genres?.slice(0, 3).map((genre) => (
          <li
            className="text-lg text-white/60 px-3 py-1 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all"
            key={genre.id}
          >
            <Link to="/category">{genre.name}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <h3 className="text-xl text-white font-medium">Overview</h3>
        <p className="mt-4 text-lg text-white/60">{film?.detail?.overview}</p>
      </div>
    </div>
  );
}

export default DetailFilmWatching;
