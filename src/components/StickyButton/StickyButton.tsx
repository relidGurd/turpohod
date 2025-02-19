import Link from "next/link";
import styles from "./StickyButton.module.css";
import Image from "next/image";

const StickyButton: React.FC<any> = ({ socials }) => {
  return (
    <Link
      href={
        socials.header_contacts[0].contact_url
          ? socials.header_contacts[0].contact_url
          : "/"
      }
      className={styles.stickyContainer}
    >
      <div className={styles.stickyItem}>
        <Image src={"/phone.svg"} width={150} height={150} alt="phone icon" />
      </div>
    </Link>
  );
};

export default StickyButton;
