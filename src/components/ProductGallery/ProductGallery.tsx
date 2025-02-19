"use client";

import Popup from "@/layouts/Popup/Popup";
import styles from "./ProductGallery.module.css";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
const ProductGallery: React.FC<any> = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const clickOnImage = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <div className={styles.galleryGrid}>
      {images.map((el: any, index: number) => (
        <div onClick={() => clickOnImage(index)} key={index}>
          <Popup
            elem={
              <div className={styles.smallImageContainer}>
                <Image
                  className={styles.galleryImage}
                  src={el}
                  width={250}
                  height={250}
                  alt="Изображение галереи"
                />
              </div>
            }
          >
            <div className={styles.bigImageContainer}>
              <Swiper initialSlide={slideIndex}>
                {images.map((item: any, index: number) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={item}
                      width={1000}
                      height={1000}
                      alt="Изображение галереи"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Popup>
        </div>
      ))}
    </div>
  );
};

export default ProductGallery;
