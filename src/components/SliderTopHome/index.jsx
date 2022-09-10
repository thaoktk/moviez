import moment from "moment";
import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { BsFillStarFill } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getBannerHome } from "../../shared/actions";
import { getImage } from "../../shared/utils";

function SliderTopHome({ type }) {
  const [swiper, setSwiper] = useState();
  const [listFilms, setListFilms] = useState([]);

  useEffect(() => {
    getBannerHome(type).then((res) => {
      if (res) {
        setListFilms(res);
      }
    });
  }, [type]);

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
          {listFilms?.map((film) => (
            <SwiperSlide key={film.id} className="relative">
              <LazyLoadImage
                className="w-full h-full object-cover"
                src={getImage("original", film.backdrop_path)}
                alt={film.title}
              />
              <div className="absolute top-0 left-0 w-full h-full px-8 py-5 bg-gradient-to-r from-black/90 to-black/10">
                <div className="flex items-center absolute top-5 md:right-5 right-3 px-3 py-1 bg-red rounded-full">
                  <span className="md:text-md text-xs text-white mr-2">
                    {parseFloat(film.vote_average.toFixed(1)).toString()}
                  </span>
                  <BsFillStarFill className="md:text-md text-xs text-white" />
                </div>
                <h2 className="md:text-5xl text-2xl text-red font-semibold lg:max-w-[500px] text-shadow">
                  {film.title || film.name}
                </h2>
                <p className="mt-5 text-md text-white/60">
                  Released date:{" "}
                  {moment(film.release_date || film.first_air_date).format(
                    "MM-DD-YYYY"
                  )}
                </p>
                <p className="mt-5 md:text-lg text-md text-white/60 lg:max-w-[550px]">
                  {`${film.overview.substring(0, 300)} ...`}
                </p>
                <div className="mt-5">
                  <Link
                    to={`/${type}/${film.id}`}
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
