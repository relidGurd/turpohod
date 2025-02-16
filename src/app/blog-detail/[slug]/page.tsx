import { wordpressUrl } from "@/app/globalUrl";
import NewsPage from "@/customPages/NewsPage/NewsPage";
import { notFound } from "next/navigation"; // Добавьте импорт
const fetchPostBySlug = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  const response = await fetch(`${wordpressUrl}/posts?slug=${slug}`);

  if (!response.ok) {
    notFound(); // Перенаправляет на 404
  }

  const posts = await response.json();

  if (posts.length === 0) {
    throw new Error(`Запись с slug "${slug}" не найдена`);
  }

  return posts[0]; // возвращаем первый пост, если он найден
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const data = await fetchPostBySlug({ params });

    return {
      title: data.title.rendered,
      description: data.excerpt.rendered.replace(/<[^>]+>/g, ""), // Убираем HTML из описания
    };
  } catch (error) {
    return {
      title: "Статья не найдена",
      description: "Запрошенная статья не найдена.",
    };
  }
}

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
