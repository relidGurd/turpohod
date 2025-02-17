import Image from "next/image";
import styles from "./page.module.css";
import Slider from "@/components/Slider/Slider";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import NewsSection from "@/components/NewsSection/NewsSection";
import Advantages from "@/components/Advantages/Advantages";
import MainRevies from "@/components/MainReviews/MainReviews";
import { notFound } from "next/navigation"; // Для редиректа на 404

async function getData() {
  try {
    const res = await fetch(
      `http://cms.pohod-spb.ru/wp-json/custom/v1/glavnaya`,
      {
        next: { revalidate: 100 },
      }
    );

    if (!res.ok) {
      console.error(`Ошибка загрузки главной страницы: ${res.status}`);
      return notFound();
    }

    const data = await res.json();
    if (!data || Object.keys(data).length === 0) {
      console.error("API вернул пустые данные!");
      return notFound();
    }

    return data;
  } catch (error) {
    console.error("Ошибка загрузки главной страницы:", error);
    return notFound();
  }
}

async function getReviews() {
  try {
    const res = await fetch(
      `https://cms.pohod-spb.ru/wp-json/wc/v3/products/reviews?consumer_key=ck_8cc97116a2e001d4a8c361f0b659389a868f3339&consumer_secret=cs_e8f900c35a383b4e0f4810c48220fc0678452c60&per_page=10`,
      {
        next: { revalidate: 100 },
      }
    );

    if (!res.ok) {
      console.error(`Ошибка загрузки отзывов: ${res.status}`);
      return notFound();
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Отзывы не найдены!");
      return notFound();
    }

    return data;
  } catch (error) {
    console.error("Ошибка загрузки отзывов:", error);
    return notFound();
  }
}

export default async function Home() {
  const data = await getData();
  const reviews = await getReviews();

  return (
    <main>
      <Slider slides={data?.slides || []} />
      <UpcomingHikes hikes={data?.products || []} />
      <Advantages features={data?.features || []} />
      <NewsSection news={data?.news || []} />
      <MainRevies reviews={reviews || []} />
    </main>
  );
}
