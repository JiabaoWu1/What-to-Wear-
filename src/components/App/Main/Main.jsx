import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../../utils/constants";
import "../Main/Main.css";
import { useContext, useMemo } from "react";
import { CurrentTemperatureUnitContext } from "../../../contexts/CurrentTemperatureUnitContext";
function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temperature?.[currentTemperatureUnit];
  const weatherType = useMemo(() => {
    if (
      (temp >= 70 && currentTemperatureUnit === "F") ||
      (temp >= 21.11 && currentTemperatureUnit === "C")
    ) {
      return "hot";
    } else if (
      (temp >= 60 && currentTemperatureUnit === "F") ||
      (temp >= 15.56 && currentTemperatureUnit === "C")
    ) {
      return "warm";
    } else if (
      (temp <= 45 && currentTemperatureUnit === "F") ||
      (temp <= 7.22 && currentTemperatureUnit === "C")
    ) {
      return "cold";
    }
  }, [weatherData]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather === weatherType;
  });

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temp?.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
