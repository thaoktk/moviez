import { Image } from "@chakra-ui/react";
import moment from "moment";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getImage } from "../../shared/utils";

function Similar({ type, film }) {
  return (
    <div className="lg:px-8 flex-1 w-full lg:border-l border-1 border-white/10">
      <h3 className="text-2xl text-white font-semibold">More like this</h3>
      <ul className="mt-6 w-full max-h-[700px] overflow-y-auto">
        {film?.similar?.map((item) => (
          <li key={item.id} className="mb-6 w-full">
            <Link to={`/${type}/${item.id}`} className="flex items-start">
              <Image
                className="w-[100px] h-[150px] rounded-lg mr-4"
                objectFit="cover"
                src={getImage("original", item?.poster_path)}
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
