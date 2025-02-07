"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";
const Footer: React.FC<any> = ({ menu, socials }) => {
  return (
    <footer className={styles.mainFooter}>
      <div className={`main-container`}>
        <div className={styles.footerFormContainer}>
          <div>
            <div className={styles.footerFormTitle}>Оставайтесь на связи</div>
            <p className={styles.footerFormText}>
              В этой статье мы расскажем о том, что нужно взять с собой в поход,
              чтобы он был безопасным и комфортным. Мы рассмотрим основные
              категории снаряжения, такие как одежда, обувь, рюкзак, еда и
              вода...
            </p>
          </div>
        </div>
        <div>
          <ul className={styles.footerMenuList}>
            {menu.map((el: any, index: number) => (
              <li className={styles.fLi} key={index}>
                {<Link href={el.url}>{el.title}</Link>}
              </li>
            ))}
          </ul>
          <div className={styles.footerContactsContainer}>
            <div className={styles.footerContactsTitle}>Контакты</div>
            <div className={styles.footerContactsList}>
              <ul className={styles.socialsContainer}>
                {socials.header_contacts.map((el: any, index: number) => (
                  <li key={index} className={styles.socialsItem}>
                    <Link
                      href={el.contact_url}
                      className={styles.footerContacts}
                    >
                      <div className={styles.footerIconContacts}>
                        <Image
                          className={styles.svgInvert}
                          alt=""
                          src={el.contact_icon}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>{el.contact_text}</div>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className={styles.socialsContainer}>
                {socials.header_socials.map((el: any, index: number) => (
                  <li key={index} className={styles.socialsItem}>
                    <Link className={styles.footerIcon} href={el.social_url}>
                      <Image
                        className={styles.svgInvert}
                        alt=""
                        src={el.social_icon}
                        width={20}
                        height={20}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerLogoSection}>
          <div className={styles.footerLogo}>
            <Image
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              src={socials.header_logo}
              className={styles.svgInvert}
              width={250}
              height={250}
              alt="footer logo"
            />
          </div>
          <div>2024 Разработано студией MasIt</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
