import { createContext, useContext, useState } from "react";

const PropertyRefreshContext = createContext();

export function PropertyRefreshProvider({ children }) {
  const [refreshAvailableProperties, setRefreshAvailableProperties] = useState(false);

  return (
    <PropertyRefreshContext.Provider
      value={{ refreshAvailableProperties, setRefreshAvailableProperties }}
    >
      {children}
    </PropertyRefreshContext.Provider>
  );
}

export const usePropertyRefresh = () => useContext(PropertyRefreshContext);
