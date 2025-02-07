"use client";

import ReviewItem from "../ReviewItem/ReviewItem";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./MainRevies.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const MainRevies: React.FC<any> = () => {
  return (
    <section className="main-container">
      <SectionTitle
        title="Отзывы о нас"
        description="Мы гордимся тем, что наши походы дарят людям радость и незабываемые впечатления. Вот что говорят о нас наши участники:"
      />
      <Swiper
        style={{ padding: "20px 0" }}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          750: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          950: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={`mySwiper ${styles.productList}`}
      >
        <SwiperSlide>
          <ReviewItem />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewItem />
        </SwiperSlide>
        <SwiperSlide>
          <ReviewItem />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default MainRevies;
