"use client";

import Link from "next/link";
import styles from "./ReviewItem.module.css";
import Popup from "@/layouts/Popup/Popup";
import dayjs from "dayjs";
const ReviewItem: React.FC<any> = ({ review }) => {
  const formattedDate = dayjs(review.date_created).format("DD.MM.YYYY");

  const decodedName = review.product_name
    .replace(/&#171;/g, "«")
    .replace(/&#187;/g, "»");

  return (
    <Popup
      elem={
        <li className={styles.ReviewItem}>
          <div className={styles.reviewPresent}>
            <div className={styles.reviewCircle}></div>
            <div className={styles.reviewDate}>{formattedDate}</div>
          </div>
          <div>
            <div className={styles.reviewerName}>
              {review.reviewer ? review.reviewer : ""}
            </div>
            <span className={styles.reviewHike}>{decodedName}</span>
            <div
              className={styles.reviewText}
              dangerouslySetInnerHTML={{
                __html: review.review
                  ? review.review.length > 300
                    ? review.review.slice(0, 300) + "..."
                    : review.review
                  : "ffff",
              }}
            />
            <span className={styles.reviewLink}>Подробнее</span>
          </div>
        </li>
      }
    >
      <li className={styles.ReviewItem}>
        <div>
          <div className={styles.reviewerName}>
            {review.reviewer ? review.reviewer : ""}
          </div>
          <span className={styles.reviewHike}>{decodedName}</span>
          <div
            className={styles.reviewText}
            dangerouslySetInnerHTML={{
              __html: review.review,
            }}
          />
        </div>
      </li>
    </Popup>
  );
};

export default ReviewItem;
