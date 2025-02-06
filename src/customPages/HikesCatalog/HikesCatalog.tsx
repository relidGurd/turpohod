"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./hikes.module.css";
import Link from "next/link";
import { DatePicker, ConfigProvider } from "antd";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";
import "dayjs/locale/ru";

const HikesCatalog: React.FC<any> = ({ data }: any) => {
  const { RangePicker } = DatePicker;
  const [date, setDate] = useState<any>(undefined);
  const onChangeP = (value: any, dateString: any) => {
    setDate(dateString);
  };

  return (
    <section className={`main-container`}>
      <div className={styles.filtersContainer}>
        <span className={styles.datePickName}>Выберите даты похода</span>
        <div>
          <RangePicker
            onChange={onChangeP}
            onOk={(value: any) => setDate(value)}
            placeholder={["Дата начала", "Дата окончания"]}
          />
        </div>
      </div>
      <ul className={styles.hikesList}>
        {data.map((el: any) => (
          <Link href={`/hike-detail/${el.slug}`} key={el.id}>
            <ProductCard
              image={el.images[0].src}
              data={el.hike_date}
              price={el.price}
            />
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default HikesCatalog;
