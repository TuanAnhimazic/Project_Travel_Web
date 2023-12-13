
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';



  type UserData = {
    id?: number;
    name?: string;
    fullName?: string;
    email?: string;
    address?: string;
    phoneNumber?: string;
    birthday?: string;
    gender?: string;
    avatar?: string;
    description?: string;
    jobName?: string;
    bgImage?: string;

  };

  type AuthContextType = {
    user: UserData | null ; 
    login: (userData: UserData) => void;
    logout: () => void;
    updateProfile: (updatedUser: UserData) => void;
    
  };

  type AuthProviderProps = {
    children: ReactNode; 
  };

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//cung cấp giá trị cho context
export function AuthProvider({ children }:AuthProviderProps) {
    const [user, setUser] = useState<UserData | null>(null);

// cập nhật trạng thái đăng nhập user sau fresh
    useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {

        setUser(JSON.parse(storedUserData));
      }
      else{
        console.log("chưa đăng nhập");
      }
    }, []);
//
  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  };
//
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userData');
  
  };
//
  const updateProfile = (updatedUser: UserData) => {
    localStorage.removeItem('userData');
    setUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
  };
//
  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// export và sử dụng context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
