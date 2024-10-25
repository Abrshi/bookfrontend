import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user as null or an empty object
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  
  const login = (username) => {
    setUser({ username });
  };
  const addrole = (role) => {
    setRole({ role });
  };
  const addid = (id) => {
    setId({ id });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,id,role,addrole,addid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
