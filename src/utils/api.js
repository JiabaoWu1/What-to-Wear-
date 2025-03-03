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
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  })
    .then(handleRequest)
    .catch((error) => {
      console.error("Error adding item:", error);
      return Promise.reject(error);
    });
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
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

function handleUpdateProfile(userData) {
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

export {
  getItems,
  addItem,
  deleteItem,
  handleRequest,
  addCardLike,
  removeCardLike,
  handleUpdateProfile,
};
