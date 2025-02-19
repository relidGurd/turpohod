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
      <Breadcrumb className={styles.newsPageBreadcrumbs} items={items} />
      <h1 className={`main-title ${styles.newsPageTitle}`}>
        {post.title.rendered}
      </h1>
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
        {/* <div className={styles.productSection}>
          <div className={styles.newsProd}>
            {post.selected_products[0] ? (
              <Link href={`/hike-detail/${post.selected_products[0].slug}`}>
                <ProductCard
                  image={post.selected_products[0].image}
                  title={post.selected_products[0].title}
                  price={post.selected_products[0].price}
                  dates={post.selected_products[0].hike_dates}
                  place={post.selected_products[0].hike_address}
                  hikePath={post.selected_products[0].hike_path}
                />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div> */}
      </div>
      <ContactUs />
    </div>
  );
};

export default NewsPage;
