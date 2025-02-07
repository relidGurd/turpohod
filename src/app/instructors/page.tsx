import InstructorCard from "@/components/InstructorCard/InstructorCard";
import { wordpressCustom, wordpressUrl } from "../globalUrl";
import styles from "./instructors.module.css";
import Image from "next/image";
import ContactUs from "@/components/ContactUs/ContactUs";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import PageBanner from "@/components/PageBunner/PageBunner";
async function getData() {
  const res = await fetch(`${wordpressCustom}/instructors`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return alert("error");
  }

  return res.json();
}

const InstructorsPage = async () => {
  const data = await getData();
  return (
    <main>
      <PageBanner title={"Инструкторы"} />
      <section className="main-container">
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
