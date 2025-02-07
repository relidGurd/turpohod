import InstructorCard from "@/components/InstructorCard/InstructorCard";
import { wordpressCustom } from "../globalUrl";
import ContactUs from "@/components/ContactUs/ContactUs";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import PageBanner from "@/components/PageBunner/PageBunner";
import { notFound } from "next/navigation";
import { Breadcrumb } from "antd";
import Link from "next/link";
async function getData() {
  const res = await fetch(`${wordpressCustom}/instructors`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }
  return res.json();
}

const InstructorsPage = async () => {
  const data = await getData();

  const items = [
    {
      title: <Link href="/">На главную</Link>,
    },
    {
      title: "Инструкторы",
    },
  ];

  return (
    <main>
      <PageBanner title={"Инструкторы"} />
      <section className="main-container">
        <Breadcrumb style={{ margin: "1rem" }} items={items} />
        {data.instructors.map((el: any) => (
          <InstructorCard
            key={el.id}
            title={el.title}
            hike_type={el.hike_type}
            featured_image={el.featured_image}
            description={el.description}
          />
        ))}
      </section>
      <section className="main-container">
        <ContactUs />
      </section>
      <UpcomingHikes hikes={data.selected_products} />
    </main>
  );
};

export default InstructorsPage;
