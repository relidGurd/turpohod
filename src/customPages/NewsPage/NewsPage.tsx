"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./NewsPage.module.css";
import ContactUs from "@/components/ContactUs/ContactUs";
import Image from "next/image";
import { Breadcrumb } from "antd";
import Link from "next/link";

const NewsPage: React.FC<any> = ({ post }) => {
  const items = [
    {
      title: <Link href="/">На главную</Link>,
    },
    {
      title: <Link href="/blog">Новости</Link>,
    },
    {
      title: post.title.rendered,
    },
  ];
  return (
    <div>
      <Breadcrumb style={{ marginBottom: "2rem" }} items={items} />
      <h1 className="main-title">{post.title.rendered}</h1>
      <div className={styles.newsPageContent}>
        <div className={styles.contentSection}>
          <div className={styles.postImageContainer}>
            <Image
              className={styles.postImage}
              src={post.featured_image ? post.featured_image : "/example.png"}
              width={500}
              height={500}
              alt=""
            />
          </div>
          <div className={styles.postContent}>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </div>
        </div>
        <div className={styles.productSection}>
          <div className={styles.newsProd}>
            <ProductCard />
          </div>
        </div>
      </div>
      <ContactUs />
    </div>
  );
};

export default NewsPage;
