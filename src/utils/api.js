const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const handleRequest = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    headers,
  }).then(handleRequest);
};
export async function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      return responseCheck(res);
    })
    .catch((error) => {
      console.error(error);
      return {
        link: AvatarImage,
        message: "Network error or invalid URL, using fallback image.",
      };
    });
}

const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  }).then(handleRequest);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  }).then(handleRequest);
};

export async function handleLoginUser(userData) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      return responseCheck(res);
    })
    .then((data) => {
      console.log("Login successful");

      if (data.token) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("userData", JSON.stringify(data.userInfo));
      } else {
        console.error("No token received in response.");
        return Promise.reject(new Error("No token received."));
      }
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${error.message}`);
    });
}

export async function handleSignupUser(userData) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      return responseCheck(res);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${error.message}`);
    });
}

export async function handleUpdateProfile(userData) {
  const token = localStorage.getItem("jwt");

  fetch(`${baseUrl}/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      return responseCheck(res);
    })
    .then(() => {
      console.log("Updated profile successfully.");
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${error.message}`);
    });
}
export async function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return responseCheck(res);
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${error.message}`);
    });
}

export function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return responseCheck(res);
    })
    .catch((error) => {
      console.error(error);
      return Promise.reject(`Error: ${error.message}`);
    });
}

export { getItems, addItem, deleteItem, handleRequest };
