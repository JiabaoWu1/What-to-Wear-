import { useState } from "react";

export function useFormAndValidation(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    // Validation
    const form = event.target.closest("form");
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid(form.checkValidity());
  };

  const resetForm = () => {
    setValues(inputValues);
    setErrors({});
    setIsValid(false);
  };

  return { values, handleChange, setValues, errors, isValid, resetForm };
}
