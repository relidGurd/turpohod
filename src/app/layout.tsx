import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./reset.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import PreloaderC from "@/components/Preloader/Preloader";

const manrope = Manrope({
  subsets: ["cyrillic"],
  weight: ["700", "300", "500"],
});

export const metadata: Metadata = {
  title: "Походная компания",
  description: "Мы проводим походы по России",
};

async function getData() {
  const res = await fetch(`http://turpohod.local/wp-json/wp/v2/menus`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return alert("error");
  }

  return res.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getData();

  return (
    <html className={manrope.className} lang="ru">
      <body>
        <Suspense fallback={<PreloaderC />}>
          <Header menu={data[0].menu_items} socials={data[0].customFields} />
          {children}
          <Footer menu={data[0].menu_items} socials={data[0].customFields} />
        </Suspense>
      </body>
    </html>
  );
}
