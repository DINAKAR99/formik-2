import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikControl from "./FormikControl";
function FormikContainer() {
  const dropDown = [
    { key: "Selection an option", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const radioOptions = [
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const checkboxOptions = [
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const initialValues = {
    email: "",
    desc: "",
    selectedOption: "",
    radioOption: "",
    checkboxOption: [],
    birthDate: null,
  };
  const validationSchema = yup.object({
    email: yup.string().required("Required!"),
    desc: yup.string().required("Required!"),
    selectedOption: yup.string().required("Required"),
    radioOption: yup.string().required("Required"),
    checkboxOption: yup.array().required("Required!"),
    birthDate: yup.date().required("Required!").nullable(),
  });
  const onSubmit = (values) => console.log("Form data", values);

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
              control="input"
              type="email"
              name="email"
              label="Email"
            />
            <FormikControl control="textarea" name="desc" label="Description" />
            <FormikControl
              control="select"
              name="selectOption"
              options={dropDown}
              label="Select  a topic"
            />

            <FormikControl
              control="radio"
              name="radioOption"
              options={radioOptions}
              label="radio buttons"
            />
            <FormikControl
              control="checkbox"
              label="Checkbox topic"
              name="Checkbox option"
              options={checkboxOptions}
            />
            <FormikControl control="date" label="DatePicker" name="birthDate" />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
