export function validateName(name) {
  let nameValidation = { isValid: true, message: "" };
  if (typeof name !== "string" || name.length < 2) {
    nameValidation.isValid = false;
    nameValidation.message =
      "Name must be a string with at least 2 characters.";
  }
  return nameValidation;
}

export function validateEmail(email) {
  let emailValidation = { isValid: true, message: "" };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailValidation.isValid = false;
    emailValidation.message = "Email must be in a valid email format.";
  }
  return emailValidation;
}

export function validatePassword(password) {
  let passwordValidation = { isValid: true, message: "" };
  if (typeof password !== "string" || password.length < 2) {
    passwordValidation.isValid = false;
    passwordValidation.message =
      "Password must be a string with at least 2 characters.";
  }

  return passwordValidation;
}

export function validateUrl(urlText) {
  let urlValidation = { isValid: true, message: "" };

  try {
    new URL(urlText);
  } catch (error) {
    urlValidation.isValid = false;
    urlValidation.message = "Input text must be a valid URL.";
  }

  return urlValidation;
}

export function validateWeather(weatherType) {
  let weatherValidation = {
    isValid: false,
    message: "Weather type must be selected.",
  };
  if (
    weatherType === "hot" ||
    weatherType === "warm" ||
    weatherType === "cold"
  ) {
    weatherValidation.isValid = true;
    weatherValidation.message = "";
  }

  return weatherValidation;
}
