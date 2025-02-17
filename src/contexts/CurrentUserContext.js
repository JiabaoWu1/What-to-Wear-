import React from "react";

const CurrentUserContext = React.createContext({
  currentUser: null, // Add currentUser to the context
  isPasswordValid: true, // Default value for isPasswordValid
  setCurrentUser: () => {}, // Placeholder function
  setIsPasswordValid: () => {},
});

export default CurrentUserContext;
