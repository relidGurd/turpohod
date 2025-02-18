"use client";
import styles from "./Popup.module.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import CloseIcon from "@/icons/CloseIcon";
interface IPopup {
  elem: React.ReactElement;
  children: React.ReactNode;
  isOpen?: boolean;
}

const Popup = ({ children, isOpen, elem }: IPopup) => {
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(isOpen ? isOpen : false);

  useEffect(() => {
    const handleOpen = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOpen);

    return () => document.removeEventListener("click", handleOpen);
  }, [open]);

  return (
    <div>
      <div onClick={() => setOpen(!open)}>{elem}</div>
      {open
        ? createPortal(
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={styles.popupContainer}
            >
              <div ref={ref}>
                <div className={styles.containerPop}>
                  <div
                    onClick={() => setOpen(!open)}
                    className={styles.CloseIconS}
                  >
                    <CloseIcon />
                  </div>
                  {children}
                </div>
              </div>
            </motion.div>,

            document.body
          )
        : null}
    </div>
  );
};

export default Popup;
