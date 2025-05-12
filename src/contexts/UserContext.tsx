import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  recoveryStartDate: Date;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    // This would normally call an API
    // For demo purposes, simulate successful login with mock data
    const mockUser: User = {
      id: '123456',
      firstName: 'Alex',
      lastName: 'Johnson',
      email: email,
      recoveryStartDate: new Date(2023, 2, 15) // March 15, 2023
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const register = async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    // This would normally call an API
    // For demo purposes, simulate successful registration with mock data
    const mockUser: User = {
      id: '123456',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      recoveryStartDate: new Date() // Today
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  
  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};