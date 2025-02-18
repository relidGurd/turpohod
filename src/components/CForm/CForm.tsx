import { useFormik } from "formik";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";
import styles from "./CForm.module.css";
import CloseIcon from "@/icons/CloseIcon";
// Схема валидации
const validationSchema = Yup.object({
  name: Yup.string().required("Введите ваше имя"),
  phoneNumber: Yup.string().required("Введите ваш телефон"),
});

const CForm = () => {
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

  return (
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

        {/* <div className={styles.formInputItem}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.formInput}
            placeholder="example@mail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.errorInput}>{formik.errors.email}</div>
          ) : null}
        </div> */}

        <div className={styles.formInputItem}>
          <label htmlFor="phoneNumber">Телефон</label>
          <IMaskInput
            id="phoneNumber"
            name="phoneNumber"
            mask={"+7 000-000-00-00"}
            unmask={true}
            value={formik.values.phoneNumber}
            onAccept={(value) => formik.setFieldValue("phoneNumber", value)}
            onBlur={() => formik.setFieldTouched("phoneNumber", true)} // Добавляем onBlur
            className={styles.formInput}
            placeholder="+7 ___-___-__-__"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className={styles.errorInput}>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>

        <button type="submit" className={`small-button ${styles.formButton}`}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default CForm;
