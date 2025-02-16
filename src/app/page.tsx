import Image from "next/image";
import styles from "./page.module.css";
import Slider from "@/components/Slider/Slider";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import NewsSection from "@/components/NewsSection/NewsSection";
import Advantages from "@/components/Advantages/Advantages";
import MainRevies from "@/components/MainReviews/MainReviews";
import { notFound } from "next/navigation"; // Для редиректа на 404

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

async function getReviews() {
  const res = await fetch(
    `https://cms.pohod-spb.ru//wp-json/wc/v3/products/reviews?consumer_key=ck_8a9dfb1d0caeec90ca8a649017d42fc437956ac0&consumer_secret=cs_de302e3f4a9a31a84363d289ed2dbd824a71b558&per_page=10`,
    {
      next: { revalidate: 100 },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return notFound;
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const reviews = await getReviews();
  return (
    <main>
      <Slider slides={data.slides} />
      <UpcomingHikes hikes={data.products} />
      <Advantages features={data.features} />
      <NewsSection news={data.news} />
      <MainRevies reviews={reviews} />
    </main>
  );
}
