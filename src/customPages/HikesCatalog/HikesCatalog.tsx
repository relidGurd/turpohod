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

  const API_URL = `https://cms.pohod-spb.ru/wp-json/wc/v3/products`;

  const onChangeP = (value: any, dateString: any) => {
    setDate(dateString);
    if (!dateString) {
      router.push("/hike");
      window.location.reload();
    }
    return filterByDate(dateString);
  };

  const filterByDate = async (test: any) => {
    setIsLoading(true); // Начинаем загрузку
    setFiltredData([]); // Очищаем старые данные, чтобы избежать мерцания

    const formattedDate = test ? dayjs(test).format("DD.MM.YYYY") : "";

    try {
      const oauth = new OAuth({
        consumer: {
          key: "ck_8cc97116a2e001d4a8c361f0b659389a868f3339",
          secret: "cs_e8f900c35a383b4e0f4810c48220fc0678452c60",
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

  const filterByPrice = async (ascending: boolean) => {
    setIsLoading(true);
    setFiltredData([]);

    try {
      const oauth = new OAuth({
        consumer: {
          key: "ck_8cc97116a2e001d4a8c361f0b659389a868f3339",
          secret: "cs_e8f900c35a383b4e0f4810c48220fc0678452c60",
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

      // Фильтрация и сортировка
      const sortedByPrice = products
        .map((prod: any) => ({
          ...prod,
          price: prod.price ? Number(prod.price) : NaN, // Преобразуем цену в число, если она не пустая
        }))
        .filter((prod: any) => !isNaN(prod.price) && prod.price > 0) // Исключаем пустые или некорректные цены
        .sort((a: any, b: any) =>
          ascending ? a.price - b.price : b.price - a.price
        ); // Сортировка

      setFiltredData(sortedByPrice);
      setFiltredPagination(1);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterByDateTwo = async (ascending = false) => {
    setIsLoading(true);
    setFiltredData([]);

    try {
      const oauth = new OAuth({
        consumer: {
          key: "ck_8cc97116a2e001d4a8c361f0b659389a868f3339",
          secret: "cs_e8f900c35a383b4e0f4810c48220fc0678452c60",
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

      // Фильтрация и сортировка
      const sortedByDate = products
        .map((prod: any) => ({
          ...prod,
          price: prod.price ? Number(prod.price) : NaN, // Преобразуем цену в число, если она не пустая
          date: prod.hike_filter_date
            ? new Date(prod.hike_filter_date.split(".").reverse().join("-"))
            : null, // Преобразуем дату в объект Date
        }))
        .filter(
          (prod: any) =>
            !isNaN(prod.price) &&
            prod.price > 0 &&
            prod.date instanceof Date &&
            !isNaN(prod.date)
        ) // Исключаем пустые или некорректные цены и даты
        .sort((a: any, b: any) => {
          if (ascending) {
            return a.date - b.date;
          } else {
            return b.date - a.date;
          }
        });

      setFiltredData(sortedByDate);
      setFiltredPagination(1);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
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
        <div>
          <div>
            <span className={styles.datePickName}>Выберите даты похода</span>
            <DatePicker
              onChange={onChangeP}
              onOk={(value: any) => setDate(value)}
              placeholder={"Выберите дату похода"}
            />
          </div>
        </div>

        <div className={styles.sortedContainer}>
          <div style={{ marginRight: "1rem" }}>
            <div>
              <span className={styles.datePickName}>Сортировать по дате: </span>
              <button
                onClick={() => filterByDateTwo()}
                disabled={isLoading}
                style={{
                  textDecoration: "underline",
                  color: "var(--primary-green)",
                }}
              >
                Ближайшие походы
              </button>
            </div>
          </div>
          <div>
            <div>
              <span className={styles.datePickName}>Сортировать по цене: </span>
              <button
                onClick={() => filterByPrice(true)}
                disabled={isLoading}
                style={{
                  marginRight: "1rem",
                  textDecoration: "underline",
                  color: "var(--primary-green)",
                }}
              >
                По возрастанию
              </button>
              <button
                onClick={() => filterByPrice(false)}
                disabled={isLoading}
                style={{
                  textDecoration: "underline",
                  color: "var(--primary-green)",
                }}
              >
                По убыванию
              </button>
            </div>
          </div>
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
                  href={`/hike-detail/${el.slug}`}
                >
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
                variant="contained"
              >
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
