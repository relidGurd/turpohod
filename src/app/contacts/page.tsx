import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import ContactsPage from "@/customPages/ContactsPage/ContactsPage";
import { notFound } from "next/navigation";

async function getData() {
  try {
    const res = await fetch(
      `https://cms.pohod-spb.ru/wp-json/wp/v2/pages?slug=kontakty`,
      { next: { revalidate: 100 } }
    );

    if (!res.ok) {
      return notFound(); // Если сервер вернул ошибку (например, 404), показываем страницу 404
    }

    const data = await res.json();
    if (!data.length) {
      return notFound(); // Если массив пустой, тоже показываем 404
    }

    return data[0]; // Возвращаем первый элемент
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
    return notFound(); // Если произошла сетевая ошибка, показываем 404
  }
}

const Contacts = async () => {
  const data = await getData();

  return (
    <main>
      <ContactsPage data={data} />
    </main>
  );
};

export default Contacts;
