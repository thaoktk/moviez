import { Image, useDisclosure } from "@chakra-ui/react";
import { BiPlay } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { TRAILER_URL } from "../../shared/constant";
import { getImage } from "../../shared/utils";
import ModalMovie from "../ModalMovie";

function Banner({ type, film }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full h-full relative">
      <Image
        className="w-full h-[500px] rounded-lg opacity-50"
        objectFit="cover"
        src={getImage("original", film?.detail?.backdrop_path)}
        alt={film?.detail?.title}
      />
      <div className="absolute bottom-5 md:left-10 left-5 px-10 py-8 flex md:flex-row flex-col items-center">
        <div className="flex items-center md:mr-64 mb-8">
          <div className="mr-3 flex flex-col items-center justify-center gap-2 p-2 bg-red rounded-full">
            <span className=" text-lg text-white">
              {parseFloat(film?.detail?.vote_average?.toFixed(1)).toString()}
            </span>
            <BsFillStarFill className="text-md text-white" />
          </div>
          <div>
            <div className="text-xl text-white font-semibold w-full">
              {film?.detail?.vote_count} VOTES
            </div>
            <div className="text-md text-white/40 w-full">
              By The Movie Database
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={onOpen}
            className="px-8 py-2 flex items-center justify-between gap-5 backdrop-blur-xl bg-white/20 hover:bg-red hover:border-red rounded-full border border-1 transition-all"
          >
            <BiPlay className="text-xl text-white" />
            <span className="text-lg text-white font-semibold">TRAILER</span>
          </button>
        </div>
      </div>
      <div className="absolute top-10 right-10">
        <span className="px-5 py-2 backdrop-blur-xl bg-white/20 text-white border border-1 rounded-full transition-all">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>
      <ModalMovie isOpen={isOpen} onClose={onClose}>
        <div className="w-full h-full">
          {(film?.trailer?.key && (
            <iframe
              className="lg:min-h-[500px] w-full h-full"
              src={`${TRAILER_URL}/${film?.trailer?.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )) || (
            <p className="text-xl text-white text-center font-medium">
              This film doesn't have Trailer
            </p>
          )}
        </div>
      </ModalMovie>
    </div>
  );
}

export default Banner;
