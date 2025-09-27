import { useState, useEffect } from 'react';
import { User } from '../types';

const MOCK_CREDENTIALS = [
  {
    username: 'test',
    password: '1234'
  },
  {
    username: 'aishu',
    password: '7160'
  }
];

const SESSION_KEY = 'notes_app_session';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing session on app load
    const savedSession = localStorage.getItem(SESSION_KEY);
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse saved session:', error);
        localStorage.removeItem(SESSION_KEY);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const matchedUser = MOCK_CREDENTIALS.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (matchedUser) {
      const userData: User = {
        username: matchedUser.username,
        isAuthenticated: true
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
  };

  return {
    user,
    login,
    logout,
    isAuthenticated
  };
};