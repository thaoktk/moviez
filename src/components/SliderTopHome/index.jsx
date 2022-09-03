import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import axiosClient from "../../shared/axiosClient";
import { getImage } from "../../shared/utils";

const text =
  'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion';

function SliderTopHome({ type }) {
  const [swiper, setSwiper] = useState();
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosClient.get(`/${type}/now_playing`);
      setFilmList(res.data.results);
    };

    getData();
  }, [type]);

  console.log(filmList);

  return (
    <div className="py-5 w-full">
      <div className=" relative w-full h-[450px]">
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          scrollbar={{ draggable: true }}
          loop
          onSwiper={(swiper) => setSwiper(swiper)}
          className="!absolute !top-0 !left-0 !w-full !h-full !rounded-lg"
        >
          {filmList.map((film) => (
            <SwiperSlide key={film.id} className="relative">
              <Image
                className="w-full h-full"
                objectFit="cover"
                src={getImage("original", film.backdrop_path)}
                alt={film.title}
              />
              <div className="absolute top-0 left-0 w-full h-full px-8 py-5 bg-gradient-to-r from-black/90 to-black/10">
                <div className="flex items-center absolute top-5 md:right-5 right-3 px-3 py-1 bg-red rounded-full">
                  <span className="md:text-md text-xs text-white mr-2">
                    {film.vote_average}
                  </span>
                  <BsFillStarFill className="md:text-md text-xs text-white" />
                </div>
                <h2 className="md:text-5xl text-2xl text-red font-semibold lg:max-w-[500px] text-shadow">
                  {film.title}
                </h2>
                <p className="mt-5 ml-2 text-md text-white/60">
                  Released date: {film.release_date}
                </p>
                <ul className="mt-4 flex items-center gap-3">
                  {["Drama", "Action", "Fiction"].map((item) => (
                    <li
                      className="md:text-lg text-xs text-white/60 px-3 py-1 rounded-full border border-1 border-gray-400"
                      key={item}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 md:text-lg text-md text-white/60 lg:max-w-[550px]">
                  {`${film.overview.substring(0, 200)} ...`}
                </p>
                <div className="mt-5">
                  <Link
                    to="/movie/:slug"
                    className="block w-fit px-5 py-2 md:text-xl text-lg text-white backdrop-blur-2xl bg-white/20 hover:bg-red hover:border-red rounded-full border border-1 transition-all"
                  >
                    Watch now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-5 flex justify-center items-center gap-4">
        <button
          className="flex justify-center items-center w-[35px] h-[35px] rounded-full border border-1 border-white hover:border-red transition-all btn-slider"
          onClick={() => swiper.slidePrev()}
        >
          <BiChevronLeft className="text-lg text-white transition-all icon-slider" />
        </button>
        <button
          className="flex justify-center items-center w-[35px] h-[35px] rounded-full border border-1 border-white hover:border-red transition-all btn-slider"
          onClick={() => swiper.slideNext()}
        >
          <BiChevronRight className="text-lg text-white transition-all icon-slider" />
        </button>
      </div>
    </div>
  );
}

export default SliderTopHome;
