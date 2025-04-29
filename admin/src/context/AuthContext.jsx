import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getCurrentUser, logout } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        if (isAuthenticated()) {
          const user = getCurrentUser();
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Authentication check error:', err);
        setError('Authentication error. Please login again.');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  const updateUserContext = (updatedUserData) => {
    setCurrentUser(updatedUserData);
  };

  const value = {
    currentUser,
    loading,
    error,
    setCurrentUser,
    setError,
    updateUserContext,
    logout: handleLogout,
    isAuthenticated: () => isAuthenticated(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
