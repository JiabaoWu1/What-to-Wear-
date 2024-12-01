import React, { useContext } from "react";
import "./ToggleSwitch.css";
import { useState } from "react";
import { CurrentTempUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  // const [currentTempUnit, handleToggleSwitchChange] = useState("C");
  // const handleChange = (e) => {
  //   if (currentTempUnit === "C") {
  //     handleToggleSwitchChange("F");
  //   } else {
  //     handleToggleSwitchChange("C");
  //   }
  // };

  const { currentTempUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );
  return (
    <label htmlFor="" className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
