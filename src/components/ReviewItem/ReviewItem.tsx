"use client";

import Link from "next/link";
import styles from "./ReviewItem.module.css";

const ReviewItem: React.FC<any> = () => {
  return (
    <li className={styles.ReviewItem}>
      <div className={styles.reviewPresent}>
        <div className={styles.reviewCircle}></div>
        <div className={styles.reviewDate}>22.02.2025</div>
      </div>
      <div>
        <div className={styles.reviewerName}>Иванов И.П.</div>
        <span className={styles.reviewHike}>Название похода</span>
        <div className={styles.reviewText}>
          В этой статье мы расскажем о том, что нужно взять с собой в поход,
          чтобы он был безопасным и комфортным.
        </div>
        <Link className={styles.reviewLink} href={"/"}>
          Подробнее
        </Link>
      </div>
    </li>
  );
};

export default ReviewItem;
