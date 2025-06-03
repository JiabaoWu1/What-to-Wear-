import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  getCurrentUser,
  login,
  register,
  updateProfile,
} from "../../utils/api";
// import ClothesSection from "./ClothesSection";
import ProtectedRoute from "../ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegistrationModal/RegistrationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Profile modal
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  // Auth modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Weather fetch
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Items fetch
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Failed to get items:", error);
      });
  }, []);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          setCurrentUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  // Handlers for modals
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true); // Open login modal instead of alert
      return;
    }
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => setActiveModal("");
  const closeEditProfileModal = () => setShowEditProfileModal(false);

  // Auth modal handlers
  const handleLoginClick = () => setShowLoginModal(true);
  const handleRegistrationClick = () => setShowRegisterModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const closeRegisterModal = () => setShowRegisterModal(false);

  // Add item
  const handleAddItemSubmit = (item) => {
      console.log("Submitting new item:", item);
    addItem(item)
      .then((newItem) => {
        console.log("Backend returned:", newItem); // Add this line
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add new item:", err);
      });
  };

  // Delete item
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

  // Like/unlike
  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    const isLiked = item.likes.includes(currentUser._id);

    const likePromise = isLiked
      ? removeCardLike(item._id, token)
      : addCardLike(item._id, token);

    likePromise
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((ci) => (ci._id === item._id ? updatedCard : ci))
        );
      })
      .catch((err) => console.log(err));
  };

  // Edit profile
  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeEditProfileModal();
      })
      .catch(console.error);
  };

  // Login/Register Handlers
  const handleLogin = ({ email, password }) => {
    return login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getCurrentUser(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeLoginModal();
      })
      .catch((err) => {
        alert("Login failed. Please check your credentials.");
        throw err;
      });
  };

  const handleRegister = ({ email, password, name, avatar }) => {
  return register(name, avatar, email, password) // <-- FIXED
    .then(() => {
      closeRegisterModal();
      setShowLoginModal(true);
    })
    .catch((err) => {
      alert("Registration failed. Please check your input.");
      throw err;
    });
};

  // Toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "C" ? "F" : "C"));
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout}
              handleLoginClick={handleLoginClick}
              handleRegistrationClick={handleRegistrationClick}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser?._id
                      )}
                      userName={currentUser?.name}
                      onEditProfile={() => setShowEditProfileModal(true)}
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
          <EditProfileModal
            isOpen={showEditProfileModal}
            onClose={closeEditProfileModal}
            onEdit={handleEditProfile}
          />
          {/* ----------- Add these: ----------- */}
          <LoginModal
            isLoginOpen={showLoginModal}
            closeActiveModal={closeLoginModal}
            onLogin={handleLogin}
            handleRegisterClick={() => {
              closeLoginModal();
              setShowRegisterModal(true);
            }}
          />
          <RegisterModal
            isRegisterOpen={showRegisterModal}
            closeActiveModal={closeRegisterModal}
            onRegistration={handleRegister}
            handleLoginClick={() => {
              closeRegisterModal();
              setShowLoginModal(true);
            }}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
