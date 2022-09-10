import moment from "moment";
import { BsFillStarFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { alternativePoster } from "../../shared/constant";
import { getImage } from "../../shared/utils";

function Similar({ type, film }) {
  return (
    <div className="lg:px-8 flex-1 w-full lg:border-l border-1 border-white/10">
      <h3 className="text-2xl text-white font-semibold">More like this</h3>
      <ul className="mt-6 w-full max-h-[700px] overflow-y-auto">
        {film?.similar?.map((item) => (
          <li key={item.id} className="mb-6 w-full">
            <Link to={`/${type}/${item.id}`} className="flex items-start">
              <LazyLoadImage
                className="w-[100px] h-[150px] object-cover rounded-lg mr-4"
                src={
                  item?.poster_path
                    ? getImage("original", item?.poster_path)
                    : alternativePoster
                }
                alt={item.title || item.name}
              />
              <div className="">
                <p className="text-xl text-white font-normal">
                  {item.title || item.name}
                </p>
                <div className="mt-4 flex items-center justify-start">
                  <div className="mr-3 flex flex-col items-center justify-center gap-2 p-2 bg-red rounded-full">
                    <span className="text-xs text-white">
                      {parseFloat(item?.vote_average?.toFixed(1)).toString()}
                    </span>
                    <BsFillStarFill className="text-xs text-white" />
                  </div>
                  <span className="ml-4 text-xl text-white font-thin leading-normal">
                    {moment(item?.release_date || item?.first_air_date).format(
                      "yyyy"
                    )}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Similar;
