const TOKEN_KEY = "jwt";

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// remove JWT from local storage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
