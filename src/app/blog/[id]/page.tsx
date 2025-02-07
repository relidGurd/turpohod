import PageBanner from "@/components/PageBunner/PageBunner";
import { wordpressUrl } from "@/app/globalUrl";
import NewsCard from "@/components/NewsCard/NewsCard";
import styles from "./blog.module.css";
import { notFound } from "next/navigation"; // Добавьте импорт
import PaginationPosts from "@/components/Pagination/PaginationPosts";
async function getData({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;

  const res = await fetch(`${wordpressUrl}/posts?per_page=10&page=${id}`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }

  const posts = await res.json();

  const totalPages = res.headers.get("X-WP-TotalPages");

  return { posts, totalPages };
}

const BlogPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { posts, totalPages } = await getData({ params });
  console.log(totalPages);
  return (
    <main>
      <PageBanner title={"Новости"} />
      <section className={"main-container"}>
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
