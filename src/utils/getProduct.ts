import OAuth from "oauth-1.0a";
import crypto from "crypto";
import { wordpressUrlWC } from "@/app/globalUrl";
const API_URL = `${wordpressUrlWC}/products`;

export async function getProducts(
  hike_date_start?: string,
  hike_date_end?: string
) {
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

  let url = new URL(API_URL);

  if (hike_date_start && hike_date_end) {
    url.searchParams.append("hike_date_start", hike_date_start);
    url.searchParams.append("hike_date_end", hike_date_end);
  }

  const request_data = {
    url: url.toString(),
    method: "GET",
  };

  const authHeader = oauth.toHeader(oauth.authorize(request_data));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: authHeader.Authorization,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Ошибка запроса:", errorText);
    throw new Error(`Ошибка WooCommerce: ${res.status} - ${errorText}`);
  }

  return res.json();
}
