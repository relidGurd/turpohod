"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./hikes.module.css";
import Link from "next/link";
import { DatePicker } from "antd";
import { useState } from "react";
import PaginationHukes from "@/components/Pagination/PaginationHukes";
import { Breadcrumb } from "antd";
import { Button } from "@mui/material";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material"; // Индикатор загрузки

const HikesCatalog: React.FC<any> = ({ data, pagination }: any) => {
  const [date, setDate] = useState<any>(undefined);
  const [filtredPagination, setFiltredPagination] = useState(pagination);
  const [filteredData, setFiltredData] = useState(data);
  const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
  const router = useRouter();

  const API_URL = `https://pohod-spb.ru/wp-json/wc/v3/products`;

  const onChangeP = (value: any, dateString: any) => {
    setDate(dateString);
  };

  const filterByDate = async () => {
    setIsLoading(true); // Начинаем загрузку
    setFiltredData([]); // Очищаем старые данные, чтобы избежать мерцания

    const formattedDate = date ? dayjs(date).format("DD.MM.YYYY") : "";

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

      const request_data = { url: API_URL, method: "GET" };
      const authHeader = oauth.toHeader(oauth.authorize(request_data));

      const res = await fetch(API_URL, {
        method: "GET",
        headers: { Authorization: authHeader.Authorization },
      });

      if (!res.ok) {
        notFound();
      }

      const products = await res.json();

      const filteredByIds = products.filter(
        (prod: any) => prod.hike_filter_date === formattedDate
      );

      setFiltredData(filteredByIds);
      setFiltredPagination(1);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false); // Завершаем загрузку
    }
  };

  return (
    <section className={`main-container`}>
      <Breadcrumb
        style={{ margin: "1rem 0" }}
        items={[
          { title: <Link href="/">На главную</Link> },
          { title: "Походы" },
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
          <Button
            style={{ marginLeft: "0.5rem" }}
            onClick={filterByDate}
            variant="text"
            disabled={isLoading} // Блокируем кнопку при загрузке
          >
            {isLoading ? "Загрузка..." : "Фильтр"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loaderContainer}>
          <CircularProgress /> {/* Индикатор загрузки */}
        </div>
      ) : (
        <ul className={styles.hikesList}>
          {filteredData.length !== 0 ? (
            filteredData.map((el: any) => (
              <li key={el.id} className={styles.hikeItem}>
                <Link
                  style={{ display: "contents" }}
                  href={`/hike-detail/${el.slug}`}>
                  <ProductCard
                    title={el.name}
                    image={el.images[0]?.src}
                    price={el.price}
                    place={el.hike_address}
                    dates={el.hike_dates}
                    hikePath={el.hike_path}
                  />
                </Link>
              </li>
            ))
          ) : (
            <div className={styles.falseLoad}>
              <div>Походов в эту дату нет</div>
              <Button
                onClick={() => {
                  router.push("/hike", { scroll: false });
                  window.location.reload();
                }}
                style={{ marginTop: "1rem" }}
                variant="contained">
                Смотреть все походы
              </Button>
            </div>
          )}
        </ul>
      )}
      <PaginationHukes hikes_pages={filtredPagination} />
    </section>
  );
};

export default HikesCatalog;
