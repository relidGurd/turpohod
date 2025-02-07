"use client";

import Image from "next/image";
import styles from "./SectionTitle.module.css";

interface ISection {
  title: string;
  description: string;
}

const SectionTitle: React.FC<ISection> = ({ title, description }) => {
  return (
    <>
      <div className={styles.mainSubtitle}>
        <div className={styles.mainSubtitleCircleContainer}>
          <div className={styles.mainSubtitleCircleBlur}></div>
          <div className={styles.mainSubtitleCircle}></div>
        </div>
        <span className={styles.mainSubtitleText}>
          Мы устраиваем самые интересные походы
        </span>
      </div>

      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionTitles}>
          <h2 className="main-title">{title}</h2>
        </div>
        <p className={`${styles.descriptionText} font-basic`}>{description}</p>
      </div>
    </>
  );
};

export default SectionTitle;
