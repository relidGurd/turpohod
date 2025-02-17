import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./reset.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import PreloaderC from "@/components/Preloader/Preloader";
import { notFound } from "next/navigation"; // Добавьте импорт
import "@ant-design/v5-patch-for-react-19";
import StickyButton from "@/components/StickyButton/StickyButton";

const manrope = Manrope({
  subsets: ["cyrillic"],
  weight: ["700", "300", "500"],
});

export const metadata: Metadata = {
  title: "Походная компания",
  description: "Мы проводим походы по России",
};

async function getData() {
  const res = await fetch(`http://cms.pohod-spb.ru/wp-json/wp/v2/menus`, {
    next: { revalidate: 100 },
  });

  if (!res.ok) {
    notFound(); // Перенаправляет на 404
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
          <StickyButton />
          <Footer menu={data[0].menu_items} socials={data[0].customFields} />
        </Suspense>
      </body>
    </html>
  );
}
