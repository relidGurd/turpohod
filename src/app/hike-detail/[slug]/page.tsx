import ContactUs from "@/components/ContactUs/ContactUs";
import ProductPage from "@/customPages/ProductPage/ProductPage";
import { wordpressUrlWC } from "@/app/globalUrl";
import { notFound } from "next/navigation";

const CONSUMER_KEY = "ck_8cc97116a2e001d4a8c361f0b659389a868f3339";
const CONSUMER_SECRET = "cs_e8f900c35a383b4e0f4810c48220fc0678452c60";

async function getProductBySlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const API_URL = `${wordpressUrlWC}/products?slug=${slug}&consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;

  const res = await fetch(API_URL, { method: "GET" });

  if (!res.ok) {
    notFound(); // Перенаправляем на 404, если запрос не удался
  }

  const products = await res.json();

  if (!products.length) {
    notFound(); // Перенаправляем на 404, если товар не найден
  }

  return products[0]; // Возвращаем первый найденный товар
}

export default async function HikesSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await getProductBySlug({ params });

  return (
    <main className="padding-top-content">
      <ProductPage
        id={product.id}
        title={product.name}
        description={product.description}
        smallText={product.short_description}
        price={product.price}
        category={product.categories}
        images={product.images}
        ardess={product.hike_adress}
        tabGallery={product.hike_gallery}
        dates={product.hike_dates}
        instructorName={product.hike_instructor_name}
        instructorLink={product.hike_instructor_link}
        hikePath={product.hike_path}
      />
      <section className="main-container">
        <ContactUs />
      </section>
    </main>
  );
}
