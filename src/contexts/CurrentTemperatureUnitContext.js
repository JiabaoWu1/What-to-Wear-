import React from "react";
const CurrentTempUnitContext = React.createContext({
  CurrentTempUnit: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTempUnitContext };
