"use client";
import styles from "./header.module.css";
import HeaderContacts from "./HeaderContacts/HeaderContacts";
import HeaderNavigations from "./HeaderNavigations/HeaderNavigations";
import Link from "next/link";
import Burger from "@/icons/Burger";
import CloseIcon from "@/icons/CloseIcon";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import { useRef } from "react";
const Header: React.FC<any> = ({ menu, socials }) => {
  const [openMobile, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(socials);
  const [hideMenu, sethideMenu] = useState(false);
  const [visible, setVisible] = useState(true);

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < lastScrollY.current) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    lastScrollY.current = latest;
  });

  const variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
    },
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { type: "tween", ease: "easeInOut", duration: 0.3 },
    },
  };

  return (
    <motion.header
      initial="open"
      animate={visible ? "open" : "closed"}
      variants={variants}
      className={styles.mainHeader}>
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
          animate={{ x: openMobile ? 0 : "100%" }}
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
              {menu.map((el: any, index: any) => (
                <li key={index}>
                  <Link href={el.url} onClick={() => handleClose()}>
                    {el.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div>
              <div className={styles.mobileSocials}>
                <span>Email:</span>
                {socials.header_contacts[1].contact_text ? (
                  <a href={socials.header_contacts[1].contact_url}>
                    {socials.header_contacts[1].contact_text}
                  </a>
                ) : (
                  ""
                )}
              </div>
              <div className={styles.mobileSocials}>
                <span>Телефон:</span>
                {socials.header_contacts[0].contact_text ? (
                  <a href={socials.header_contacts[0].contact_url}>
                    {socials.header_contacts[0].contact_text}
                  </a>
                ) : (
                  ""
                )}
              </div>
            </div>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
