"use client";
import Image from "next/image";
import styles from "./ContactUs.module.css";
import Popup from "@/layouts/Popup/Popup";
import CForm from "../CForm/CForm";

const ContactUs: React.FC<any> = () => {
  return (
    <div className={styles.ContactUsContainer}>
      <div className={styles.filter}></div>
      <div className={styles.bgImageContainer}>
        <Image
          className={styles.bgImageContainer}
          src={"/bgContact.png"}
          width={1100}
          height={1100}
          alt="Баннер контакты"
        />
      </div>
      <div className={styles.ContactContent}>
        <div className={styles.subtitle}>
          <div className={styles.circle}></div>
          <span>Хочу в поход</span>
        </div>
        <div className={styles.contactsMain}>
          <span className={styles.secondaryTitle}>Позвоните нам</span>
          <h3 className={`main-title ${styles.title}`}>
            Незабываемые ощущения которые останутся с Вами до конца жизни
          </h3>
          <p className={styles.text}>
            За 11 лет мы сводили в походы более 8000 человек, организовали 300+
            экспедиций и открыли 9 направлений для треккингов и восхождений.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Popup
            elem={
              <button className={styles.contactsButton}>Консультация</button>
            }
          >
            <CForm />
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
