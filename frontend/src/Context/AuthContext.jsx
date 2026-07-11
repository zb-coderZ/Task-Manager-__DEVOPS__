import { useState } from 'react';
import { AuthContext } from './AuthContext';
import API from '../Services/api';
import { setToken, removeToken } from '../utils/token';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Register User
  const register = async (userData) => {
    const response = await API.post('/auth/register', userData);

    return response.data;
  };

  // Login User
  const login = async (userData) => {
    const response = await API.post('/auth/login', userData);

    const token = response.data.token;

    setToken(token);

    return response.data;
  };

  // Logout User
  const logout = () => {
    removeToken();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
