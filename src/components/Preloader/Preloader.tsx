"use client";

import styles from "./preloader.module.css";
import { Flex, Spin } from "antd";

const PreloaderC = () => {
  return (
    <div className={styles.preloaderContainer}>
      <div className={styles.preloaderSpinContainer}>
        <Flex align="center" gap="middle">
          <Spin size="large" />
          <span>Загрузка...</span>
        </Flex>
      </div>
    </div>
  );
};

export default PreloaderC;
