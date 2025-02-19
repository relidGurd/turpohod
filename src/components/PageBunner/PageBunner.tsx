import styles from "./PageBunner.module.css";
import Image from "next/image";

const PageBanner = ({ title }: any) => {
  return (
    <section className={styles.pageBanner}>
      <div className={styles.bannerImageContainer}>
        <Image
          className={styles.bannerImage}
          src={"/bgContact.png"}
          width={1640}
          height={800}
          alt={`Фото страницы: ${title}`}
        />
      </div>
      <div className={styles.bannerImageContainerFilter}> </div>
      <div className={`main-container`}>
        <div className={styles.descriptionBanner}>
          <h1 className={`main-title`}>{title}</h1>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
