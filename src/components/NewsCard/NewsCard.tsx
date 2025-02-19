"use client";

import Image from "next/image";
import styles from "./NewsCard.module.css";
import NewsArrow from "@/icons/NewsArrow";
import Link from "next/link";

const NewsCard: React.FC<any> = ({ text, title, image, slug }) => {
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
            alt={`Превью фото новости ${title}`}
          />
        </div>
        <div>
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
