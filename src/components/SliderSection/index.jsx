import { useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Autoplay, FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import axiosClient from "../../shared/axiosClient";
import FilmItem from "../FilmItem";
// em dat vi tri file bị sai rôi hay sao y
function SliderSection({ heading, type, paramSearch }) {
  const [swiper, setSwiper] = useState();
  const [filmList, setFilmList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (paramSearch === "trending") {
        const res = await axiosClient.get(`/${paramSearch}/${type}/week`);
        setFilmList(res.data.results);
      } else {
        const res = await axiosClient.get(`/${type}/${paramSearch}`);
        setFilmList(res.data.results);
      }
    };

    getData();
  }, [type, paramSearch]);

  return (
    <div className="py-4 w-full">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl text-white font-bold">{heading}</h3>
        <div className="mt-4 flex justify-center items-center gap-4">
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
      <div className="relative w-full h-[300px]">
        <Swiper
          modules={[Navigation, Autoplay, FreeMode]}
          freeMode
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          autoplay={{ delay: 5000 }}
          scrollbar={{ draggable: true }}
          loop
          onSwiper={(swiper) => setSwiper(swiper)}
          className="!absolute !top-0 !left-0 !w-full !h-full !rounded-lg"
        >
          {filmList.map((film) => (
            <SwiperSlide
              key={film.id}
              className="relative film-section rounded-lg overflow-hidden"
            >
              <FilmItem type={type} film={film} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SliderSection;
