import { useContext, useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: null,
  userEmail: '',
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  const login = (receivedToken, receivedEmail, userId) => {
    setToken(receivedToken);
    setUserEmail(receivedEmail);
    setUserId(userId);
    localStorage.setItem('token', receivedToken);
    localStorage.setItem('email', receivedEmail);
    localStorage.setItem('userId', userId);
  };
  const logout = () => {
    setToken(null);
    setUserEmail(null);
    setUserId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
  };

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
    userEmail,
    userId,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthCtx = () => {
  return useContext(AuthContext);
};
