import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./CommentForm.module.css";
import { basicUrl } from "@/app/globalUrl";
import OAuth from "oauth-1.0a";
import crypto from "crypto";

const CONSUMER_KEY = "ck_8a9dfb1d0caeec90ca8a649017d42fc437956ac0";
const CONSUMER_SECRET = "cs_de302e3f4a9a31a84363d289ed2dbd824a71b558";

// Схема валидации
const validationSchema = Yup.object({
  name: Yup.string().required("Введите ваше имя"),
  phoneNumber: Yup.string().required("Введите ваш телефон"),
  review: Yup.string()
    .required("Введите отзыв") // Теперь пустое поле тоже выдаст ошибку
    .min(10, "Отзыв должен быть не менее 10 символов"),
});

const CommentForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      review: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const sendReview = async () => {
    const reviewData = {
      product_id: 91, // ID товара
      review: "Отличный товар, рекомендую!",
      rating: 5, // Оценка от 1 до 5
      reviewer: "Иван Иванов", // Имя пользователя
      reviewer_email: "ivan@example.com", // Email пользователя
    };

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

    const request_data = {
      url: `${basicUrl}wp-json/wc/v3/products/reviews`,
      method: "POST",
      data: reviewData, // Нужно передавать в `authorize()`
    };

    const authHeader = oauth.toHeader(oauth.authorize(request_data));

    try {
      const res = await fetch(request_data.url, {
        method: "POST",
        headers: {
          Authorization: authHeader.Authorization,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reviewData), // Отправляем данные
      });

      if (!res.ok) {
        throw new Error(`Ошибка запроса: ${res.status} ${res.statusText}`);
      }

      const responseData = await res.json();
      console.log("Отзыв успешно отправлен:", responseData);
      return responseData;
    } catch (error) {
      console.error("Ошибка при отправке отзыва:", error);
      throw error;
    }
  };

  return (
    <div className={styles.formBlock}>
      <h2 className={styles.formTitle}>
        Остались вопросы? Вам нужно только написать!
      </h2>
      <p className={styles.formText}>
        Мы свяжемся с Вами и проконсультируем по походам!
      </p>
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

        {/* Поле Отзыв (TextArea) */}
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
          onClick={sendReview}
          type="submit"
          className={`small-button ${styles.formButton}`}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
