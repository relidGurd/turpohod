import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import ContactsPage from "@/customPages/ContactsPage/ContactsPage";
import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(
    `https://cms.pohod-spb.ru/wp-json/wp/v2/pages?slug=kontakty`,
    {
      next: { revalidate: 100 },
    }
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return notFound();
  }

  return res.json();
}

const Contacts = async () => {
  const data = await getData();

  return (
    <main>
      <ContactsPage data={data[0]} />
    </main>
  );
};

export default Contacts;
