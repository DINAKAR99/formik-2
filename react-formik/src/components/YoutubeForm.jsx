import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNum: ["", ""],
  phNumbers: [""],
};
const savedValues = {
  name: "Sharmila",
  email: "Sharmi202@gmail.com",
  channel: "sharmila",
  comments: " Doing good",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNum: ["", ""],
  phNumbers: [""],
};
const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "Not a valid format";
  }
  if (!values.channel) {
    errors.channel = "Required";
  }
  return errors;
};
const validationSchema = yup.object({
  name: yup.string().required("Required!"),
  email: yup.string().email("Invalid format").required("Required"),
  channel: yup.string().required("Required"),
});
const validateComments = (values) => {
  let error;
  if (!values) error = "Required";
  return error;
};
function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnChange={false}
      // validateOnBlur={false}
      validateOnMount
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
              />
              <ErrorMessage name="name">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field type="text" id="channel" name="channel" />
              <ErrorMessage name="channel" component={TextError} />
            </div>
            <div className="form-control">
              <label>Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {/* Render props */}
                {(props) => {
                  console.log("Filed rendered");
                  const { field, form, meta } = props;

                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>
            <div className="form-control">
              <label htmlFor="facebbok">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>
            <div className="form-control">
              <label htmlFor="primary">Primary</label>
              <Field type="text" id="primary" name="phoneNum[0]" />
            </div>
            <div className="form-control">
              <label htmlFor="alt">Primary</label>
              <Field type="text" id="alt" name="phoneNum[1]" />
            </div>
            <div className="form-control">
              <label htmlFor="">List of number</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div className="form-control">
                      {phNumbers.map((phNumbers, index) => {
                        return (
                          <div key={index} className="form-control">
                            <Field name={`phNumber[${index}]`} />
                            {index != 0 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                            <button type="button" onClick={() => push(index)}>
                              +
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Comments validate
            </button>
            <button type="button" onClick={formik.validateForm}>
              validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Set comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Set touched all
            </button> */}
            <button type="button" onClick={() => setFormValues(savedValues)}>
              load save data
            </button>
            {/* <button type="reset">Reset</button> */}
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
