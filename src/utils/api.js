const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error fetching items:", error);
      return Promise.reject(error);
    });
};

const addItem = (item) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error adding item:", error);
      return Promise.reject(error);
    });
};


const deleteItem = (id) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error deleting item:", error);
      return Promise.reject(error);
    });
};


function addCardLike(id) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("No token found.");
    return Promise.reject("No token available.");
  }

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error adding like:", error);
      return Promise.reject(error);
    });
}

function removeCardLike(id) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("No token found.");
    return Promise.reject("No token available.");
  }

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error removing like:", error);
      return Promise.reject(error);
    });
}

function updateProfile(userData) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.error("No token found.");
    return Promise.reject("No token available.");
  }

  return fetch(`${baseUrl}/profile`, {
    method: "PATCH",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then(handleRequest)
    .then(() => {
      console.log("Updated profile successfully.");
    })
    .catch((error) => {
      console.error("Profile update error:", error);
      return Promise.reject(error);
    });
}

function getCurrentUser() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    console.error("No token found.");
    return Promise.reject("No token available.");
  }

  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error fetching current user:", error);
      return Promise.reject(error);
    });
}

function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Login error:", error);
      return Promise.reject(error);
    });
}

function register(name, avatar, email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Register error:", error);
      return Promise.reject(error);
    });
}


export {
  getItems,
  addItem,
  deleteItem,
  handleRequest,
  addCardLike,
  removeCardLike,
  updateProfile,
  getCurrentUser,
  login,
  register
};
