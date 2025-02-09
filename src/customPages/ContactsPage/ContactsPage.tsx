"use client";
import UpcomingHikes from "@/components/UpcomingHikes/UpcomingHikes";
import styles from "./ContactsPage.module.css";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";
import { Breadcrumb } from "antd";
import Link from "next/link";

// Схема валидации
const validationSchema = Yup.object({
  name: Yup.string().required("Введите ваше имя"),
  phoneNumber: Yup.string().required("Введите ваш телефон"),
});

const ContactsPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
    },
    validationSchema, // Передаем схему валидации
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const items = [
    {
      title: <Link href="/">На главную</Link>,
    },
    {
      title: "Контакты",
    },
  ];
  return (
    <section className="main-container">
      <Breadcrumb className={styles.bread} items={items} />
      <div>
        <div>
          <h1 className={styles.contactsTitle}>Свяжитесь с нами</h1>
          <p className={styles.contactsDescription}>
            Мы всегда рады вашим вопросам и предложениям! На этой странице вы
            найдете всю необходимую информацию для связи с нашей компанией.
          </p>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formBlock}>
            <h2 className={styles.formTitle}>
              Остались вопросы? Вам нужно только написать!
            </h2>
            <p className={styles.formText}>
              Мы свяжемся с Вами и проконсультируем по походам!
            </p>
            <form onSubmit={formik.handleSubmit} className={styles.myForm}>
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

              <div className={styles.formInputItem}>
                <label htmlFor="phoneNumber">Телефон</label>
                <IMaskInput
                  id="phoneNumber"
                  name="phoneNumber"
                  mask={"+7 000-000-00-00"}
                  unmask={true}
                  value={formik.values.phoneNumber}
                  onAccept={(value) =>
                    formik.setFieldValue("phoneNumber", value)
                  }
                  onBlur={() => formik.setFieldTouched("phoneNumber", true)} // Добавляем onBlur
                  className={styles.formInput}
                  placeholder="+7 ___-___-__-__"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className={styles.errorInput}>
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className={`small-button ${styles.formButton}`}>
                Отправить
              </button>
            </form>
          </div>
          <div>
            <div className={styles.banerContainer}>
              <Image
                src={"/slide.png"}
                width={600}
                alt="baner"
                className={styles.banerImage}
                height={600}
              />
            </div>
            <div className={styles.contactsPageLinks}>
              <div className={styles.contactItem}>
                <div className={styles.contactIkonContainer}>
                  <Image
                    src={"/road.svg"}
                    width={600}
                    alt="baner"
                    className={styles.banerImage}
                    height={600}
                  />
                </div>
                <div className={styles.linksTextContainer}>
                  <div className={styles.linkTitle}>Email</div>
                  <div className={styles.linkUrl}>example@mail.com</div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsPage;
