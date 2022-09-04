import { Avatar, Image } from "@chakra-ui/react";
import moment from "moment/moment";
import { BiPlay } from "react-icons/bi";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { getImage } from "../../shared/utils";

function DetailOfFilm({ type, film }) {
  console.log("🚀 ~ file: index.jsx ~ line 10 ~ DetailOfFilm ~ type", type)
  return (
    <div className="lg:px-8 flex-[3_3_0%]">
      <div className="flex md:flex-row flex-col md:items-start items-center justify-start">
        <Image
          className="w-[150px] h-[200px] rounded-lg md:mr-8"
          objectFit="cover"
          src={getImage("original", film?.detail?.poster_path)}
          alt={film?.detail?.title || film?.detail?.name}
        />
        <div className="md:mt-0 mt-8">
          <h2 className="text-4xl text-white md:text-start text-center font-semibold">
            {film?.detail?.title || film?.detail?.name}
          </h2>
          <ul className="mt-5 flex flex-wrap items-center md:justify-start justify-center gap-3">
            {film?.detail?.genres?.slice(0, 3).map((genre) => (
              <li
                className="text-lg text-white/60 px-3 py-1 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all"
                key={genre.id}
              >
                <Link to="/category">{genre.name}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center md:justify-start justify-center gap-4">
            <Link
              to={`/${type}/${film?.detail?.id}/watch`}
              className="px-8 py-2 flex items-center justify-between gap-5 bg-red rounded-full hover:bg-red/80 transition-all"
            >
              <BiPlay className="text-xl text-white" />
              <span className="text-lg text-white font-semibold">WATCH</span>
            </Link>
            <button className="p-3 w-[50px] h-[50px] flex items-center justify-center border border-1 rounded-full">
              <BsFillHeartFill className="text-lg text-white" />
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
        <div>
          <h3 className="text-2xl text-white font-semibold">Cast</h3>
          <ul className="mt-6 flex lg:flex-col flex-row flex-wrap items-start lg:gap-6 gap-10">
            {film?.credits?.map((credit) => (
              <li key={v4()} className="flex credits-center">
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
