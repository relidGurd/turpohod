import PageBanner from "@/components/PageBunner/PageBunner";
import { wordpressUrl } from "../globalUrl";
import NewsCard from "@/components/NewsCard/NewsCard";
import styles from "./blog.module.css";
import { notFound } from "next/navigation"; // Добавьте импорт
import PaginationHukes from "@/components/Pagination/PaginationHukes";
import PaginationPosts from "@/components/Pagination/PaginationPosts";
import Link from "next/link";
import { Breadcrumb } from "antd";
async function getData() {
  const res = await fetch(`${wordpressUrl}/posts?per_page=10`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }

  const posts = await res.json();

  const totalPages = res.headers.get("X-WP-TotalPages");

  return { posts, totalPages };
}

const BlogPage = async () => {
  const { posts, totalPages } = await getData();

  const items = [
    {
      title: <Link href="/">На главную</Link>,
    },
    {
      title: "Новости",
    },
  ];

  return (
    <main>
      <PageBanner title={"Новости"} />
      <section className={"main-container"}>
        <Breadcrumb style={{ marginBottom: "2rem" }} items={items} />
        <div className={styles.NewsList}>
          {posts.map((el: any) => (
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
        <PaginationPosts hikes_pages={totalPages} />
      </section>
    </main>
  );
};

export default BlogPage;
