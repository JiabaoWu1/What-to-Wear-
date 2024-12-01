import React from "react";
const CurrentTempratureUnitContext = React.createContext({
  CurrentTempUnit: "",
  handleToggleSwitchChange: () => {},
});

export { CurrentTempratureUnitContext };
