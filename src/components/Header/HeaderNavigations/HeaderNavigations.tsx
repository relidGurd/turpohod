"use client";

import Image from "next/image";
import styles from "./headerNavigations.module.css";
import Link from "next/link";
const HeaderNavigations: React.FC<any> = ({ logo, menu }) => {
  return (
    <div className={`main-container ${styles.container}`}>
      <Link href={"/"}>
        <Image src={logo} width={137} height={56} alt="" />
      </Link>
      <nav>
        <ul className={styles.headerMenuContainer}>
          {menu.map((el: any, index: number) => (
            <li key={index}>
              <Link href={el.url}>{el.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* <div>Search Component</div> */}
    </div>
  );
};

export default HeaderNavigations;
