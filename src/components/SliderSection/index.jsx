import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Autoplay, FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import FilmItem from "../FlimItem";

function SliderSection({ heading, type }) {
  const [swiper, setSwiper] = useState();
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
          {new Array(8).fill(null).map(() => (
            <SwiperSlide
              key={v4()}
              className="relative film-section overflow-hidden"
            >
              <FilmItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SliderSection;
