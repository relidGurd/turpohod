"use client";
import styles from "./header.module.css";
import HeaderContacts from "./HeaderContacts/HeaderContacts";
import HeaderNavigations from "./HeaderNavigations/HeaderNavigations";
import Link from "next/link";
import Burger from "@/icons/Burger";
import CloseIcon from "@/icons/CloseIcon";
import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
const Header: React.FC<any> = ({ menu, socials }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContainer}>
        <HeaderContacts
          contacts={socials.header_contacts}
          socials={socials.header_socials}
        />
        <HeaderNavigations menu={menu} logo={socials.header_logo} />
      </div>

      <div className={`${styles.mobileContainer} main-container`}>
        <div className={styles.mobileButtons}>
          <Link href={"/"}>
            <Image src={socials.header_logo} width={137} height={56} alt="" />
          </Link>
          <div onClick={() => handleOpen()}>
            <Burger />
          </div>
        </div>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: open ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 150 }}
          className={styles.menuListMob}>
          <div className={styles.openedMobileMainSection}>
            <div className={styles.Logo}>
              {" "}
              <Link href={"/"}>
                <Image
                  src={socials.header_logo}
                  width={137}
                  height={56}
                  alt=""
                />
              </Link>
            </div>
            <div onClick={() => handleClose()}>
              <CloseIcon />
            </div>
          </div>
          <nav>
            <ul className={styles.mobileLinks}>
              {menu.map((el: any) => (
                <li>
                  <Link href={el.url} onClick={() => handleClose()}>
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <div className={styles.mobileSocials}>
                <span>Email:</span>
                <a href="mailto:info@itai.ru">info@test.ru</a>
              </div>
              <div className={styles.mobileSocials}>
                <span>Телефон:</span>
                <a href="tel:+99999999999">+7 999 999-99-99</a>
              </div>
            </div>
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
