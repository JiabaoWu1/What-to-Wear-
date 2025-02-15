import { baseUrl, attemptGainResponse } from "../utils/api.js";

export function signup(item) {
  return fetch(`${baseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => attemptGainResponse(res))
    .catch((error) => {
      // Handle network or unexpected errors
      console.error("Signup error:", error);
      throw error;
    });
}

// Signin function with proper endpoint
export function signin(item) {
  return fetch(`${baseUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => attemptGainResponse(res))
    .catch((error) => {
      // Handle network or unexpected errors
      console.error("Signin error:", error);
      throw error;
    });
}
