import ContactUs from "@/components/ContactUs/ContactUs";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import ProductPage from "@/customPages/ProductPage/ProductPage";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { wordpressCustom, wordpressUrl, wordpressUrlWC } from "@/app/globalUrl";
import { notFound } from "next/navigation";
import InstructorCard from "@/components/InstructorCard/InstructorCard";
import { Breadcrumb } from "antd";
import Link from "next/link";

const CONSUMER_KEY = "ck_8a9dfb1d0caeec90ca8a649017d42fc437956ac0";
const CONSUMER_SECRET = "cs_de302e3f4a9a31a84363d289ed2dbd824a71b558";

async function getProductBySlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const API_URL = `${wordpressCustom}/instructors/${slug}`;

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
  const instructor = await res.json();

  // const instructor = instructors.find((p: any) => p.slug === slug);

  if (!instructor) {
    throw new Error(`Инструктор с slug "${slug}" не найден`);
  }

  return instructor;
}

export default async function HikesSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const instructor = await getProductBySlug({ params });

  console.log(instructor);

  return (
    <main className="padding-top-content ">
      <section className="main-container">
        <Breadcrumb
          style={{ margin: "1rem 0" }}
          items={[
            { title: <Link href="/">На главную</Link> },
            { title: <Link href="/instructors">Инструкторы</Link> },
            { title: instructor.title },
          ]}
        />
        <InstructorCard
          title={instructor.title}
          hike_type={instructor.hike_type}
          featured_image={instructor.featured_image}
          description={instructor.description}
          slug={instructor.slug}
        />
      </section>
      <section className="main-container">
        <ContactUs />
      </section>
    </main>
  );
}
