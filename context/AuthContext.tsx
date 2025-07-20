"use client";

import { UserType } from "@/app/types";
import axiosInstance from "@/lib/axios";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

type AuthContextType = {
  currentUser: UserType | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserType | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserType>();

  async function fetch() {
    const response = await axiosInstance<UserType>("/auth/me", {
      withCredentials: true,
    });
    setCurrentUser(response.data);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
