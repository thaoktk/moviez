import moment from "moment";
import { BsFillCalendarFill, BsFillStarFill } from "react-icons/bs";
import useTvVideoStore from "../../store/tvVideo";

function DetailFilmWatching({ type, film }) {
  const { tvVideo } = useTvVideoStore();
  return (
    <div className="mt-8 md:px-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-4xl text-white font-medium">
          {film?.detail?.title || film?.detail?.name}
        </h2>
        {type === "tv" && (
          <p className="text-xl text-white/70">
            Episode {tvVideo.episode_number} - Season {tvVideo.season_number}
          </p>
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
      <ul className="mt-4 flex flex-wrap items-center gap-3">
        {film?.detail?.genres?.map((genre) => (
          <li
            className="px-3 py-1 text-lg text-white bg-white/20 rounded-full border-white"
            key={genre.id}
          >
            {genre.name}
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
