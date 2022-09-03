import { Image, useDisclosure } from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";
import { BiPlay } from "react-icons/bi";
import ModalMovie from "../ModalMovie";

function Banner() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="w-full h-full relative">
      <Image
        className="w-full h-[500px] rounded-lg opacity-50"
        objectFit="cover"
        src="https://www.elleman.vn/wp-content/uploads/2022/05/31/214603/Stranger-Things-4_elleman.jpeg"
        alt="Dan Abramov"
      />
      <div className="absolute bottom-5 md:left-10 left-5 px-10 py-8 flex md:flex-row flex-col items-center">
        <div className="flex items-center md:mr-64 mb-8">
          <div className="mr-3 flex flex-col items-center justify-center gap-2 p-2 bg-red rounded-full">
            <span className=" text-lg text-white">8.5</span>
            <BsFillStarFill className="text-md text-white" />
          </div>
          <div>
            <div className="text-xl text-white font-semibold w-full">
              35.7K VOTES
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
          Movie
        </span>
      </div>
      <ModalMovie isOpen={isOpen} onClose={onClose}>
        <div className="w-full h-full">
          <iframe
            className="lg:min-h-[500px] w-full h-full"
            src="https://www.youtube.com/embed/yQEondeGvKo"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </ModalMovie>
    </div>
  );
}

export default Banner;
