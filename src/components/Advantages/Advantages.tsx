"use client";
import ContactUs from "../ContactUs/ContactUs";
import styles from "./Advantages.module.css";
import Image from "next/image";
const Advantages: React.FC<any> = ({ features }) => {
  return (
    <section className={styles.AdvantagesContainer}>
      <div className="main-container">
        <ContactUs />
        <div>
          <ul className={styles.advantagesList}>
            {features.map((el: any, index: number) => (
              <li className={styles.advItem} key={index}>
                <div className={styles.advItemImageContainer}>
                  <Image
                    className={styles.advItemImage}
                    src={el.image ? el.image : "/road.svg"}
                    alt={"Иконка преимущества"}
                    width={150}
                    height={150}
                  />
                </div>
                <span>{el.title}</span>
                <div className={styles.advItemDescription}>
                  {el.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
