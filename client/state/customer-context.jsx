import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";

const defaultState = {
  userData: {},
};
const UserContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  let userData = null;

  const contextValues = {
    // Memoize values in an ideal case to avoid re-rendering.
    userData,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined || context === null) {
    throw new Error(`useUserContext must be called within UserProvider`);
  }
  return context;
};
