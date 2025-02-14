"use client";

import Link from "next/link";
import styles from "./ReviewItem.module.css";
import Popup from "@/layouts/Popup/Popup";

const ReviewItem: React.FC<any> = ({ review }) => {
  return (
    <Popup
      elem={
        <li className={styles.ReviewItem}>
          <div className={styles.reviewPresent}>
            <div className={styles.reviewCircle}></div>
            <div className={styles.reviewDate}>22.02.2025</div>
          </div>
          <div>
            <div className={styles.reviewerName}>
              {review.reviewer ? review.reviewer : ""}
            </div>
            <span className={styles.reviewHike}>{review.product_name}</span>
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
            <Link className={styles.reviewLink} href={"/"}>
              Подробнее
            </Link>
          </div>
        </li>
      }
    >
      <li className={styles.ReviewItem}>
        <div>
          <div className={styles.reviewerName}>
            {review.reviewer ? review.reviewer : ""}
          </div>
          <span className={styles.reviewHike}>{review.product_name}</span>
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
