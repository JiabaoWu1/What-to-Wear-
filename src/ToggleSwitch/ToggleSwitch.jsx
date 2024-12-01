import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTempUnit, handleToggleSwitchChange] = useState("C");
  const handleChange = (e) => {
    if (currentTempUnit === "C") {
      handleToggleSwitchChange("F");
    } else {
      handleToggleSwitchChange("C");
    }
  };

  return (
    <label htmlFor="" className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p>F</p>
      <p>C</p>
    </label>
  );
};

export default ToggleSwitch;
