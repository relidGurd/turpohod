"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Slider.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Popup from "@/layouts/Popup/Popup";
import CForm from "../CForm/CForm";

const Slider: React.FC<any> = ({ slides }) => {
  return (
    <section>
      <Swiper
        navigation={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((el: any, index: number) => (
          <SwiperSlide key={index} style={{ height: "auto" }}>
            <div className={styles.slideContaiener}>
              <div className={styles.backgroundFilter}></div>
              <div className={styles.bgImageContainer}>
                <Image
                  className={styles.bgImage}
                  src={el.image ? el.image : "/slide.png"}
                  width={1000}
                  height={1000}
                  alt={`Изображение слайда`}
                />
              </div>
              <div className={styles.sliderContentContainer}>
                <div className={`main-container ${styles.slideGrid}`}>
                  <div className={styles.slideContent}>
                    <h1 className={`main-title`}>{el.title}</h1>
                    <p className={`font-basic`}>{el.text}</p>
                    <div>
                      <Popup
                        elem={
                          <button className={`${styles.buttonS} slider-button`}>
                            Подробнее
                          </button>
                        }
                      >
                        <CForm />
                      </Popup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
