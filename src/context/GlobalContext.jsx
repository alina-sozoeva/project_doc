import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const IndexedDBProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState([]);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
