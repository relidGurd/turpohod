"use client";

import styles from "./UpcomingHikes.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper/modules";
import ProductCard from "../ProductCard/ProductCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import Link from "next/link";
import LeftArrow from "@/icons/Left";
import RightArrow from "@/icons/Right";

const UpcomingHikes: React.FC<any> = ({ hikes }) => {
  const swiperRef = useRef<any>(null);

  return (
    <section className="main-container">
      <SectionTitle title={"Ближайшие походы"} description={"llfflf"} />
      <div className={styles.stagesButtons}>
        <div
          onClick={() => swiperRef.current?.slidePrev()}
          className={styles.leftButton}
        >
          <LeftArrow className="icon" />
        </div>
        <div
          onClick={() => swiperRef.current?.slideNext()}
          className={styles.rightButton}
        >
          <RightArrow className="icon" />
        </div>
      </div>
      <div>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
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
          className={`mySwiper ${styles.productList}`}
        >
          {hikes.map((el: any) => (
            <SwiperSlide key={el.id}>
              <Link
                href={`/hike-detail/${
                  el.slug || el.link.split("/product/")[1]
                }`}
              >
                <ProductCard
                  image={el.image}
                  title={el.name}
                  price={el.price}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link
          style={{ cursor: "pointer" }}
          href={"/hike"}
          className={`primaryButtonWhite`}
        >
          Смотреть все
        </Link>
      </div>
    </section>
  );
};

export default UpcomingHikes;
