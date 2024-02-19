import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";

function TextArea(props) {
  const { name, label, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" name={name} id={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default TextArea;
