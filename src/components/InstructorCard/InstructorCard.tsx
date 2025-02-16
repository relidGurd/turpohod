"use client";
import Image from "next/image";
import styles from "./InstructorCard.module.css";
import Link from "next/link";
const InstructorCard: React.FC<any> = ({
  title,
  hike_type,
  featured_image,
  description,
  slug,
}) => {
  return (
    <Link href={`/instructor-detail/${slug}`}>
      <div className={styles.instructorCard}>
        <div className={styles.instructorImageContainer}>
          <Image
            className={styles.instructorImage}
            src={featured_image ? featured_image : "/example.png"}
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
                  src={"/mountain.svg"}
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
    </Link>
  );
};

export default InstructorCard;
