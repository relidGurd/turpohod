"use client";
import Link from "next/link";
import styles from "./headerContacts.module.css";
import Image from "next/image";
const HeaderContacts: React.FC<any> = ({ contacts, socials }) => {
  return (
    <div className={styles.headerContacts}>
      <div className={`main-container ${styles.headerContactsContainer}`}>
        <ul className={styles.socialsContainer}>
          {socials.map((el: any, index: number) => (
            <li key={index} className={styles.socialsItem}>
              <Link href={el.social_url}>
                <Image alt="" src={el.social_icon} width={20} height={20} />
              </Link>
            </li>
          ))}
        </ul>

        <ul className={styles.socialsContainer}>
          {contacts.map((el: any, index: number) => (
            <li key={index} className={styles.contactItem}>
              <Link className={styles.contactsLink} href={`${el.contact_url}`}>
                <Image alt="" src={el.contact_icon} width={20} height={20} />
                <span>{el.contact_text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeaderContacts;
