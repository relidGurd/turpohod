import Image from "next/image";
import styles from "./page.module.css";
import Slider from "@/components/Slider/Slider";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import NewsSection from "@/components/NewsSection/NewsSection";
import Advantages from "@/components/Advantages/Advantages";
import MainRevies from "@/components/MainReviews/MainReviews";
import { notFound } from "next/navigation"; // Для редиректа на 404
import { wordpressUrl } from "./globalUrl";

async function getData() {
  const res = await fetch(`http://pohod-spb.ru/wp-json/custom/v1/glavnaya`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return notFound;
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <main>
      <Slider slides={data.slides} />
      <UpcomingHikes hikes={data.products} />
      <Advantages features={data.features} />
      <NewsSection news={data.news} />
      <MainRevies reviews={data.reviews} />
      <section></section>
    </main>
  );
}
