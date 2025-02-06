"use client";

import NewsCard from "../NewsCard/NewsCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./NewsSection.module.css";

const NewsSection: React.FC<any> = ({ news }) => {
  return (
    <section className="main-container">
      <SectionTitle />
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
