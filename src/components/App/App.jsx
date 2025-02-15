import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ItemModal from "./ItemModal/ItemModal";
import Footer from "./Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import {
  getItems,
  addItem,
  deleteItem,
  handleRequest,
} from "../../utils/api.js";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import RegistrationModal from "../RegistrationModal/RegistrationModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

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
  const [userName, setUserName] = useState("Terrence T");

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
    setUserData(null);
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
        handleUpdateDOM(!updateDOM);
      })
      .catch(console.error);
  };

  const handleCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    const { userData } = useContext(CurrentUserContext);
    if (!token) {
      console.log("User is not authenticated.");
      return;
    }
    if (!isLiked) {
      addCardLike(id, token)
        .then(() => {
          console.log(userData.userId);
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? { ...item, likes: [...item.likes, userData.userId] }
                : item
            )
          );
        })
        .catch((err) => console.log("Error adding like:", err));
    } else {
      removeCardLike(id, token)
        .then(() => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? {
                    ...item,
                    likes: item.likes.filter((id) => id !== userData.userId),
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
    let userData = JSON.parse(localStorage.getItem("userData"));
    userData.userName = values.name;
    userData.userAvatar = values.urlText;
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const updateContext = () => {
    const token = localStorage.getItem("jwt");
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (token && storedUserData) {
      setIsLoggedIn(true);
      setUserData(storedUserData);
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  console.log(currentTemperatureUnit);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
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
  useEffect(() => {
    handleSetClothingItems();
    handleSetWeather();
    updateContext();
    handleUpdateDOM(!updateDOM);
  }, []);

  useEffect(() => {
    handleUpdateDOM(!updateDOM);
  }, [weatherData]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
          isOpened={activeModal === "delete" && "modal_opened"}
          onDeleteCard={handleDeleteCard}
        />
        <RegistrationModal
          onSignUpUser={handleSignupUser}
          onCloseClick={closeActiveModal}
          isOpened={activeModal === "registration" && "modal_opened"}
          onLoginClick={handleLoginClick}
          onLoginUser={handleLoginUser}
          onLoginResponseInfo={handleLoginResponseInfo}
          onIsPasswordValid={setIsPasswordValid}
        />
        <LoginModal
          onCloseClick={closeActiveModal}
          onLoginUser={handleLoginUser}
          isOpened={activeModal === "login" && "modal_opened"}
          onRegistrationClick={handleRegistrationClick}
          onLoginResponseInfo={handleLoginResponseInfo}
          onIsPasswordValid={setIsPasswordValid}
        />
        <EditProfileModal
          onCloseClick={closeActiveModal}
          isOpened={activeModal === "editprofile" && "modal_opened"}
          onUpdateProfileInfo={handleUpdateProfileInfo}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
