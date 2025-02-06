import PageBanner from "@/components/PageBunner/PageBunner";
import { wordpressUrl } from "../globalUrl";
import NewsCard from "@/components/NewsCard/NewsCard";
import styles from "./blog.module.css";
import { notFound } from "next/navigation"; // Добавьте импорт
async function getData() {
  const res = await fetch(`${wordpressUrl}/posts`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }

  return res.json();
}

const BlogPage = async () => {
  const data = await getData();
  console.log(data);
  return (
    <main>
      <PageBanner title={"Новости"} />
      <section className={"main-container"}>
        <div className={styles.NewsList}>
          {data.map((el: any) => (
            <NewsCard
              title={el.title.rendered}
              text={el.excerpt.rendered}
              image={el.featured_image}
              date={el.date_gmt}
              slug={el.slug}
              key={el.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default BlogPage;
