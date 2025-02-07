import ContactUs from "@/components/ContactUs/ContactUs";
import { wordpressUrlWC } from "../globalUrl";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import PageBanner from "@/components/PageBunner/PageBunner";
import { notFound } from "next/navigation"; // Добавьте импорт

import HikesCatalog from "@/customPages/HikesCatalog/HikesCatalog";
const API_URL = `${wordpressUrlWC}/products?per_page=9`;

async function getProducts() {
  const oauth = new OAuth({
    consumer: {
      key: "ck_8a9dfb1d0caeec90ca8a649017d42fc437956ac0",
      secret: "cs_de302e3f4a9a31a84363d289ed2dbd824a71b558",
    },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return crypto
        .createHmac("sha1", key)
        .update(base_string)
        .digest("base64");
    },
  });

  const request_data = {
    url: API_URL,
    method: "GET",
  };

  const authHeader = oauth.toHeader(oauth.authorize(request_data));

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: authHeader.Authorization,
    },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
  }

  const products = await res.json();
  const totalPages = res.headers.get("X-WP-TotalPages");

  return { products, totalPages };
}
const HikesPage = async () => {
  const { products, totalPages } = await getProducts();

  return (
    <main>
      <PageBanner title="Походы" />
      <HikesCatalog data={products} pagination={totalPages} />
      <section className={`main-container`}>
        <ContactUs />
      </section>
    </main>
  );
};

export default HikesPage;
