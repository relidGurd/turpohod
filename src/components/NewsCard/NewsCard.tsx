"use client";

import Image from "next/image";
import styles from "./NewsCard.module.css";
import NewsArrow from "@/icons/NewsArrow";
import Link from "next/link";

const NewsCard: React.FC<any> = ({ text, title, date, image, slug }) => {
  const formatDate = (isoDate: any) => {
    const date = new Date(isoDate); // Создаем объект Date из строки ISO
    const day = String(date.getDate()).padStart(2, "0"); // Получаем день с ведущим нулем
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Получаем месяц с ведущим нулем
    const year = date.getFullYear(); // Получаем год
    return `${day}.${month}.${year}`; // Возвращаем строку в нужном формате
  };

  return (
    <Link href={`/blog-detail/${slug}`}>
      <div className={styles.NewsCard}>
        <div className={styles.newsImageContainer}>
          <div className={styles.arrowContainer}>
            <NewsArrow />
          </div>
          <Image
            src={image ? image : "/example.jpg"}
            width={1000}
            height={1000}
            alt=""
          />
        </div>
        <div>
          <div className={styles.cardInfoItem}>
            <div className={styles.cardIcon}>
              <Image
                src={"/calendar.svg"}
                width={25}
                height={25}
                alt="Иконка календарь"
              />
            </div>
            <span>Дата: {formatDate(date)}</span>
          </div>
          <div className={styles.NewsCardTitle}>{title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: text
                ? text.length > 300
                  ? text.slice(0, 300) + "..."
                  : text
                : "ffff",
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
