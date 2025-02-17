import ContactUs from "@/components/ContactUs/ContactUs";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import ProductPage from "@/customPages/ProductPage/ProductPage";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
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
  const API_URL = `${wordpressUrlWC}/products?slug=${slug}`;

  const oauth = new OAuth({
    consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
  });
  // Запрос всех товаров (WooCommerce не поддерживает slug напрямую)
  const request_data = {
    url: `${API_URL}`, // Запрашиваем 100 товаров (оптимально для малого каталога)
    method: "GET",
  };

  const authHeader = oauth.toHeader(oauth.authorize(request_data));

  const res = await fetch(request_data.url, {
    method: "GET",
    headers: {
      Authorization: authHeader.Authorization,
    },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }
  const products = await res.json();

  const product = products.find((p: any) => p.slug === slug);

  if (!product) {
    throw new Error(`Товар с slug "${slug}" не найден`);
  }

  return product;
}

export default async function HikesSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const product = await getProductBySlug({ params });

  return (
    <main className="padding-top-content ">
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
      {/* <UpcomingHikes /> */}
    </main>
  );
}
