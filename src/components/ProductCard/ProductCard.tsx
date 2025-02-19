"use client";

import Image from "next/image";
import styles from "./ProductCard.module.css";

const ProductCard: React.FC<any> = ({
  image,
  title,
  dates,
  price,
  place,
  hikePath,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div>
        <div className={styles.cardImageContainer}>
          <Image
            className={styles.cardImage}
            src={image ? image : "/example.jpg"}
            width={1000}
            height={1000}
            alt={title ? `Поход: ${title}` : "фото не указано"}
          />
        </div>
        <div className={styles.cardTitle}>{title}</div>
      </div>
      <div>
        <div className={styles.cardMainInfo}>
          <div className={styles.cardInfoItem}>
            <div className={styles.cardIcon}>
              <Image
                src={"/calendar.svg"}
                width={25}
                height={25}
                alt="Иконка календарь"
              />
            </div>
            <span>Даты: {dates}</span>
          </div>
          <div className={styles.cardInfoItem}>
            <div className={styles.cardIcon}>
              <Image
                src={"/map.svg"}
                width={25}
                height={25}
                alt="Иконка карта"
              />
            </div>
            <span>Направление: {place ? place : "Неизвестно"}</span>
          </div>
          <div className={styles.cardInfoItem}>
            <div className={styles.cardIcon}>
              <Image
                src={"/path.svg"}
                width={25}
                height={25}
                alt="Иконка карта"
              />
            </div>
            <span>
              Протяженность: {hikePath ? `${hikePath} км.` : "Неизвестно"}
            </span>
          </div>
        </div>
        <div className={`${styles.cardInfo} ${styles.cardPriceSection}`}>
          <div className={styles.productPrice}>
            {price ? (
              `${price} руб.`
            ) : (
              <span style={{ color: "red" }}>Нет мест</span>
            )}
          </div>
          <button className={`small-button`}>Подробнее</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
