// src/authContext.js
import React, {createContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{userId, setUserId}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
