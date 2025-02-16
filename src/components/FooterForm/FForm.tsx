import { useFormik } from "formik";
import * as Yup from "yup";
import { IMaskInput } from "react-imask";
import styles from "./FForm.module.css";
// Схема валидации
const validationSchema = Yup.object({
  phoneNumber: Yup.string().required("Введите ваш телефон"),
});

const FForm = () => {
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validationSchema, // Передаем схему валидации
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.myForm}>
      <div className={styles.formInputItem}>
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

      <button type="submit" className={styles.fFormButton}>
        Отправить
      </button>
    </form>
  );
};

export default FForm;
