import React from "react";
import { Field } from "formik";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

function ChakraInput(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }) => {
        const hasError = form.errors?.[name] && form.touched?.[name];
        return (
          <FormControl isInvalid={hasError}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input id={name} {...rest} {...field} />
            <FormErrorMessage>
              {hasError ? form.errors[name] : null}
            </FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default ChakraInput;
