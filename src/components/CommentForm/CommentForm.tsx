import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./CommentForm.module.css";
import { wordpressUrlWC, basicUrl } from "@/app/globalUrl";

const API_URL = `https://cms.pohod-spb.ru/wp-json/wc/v3/products/reviews?consumer_key=ck_8cc97116a2e001d4a8c361f0b659389a868f3339&consumer_secret=cs_e8f900c35a383b4e0f4810c48220fc0678452c60`;

// Валидация формы
const validationSchema = Yup.object({
  name: Yup.string().required("Введите ваше имя"),
  email: Yup.string()
    .email("Введите корректный email")
    .required("Введите email"),
  review: Yup.string()
    .matches(/^[^<>]+$/, "Запрещено использовать теги HTML")
    .required("Введите отзыв")
    .min(10, "Отзыв должен быть не менее 10 символов"),
});

const CommentForm: React.FC<any> = ({ productId }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      review: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setMessage("");

      const reviewData = {
        product_id: productId, // ID товара
        reviewer: values.name, // Имя автора
        reviewer_email: values.email, // Email автора
        review: values.review, // Текст отзыва
        status: "hold", // Статус комментария
      };

      try {
        await axios.post(API_URL, reviewData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setMessage("Отзыв успешно отправлен!");
        resetForm(); // Очистка формы
      } catch (error: any) {
        setMessage("Ошибка при отправке отзыва.");
        console.error("Ошибка:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={styles.formBlock}>
      <h2 className={styles.formTitle}>Оставьте отзыв о товаре</h2>
      <form onSubmit={formik.handleSubmit} className={styles.myForm}>
        {/* Поле Имя */}
        <div className={styles.formInputItem}>
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            name="name"
            type="text"
            className={styles.formInput}
            placeholder="Ваше имя"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={styles.errorInput}>{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Поле Email */}
        <div className={styles.formInputItem}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.formInput}
            placeholder="Ваш email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errorInput}>{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Поле Отзыв */}
        <div className={styles.formInputItem}>
          <label htmlFor="review">Отзыв</label>
          <textarea
            id="review"
            name="review"
            className={styles.formTextarea}
            placeholder="Напишите ваш отзыв"
            value={formik.values.review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.review && formik.errors.review ? (
            <div className={styles.errorInput}>{formik.errors.review}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className={`small-button ${styles.formButton}`}
          disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </button>

        {message && <p className={styles.responseMessage}>{message}</p>}
      </form>
    </div>
  );
};

export default CommentForm;
