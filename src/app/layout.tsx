import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import "./reset.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";
import PreloaderC from "@/components/Preloader/Preloader";
import { notFound } from "next/navigation";
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
  try {
    const res = await fetch(`http://cms.pohod-spb.ru/wp-json/wp/v2/menus`, {
      next: { revalidate: 100 },
    });

    if (!res.ok) {
      console.error(`Ошибка загрузки меню: ${res.status}`);
      return notFound();
    }

    const data = await res.json();
    if (!data.length) {
      console.error("Меню не найдено!");
      return notFound();
    }

    return data[0]; // Берем первый элемент массива
  } catch (error) {
    console.error("Ошибка загрузки меню:", error);
    return notFound();
  }
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
          <Header
            menu={data?.menu_items || []}
            socials={data?.customFields || {}}
          />
          {children}
          <StickyButton socials={data?.customFields || {}} />
          <Footer
            menu={data?.menu_items || []}
            socials={data?.customFields || {}}
          />
        </Suspense>
      </body>
    </html>
  );
}
