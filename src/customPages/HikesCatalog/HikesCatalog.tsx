"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./hikes.module.css";
import Link from "next/link";
import { DatePicker, ConfigProvider } from "antd";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import PaginationHukes from "@/components/Pagination/PaginationHukes";
import { Breadcrumb } from "antd";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { wordpressUrlWC } from "@/app/globalUrl";

const HikesCatalog: React.FC<any> = ({ data, pagination }: any) => {
  const [prodList, setProdList] = useState({ data, pagination });
  const [date, setDate] = useState<any>(undefined);

  const onChangeP = (value: any, dateString: any) => {
    setDate(dateString);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString); // Преобразуем строку в объект Date
    const day = date.getDate().toString().padStart(2, "0"); // Получаем день и добавляем ведущий ноль
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Получаем месяц, увеличиваем на 1, добавляем ведущий ноль
    const year = date.getFullYear(); // Получаем год

    return `${day}.${month}.${year}`; // Формируем строку в формате DD.MM.YYYY
  };

  const handleRequest = async () => {
    try {
      const oauth = new OAuth({
        consumer: {
          key: "ck_8a9dfb1d0caeec90ca8a649017d42fc437956ac0",
          secret: "cs_de302e3f4a9a31a84363d289ed2dbd824a71b558",
        },
        signature_method: "HMAC-SHA1",
        hash_function(base_string, key) {
          return crypto
            .createHmac("sha1", key)
            .update(base_string)
            .digest("base64");
        },
      });

      console.log(date);
      // Формируем URL запроса с учетом выбранной даты
      const apiUrl = date
        ? `${wordpressUrlWC}/products?per_page=9&hike_filter_date=${formatDate(
            date
          )}`
        : `${wordpressUrlWC}/products?per_page=9`;

      console.log(apiUrl);
      const request_data = {
        url: apiUrl,
        method: "GET",
      };

      const authHeader = oauth.toHeader(oauth.authorize(request_data));

      const res = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: authHeader.Authorization,
        },
      });

      if (!res.ok) {
        throw new Error("Ошибка запроса");
      }

      const dataz = await res.json();
      const pagination = res.headers.get("X-WP-TotalPages");
      console.log(dataz);
      setProdList({ data, pagination });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={`main-container`}>
      <Breadcrumb
        style={{ margin: "1rem 0" }}
        items={[
          {
            title: <Link href="/">На главную</Link>,
          },
          {
            title: "Походы",
          },
        ]}
      />
      <div className={styles.filtersContainer}>
        <span className={styles.datePickName}>Выберите даты похода</span>
        <div>
          <DatePicker
            onChange={onChangeP}
            onOk={(value: any) => setDate(value)}
            placeholder={"Выберите дату похода"}
          />
        </div>
        <button onClick={handleRequest}>Фильтровать</button>
      </div>
      <ul className={styles.hikesList}>
        {prodList.data.map((el: any) => (
          <li key={el.id} className={styles.hikeItem}>
            <Link
              style={{ display: "contents" }}
              href={`/hike-detail/${el.slug}`}
            >
              <ProductCard
                title={el.name}
                image={el.images[0].src}
                price={el.price}
                place={el.hike_address}
                dates={el.hike_dates}
              />
            </Link>
          </li>
        ))}
      </ul>
      <PaginationHukes hikes_pages={prodList.pagination} />
    </section>
  );
};

export default HikesCatalog;
