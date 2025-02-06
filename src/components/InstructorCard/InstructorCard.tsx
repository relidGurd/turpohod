"use client";
import Image from "next/image";
import styles from "./InstructorCard.module.css";
const InstructorCard: React.FC<any> = ({
  title,
  hike_type,
  featured_image,
  description,
}) => {
  return (
    <div className={styles.instructorCard}>
      <div className={styles.instructorImageContainer}>
        <Image
          className={styles.instructorImage}
          src={featured_image ? featured_image : "/example.jpg"}
          width={850}
          height={850}
          alt=""
        />
      </div>
      <div className={styles.descriptionBlock}>
        <div>
          <div className={styles.instructorTitle}>{title}</div>
          <div className={styles.categoryInstructor}>
            <div className={styles.categoryInstructorIcon}>
              <Image
                className={styles.instructorImage}
                src={"/"}
                width={25}
                height={25}
                alt=""
              />
            </div>
            <div className={styles.instructorsCategoryTitle}>{hike_type}</div>
          </div>
        </div>
        <div
          className={styles.instructorCardText}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
};

export default InstructorCard;
