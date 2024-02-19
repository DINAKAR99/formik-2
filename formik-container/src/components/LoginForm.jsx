import { Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import FormikControl from "./FormikControl";
function LoginForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid format").required("Required"),
    password: yup.string().required(" !Required"),
  });
  const onSubmit = (values) => {
    console.log("Form data", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="chakraInput"
              type="email"
              name="email"
              label="Email"
            />
            <FormikControl
              control="chakraInput"
              type="password"
              name="password"
              label="Password"
            />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
