import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import "./WeatherCard.css";
import { useContext } from "react";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {" "}
        {weatherData?.temp?.[currentTemperatureUnit]} &deg;
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.day ? "day" : "night"} time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
