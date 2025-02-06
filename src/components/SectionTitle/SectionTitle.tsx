"use client";

import Image from "next/image";
import styles from "./SectionTitle.module.css";

const SectionTitle: React.FC<any> = () => {
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
          <h2 className="main-title">Ближайшие походы</h2>
        </div>
        <p className={`${styles.descriptionText} font-basic`}>
          Присоединяйтесь к нашим приключениям! Мы организуем походы любой
          сложности для любителей природы и активного отдыха. От легких прогулок
          выходного дня до сложных многодневных маршрутов – выбирайте то, что
          подходит именно вам!
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
