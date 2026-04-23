import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LocationCarouselSwiper({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="bg-bgMain py-16">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 140,
            modifier: 1.8,
            scale: 0.85,
            slideShadows: false,
          }}
          className="location-swiper"
        >
          {items.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!w-[260px] sm:!w-[420px] lg:!w-[760px]"
            >
              <article className="overflow-hidden rounded-[32px] lg:rounded-[40px] bg-white shadow-[0_20px_55px_rgba(0,0,0,0.12)]">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.92fr]">
                  <div className="h-[280px] sm:h-[360px] lg:h-[480px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>

                  <div className="flex flex-col justify-center bg-[#f7f7f7] px-6 py-8 sm:px-8lg:px-6 lg:py-6">
                    <div className="text-[14px] sm:text-[15px] font-bold tracking-[0.18em] uppercase text-brandbrown font-['Times_New_Roman']">
                      {item.star}
                    </div>

                    <h3 className="mt-4 text-[30px] sm:text-[38px] lg:text-[36px] leading-[1.08] font-extrabold text-brandText font-['Times_New_Roman']">
                      {item.title}
                    </h3>

                    <p className="mt-6 lg:mt-10 text-[16px] sm:text-[18px] lg:text-[22px] leading-[1.8] font-semibold text-brandText-light font-['Times_New_Roman']">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
