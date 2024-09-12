import React, {createContext, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children, user, token}) => {
  return (
    <AuthContext.Provider value={{user, token}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
