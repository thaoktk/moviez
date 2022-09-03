import { Image } from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

function Similar() {
  return (
    <div className="lg:px-8 flex-1 w-full lg:border-l border-1 border-white/10">
      <h3 className="text-2xl text-white font-semibold">More like this</h3>
      <ul className="mt-6 w-full max-h-[700px] overflow-y-auto">
        {new Array(10).fill(null).map(() => (
          <li key={v4()} className="mb-6 w-full">
            <Link to="/movie/:slug" className="flex items-start">
              <Image
                className="w-[100px] h-[150px] rounded-lg mr-4"
                objectFit="cover"
                src="https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw=="
                alt="Dan Abramov"
              />
              <div className="">
                <p className="text-xl text-white font-medium">
                  Stranger things
                </p>
                <div className="mt-4 flex items-center justify-center">
                  <div className="mr-3 flex flex-col items-center justify-center gap-2 p-2 bg-red rounded-full">
                    <span className="text-xs text-white">8.5</span>
                    <BsFillStarFill className="text-xs text-white" />
                  </div>
                  <span className="ml-4 text-xl text-white font-thin leading-normal">
                    2016 <br /> 140 Min
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
