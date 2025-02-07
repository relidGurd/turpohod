"use client";

import { title } from "process";
import NewsCard from "../NewsCard/NewsCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./NewsSection.module.css";

const NewsSection: React.FC<any> = ({ news }) => {
  const newsAbout = {
    title: "Блог о нас",
    description:
      "Если вы любите природу, активный отдых и хотите стать частью дружного сообщества, присоединяйтесь к нам! Подписывайтесь на наш блог, делитесь своими историями и впечатлениями, и вместе мы сделаем каждый поход незабываемым!Следите за нашими обновлениями и готовьтесь к новым приключениям!",
  };

  return (
    <section className="main-container">
      <SectionTitle
        title={newsAbout.title}
        description={newsAbout.description}
      />
      <div className={styles.NewsGrid}>
        {news.map((el: any) => (
          <NewsCard
            key={el.id}
            text={el.excerpt}
            title={el.title}
            date={el.date}
            image={el.image}
            slug={el.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
