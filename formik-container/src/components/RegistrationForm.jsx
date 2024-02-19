import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import FormikControl from "./FormikControl";
function RegistrationForm() {
  const options = [
    { key: "Email", value: "emailmod" },
    { key: "Telephone", value: "telephonemod" },
  ];
  const initialValues = {
    email: "",
    password: "",
    conPassword: "",
    contact: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("InValid Format").required("Required"),
    password: Yup.string().required("Required"),
    conPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    contact: Yup.string().required("Required"),
    phone: Yup.string().when("contact", {
      is: (value) => {
        return value === "telephonemod";
      },
      then: () =>
        Yup.string().required("Phone is required when contact is telephonemod"),
      otherwise: () => Yup.string(),
    }),
  });
  const onSubmit = (values) => {
    console.log("Data", values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log("Validation Schema:", validationSchema);
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              name="email"
              label="Email"
            />
            <FormikControl
              control="input"
              type="password"
              name="password"
              label="password"
            />
            <FormikControl
              control="input"
              type="password"
              name="conPassword"
              label="Confirm password"
            />
            <FormikControl
              control="radio"
              name="contact"
              label="Mode of Contact"
              options={options}
            />
            <FormikControl control="input" name="phone" label="Phone Number" />
            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegistrationForm;
