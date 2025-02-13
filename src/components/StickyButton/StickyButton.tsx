import Link from "next/link";
import styles from "./StickyButton.module.css";
import Image from "next/image";

const StickyButton = () => {
  return (
    <Link href={`tel: 799999999`} className={styles.stickyContainer}>
      <div className={styles.stickyItem}>
        <Image src={"/phone.svg"} width={150} height={150} alt="phone icon" />
      </div>
    </Link>
  );
};

export default StickyButton;
