"use client";
import { useEffect } from "react";
import styles from "./ProductPage.module.css";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import { useState } from "react";
import Popup from "@/layouts/Popup/Popup";
import CForm from "@/components/CForm/CForm";
import Image from "next/image";
import ProductGallery from "@/components/ProductGallery/ProductGallery";

const ProductPage: React.FC<any> = ({
  title,
  description,
  smallText,
  category,
  date,
  price,
  images,
}) => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const tabData = [
    {
      title: "О писание похода",
      content: hasMounted ? (
        <span dangerouslySetInnerHTML={{ __html: description }} />
      ) : (
        ""
      ),
    },
    {
      title: "Галерея",
      content: hasMounted ? <ProductGallery images={images} /> : "",
    },
    { title: "Комментарии", content: "Содержимое третьей вкладки" },
  ];

  const [value, setValue] = useState(tabData[0].title);
  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
  };
  return (
    <section className="main-container">
      <div className={styles.cardContainer}>
        <div>
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {images.map((el: any) => (
              <SwiperSlide key={el.id}>
                <div className={styles.imageContainer}>
                  <Image
                    className={styles.imageContainerIm}
                    width={1000}
                    height={1000}
                    src={el.src}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div>
          <h1 className={`${styles.productTitle} main-title`}>{title}</h1>
          <div className={styles.productInfo}>
            <div>
              <span>Категория: {category[0].name}</span>
            </div>
            <div>
              <span>Дата: </span>
              {date}
            </div>
          </div>
          <p className={styles.productSmallDescription}>
            {smallText ? smallText : "Описание отсутсвует"}
          </p>
          <div className={styles.productPrice}>
            {price ? (
              <>
                <span>Стоимость: </span>
                {price} р.
              </>
            ) : (
              ""
            )}
          </div>
          {price ? (
            <button className="small-button">Бронировать</button>
          ) : (
            <Popup elem={<button className="small-button">Узнать дату</button>}>
              <CForm />
            </Popup>
          )}
        </div>
      </div>
      <Box sx={{ width: "100%", borderRadius: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "fullWidth"} // Растягивает вкладки по всей ширине
          aria-label="customized tabs"
          sx={{
            display: "flex",
            justifyContent: "center",
            "& .MuiTabs-flexContainer": {
              gap: "20px", // Расстояние между вкладками
              padding: "1rem 0",
            },
            "& .MuiTab-root": {
              flex: 1, // Равномерное распределение
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#666",
              backgroundColor: "transparent",
              borderRadius: "8px",
              transition: "all 0.3s ease",
              border: "1px solid transparent",
              boxShadow: "2px 2px 13px -6px rgba(34, 60, 80, 0.4)",
              "&.Mui-selected": {
                color: "#007d6f",
                backgroundColor: "transparent",
                border: "1px solid #007d6f",
              },
              "&:hover": {
                backgroundColor: "#fef6ef",
              },
            },
            "& .MuiTabs-indicator": {
              display: "none", // Убираем стандартный индикатор
            },
          }}>
          {tabData.map((tab) => (
            <Tab key={tab.title} label={tab.title} value={tab.title} />
          ))}
        </Tabs>
        <Box
          sx={{ p: 3, mt: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
          <div>{tabData.find((tab) => tab.title === value)?.content}</div>
        </Box>
      </Box>
    </section>
  );
};

export default ProductPage;
