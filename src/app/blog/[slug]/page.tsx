import { wordpressUrl } from "@/app/globalUrl";
import NewsPage from "@/customPages/NewsPage/NewsPage";

const fetchPostBySlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const response = await fetch(`${wordpressUrl}/posts?slug=${slug}`);

  if (!response.ok) {
    throw new Error("Ошибка при запросе к WordPress");
  }

  const posts = await response.json();

  if (posts.length === 0) {
    throw new Error(`Запись с slug "${slug}" не найдена`);
  }

  return posts[0]; // возвращаем первый пост, если он найден
};

const ArticleSinglePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  try {
    // Дожидаемся получения данных

    const data = await fetchPostBySlug({ params });

    return (
      <main className="main-container padding-top-content">
        {/* Передаем данные в компонент NewsPage */}
        <NewsPage post={data} />
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <main className="main-container padding-top-content">
        <p>Ошибка загрузки записи</p>
      </main>
    );
  }
};

export default ArticleSinglePage;
