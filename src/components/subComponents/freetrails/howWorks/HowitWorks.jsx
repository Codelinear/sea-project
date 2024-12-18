import React from "react";
import "swiper/css";
import 'swiper/css/pagination';
import "./how.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

const HowitWorks = () => {
  return (
    <>
      <div className="how-it-works">
        <div className="head-works">
          <h3>How does it work?</h3>
        </div>
      </div>
      <div className="slid">
        <Swiper
          direction="horizontal"
          mousewheel={{ releaseOnEdges: true }}
          freeMode={{ enabled: true, slidesPerGroup: 1 }}
          pagination={{ type: 'progressbar' }}
          spaceBetween={10}
          slidesPerView={3}
          releaseOnEdges={true}
          modules={[Mousewheel, Pagination]}
          className="swip mySwiper"
        >
          <SwiperSlide>
            <div className="slides">
              <h1 className="slide-cont-no">1</h1>
              <h2 className="slide-cont">Amet magus</h2>
              <p className="slide-cont-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae, consequuntur.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slides">
              <h1 className="slide-cont-no">2</h1>
              <h2 className="slide-cont">Amet magus</h2>
              <p className="slide-cont-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae, consequuntur.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slides">
              <h1 className="slide-cont-no">3</h1>
              <h2 className="slide-cont">Amet magus</h2>
              <p className="slide-cont-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae, consequuntur.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slides">
              <h1 className="slide-cont-no">4</h1>
              <h2 className="slide-cont">Amet magus</h2>
              <p className="slide-cont-p">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae, consequuntur.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HowitWorks;
