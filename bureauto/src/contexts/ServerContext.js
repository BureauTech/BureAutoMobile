import React, { createContext, useState, useContext } from "react";

const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
  const [server, setServer] = useState("");

  return (
    <ServerContext.Provider value={[server, setServer]}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServer = () => {
  const [server, setServer] = useContext(ServerContext);
  return [server, setServer];
};

export default ServerContext;
