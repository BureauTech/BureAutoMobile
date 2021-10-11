import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const [user, setUser] = useContext(AuthContext);
  return [user, setUser];
};

export default AuthContext;
