import React, { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import RegistrationModal from "../RegistrationModal/RegistrationModal.jsx";
import { LoginModal } from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  handleRequest,
} from "../../utils/api.js";

function App() {
  // Weather state
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  // Modal and card states
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  // Temperature unit state
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  // Clothing items state
  const [clothingItems, setClothingItems] = useState([]);
  // For header display
  const [userName, setUserName] = useState("Terrence T");

  // Current user & login state
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Stubbed functions for now (to be implemented)
  const handleSignupUser = (values) => {
    console.log("handleSignupUser called with:", values);
  };

  const handleLoginUser = (values) => {
    console.log("handleLoginUser called with:", values);
  };

  const setIsPasswordValid = (isValid) => {
    console.log("setIsPasswordValid:", isValid);
  };

  // Handlers for modals and card actions
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add new item:", err);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const handleRegistrationClick = () => {
    setActiveModal("registration");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("editprofile");
  };

  const handleSetClothingItems = () => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  };

  const handleSetWeather = () => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleDeleteCard = () => {
    const cardId = selectedCard._id;
    deleteItem(cardId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardId)
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("User is not authenticated.");
      return;
    }
    if (!currentUser) {
      console.log("No current user data available.");
      return;
    }
    if (!isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? { ...item, likes: [...item.likes, currentUser._id] }
                : item
            )
          );
        })
        .catch((err) => console.log("Error adding like:", err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? {
                    ...item,
                    likes: item.likes.filter(
                      (likeId) => likeId !== currentUser._id
                    ),
                  }
                : item
            )
          );
        })
        .catch((err) => console.log("Error removing like:", err));
    }
  };

  const handleLoginResponseInfo = () => {
    setIsLoggedIn(true);
    updateContext();
  };

  const updateUserInfo = (values) => {
    let storedUserData = JSON.parse(localStorage.getItem("userData"));
    storedUserData.userName = values.name;
    storedUserData.userAvatar = values.urlText;
    localStorage.setItem("userData", JSON.stringify(storedUserData));
  };

  const updateContext = () => {
    const token = localStorage.getItem("jwt");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (token && storedUserData) {
      setIsLoggedIn(true);
      setCurrentUser(storedUserData);
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") {
      setCurrentTemperatureUnit("F");
    } else if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    }
  };

  // Fetch weather data on mount
  useEffect(() => {
    handleSetWeather();
  }, []);

  // Fetch clothing items on mount
  useEffect(() => {
    handleSetClothingItems();
  }, []);

  // On initial load, update context from local storage
  useEffect(() => {
    updateContext();
  }, []);

  const handleUpdateProfileInfo = (values) => {
    return fetch("/api/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(new Error("Failed to update profile"));
      }
      return res.json();
    });
  };

  // ProtectedRoute component for restricting access
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    onCardLike={handleCardLike}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      onLogout={handleLogout}
                      onEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      userName={userName}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onSubmit={handleAddItemSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDeleteItem={handleDeleteItem}
          />
          <DeleteModal
            onCloseClick={closeActiveModal}
            isOpened={activeModal === "delete" ? "modal_opened" : ""}
            onDeleteCard={handleDeleteCard}
          />
          <RegistrationModal
            onSignUpUser={handleSignupUser}
            onCloseClick={closeActiveModal}
            isOpened={activeModal === "registration" ? "modal_opened" : ""}
            onLoginClick={handleLoginClick}
            onLoginUser={handleLoginUser}
            onLoginResponseInfo={handleLoginResponseInfo}
            onIsPasswordValid={setIsPasswordValid}
          />

          <EditProfileModal
            onCloseClick={closeActiveModal}
            isOpened={activeModal === "editprofile" ? "modal_opened" : ""}
            onUpdateProfileInfo={handleUpdateProfileInfo}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
