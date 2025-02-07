import ContactUs from "@/components/ContactUs/ContactUs";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import ProductPage from "@/customPages/ProductPage/ProductPage";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { wordpressUrlWC } from "@/app/globalUrl";
import { notFound } from "next/navigation";

const CONSUMER_KEY = "ck_8a9dfb1d0caeec90ca8a649017d42fc437956ac0";
const CONSUMER_SECRET = "cs_de302e3f4a9a31a84363d289ed2dbd824a71b558";

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
        title={product.name}
        description={product.description}
        smallText={product.short_description}
        price={product.price}
        category={product.categories}
        images={product.images}
      />
      <section className="main-container">
        <ContactUs />
      </section>
      {/* <UpcomingHikes /> */}
    </main>
  );
}
