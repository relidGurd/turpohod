import InstructorCard from "@/components/InstructorCard/InstructorCard";
import { wordpressCustom } from "../globalUrl";
import ContactUs from "@/components/ContactUs/ContactUs";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import PageBanner from "@/components/PageBunner/PageBunner";
import { notFound } from "next/navigation";
import { Breadcrumb } from "antd";
import Link from "next/link";
import PaginationInstructors from "@/components/Pagination/PaginationInstructors";
async function getData() {
  const res = await fetch(`${wordpressCustom}/instructors?per_page=4`, {
    next: { revalidate: 100 },
  });
  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }

  const totalPages = res.headers.get("X-WP-TotalPages");
  const instructors = await res.json();
  return { instructors, totalPages };
}

const Instructors = async () => {
  const { instructors, selectedProducts }: any = await getData();

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
        {instructors.instructors.map((el: any) => (
          <InstructorCard
            key={el.id}
            title={el.title}
            hike_type={el.hike_type}
            featured_image={el.featured_image}
            description={el.description}
            slug={el.slug}
          />
        ))}
        <PaginationInstructors instructors_pages={instructors.total_pages} />
      </section>
      <section className="main-container">
        <ContactUs />
      </section>
      <UpcomingHikes hikes={instructors.selected_products} />
    </main>
  );
};

export default Instructors;
