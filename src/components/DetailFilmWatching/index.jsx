import { BsFillStarFill, BsFillCalendarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function DetailFilmWatching() {
  return (
    <div className="mt-8 md:px-5">
      <div className="flex md:flex-row flex-col items-start justify-between">
        <h2 className="text-4xl text-white font-medium">Stranger things</h2>
        <div className="md:mt-0 mt-5">
          <p className="text-lg text-white md:text-end text-start">
            Chapter three: The Case of The Missing Lifeguard
          </p>
          <p className="mt-3 text-lg text-white/50 md:text-end text-start">
            Episode 3 - Season 3
          </p>
        </div>
      </div>
      <div className="mt-5 flex items-center">
        <div className="mr-5 flex items-center">
          <BsFillStarFill className="text-lg text-red mr-3" />
          <span className="text-lg text-white">8.5</span>
        </div>
        <div className="flex items-center">
          <BsFillCalendarFill className="text-lg text-red mr-3" />
          <span className="text-lg text-white">2019</span>
        </div>
      </div>
      <ul className="mt-4 flex items-center gap-3">
        {["Drama", "Action", "Fiction"].map((item) => (
          <li
            className="text-lg text-white/60 px-3 py-1 rounded-full border border-1 border-gray-400 hover:text-white hover:border-white transition-all"
            key={item}
          >
            <Link to="/category">{item}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <h3 className="text-xl text-white font-medium">Overview</h3>
        <p className="mt-4 text-lg text-white/60">
          As the town preps for Halloween, a high-scoring rival shakes things up
          at the arcade, and a skeptical Hopper inspects a field of rotting
          pumpkins.
        </p>
      </div>
    </div>
  );
}

export default DetailFilmWatching;
