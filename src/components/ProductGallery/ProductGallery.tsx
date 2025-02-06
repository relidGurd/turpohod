"use client";

import Popup from "@/layouts/Popup/Popup";
import styles from "./ProductGallery.module.css";
import Image from "next/image";
const ProductGallery: React.FC<any> = ({ images }) => {
  return (
    <div className={styles.galleryGrid}>
      {images.map((el: any, index: number) => (
        <Popup
          key={index}
          elem={
            <div className={styles.smallImageContainer}>
              <Image
                className={styles.galleryImage}
                src={el.src}
                width={250}
                height={250}
                alt=""
              />
            </div>
          }>
          <div className={styles.bigImageContainer}>
            <Image src={el.src} width={250} height={250} alt="" />
          </div>
        </Popup>
      ))}
    </div>
  );
};

export default ProductGallery;
