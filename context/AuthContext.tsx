"use client";

import { UserType } from "@/app/types";
import axiosInstance, { setAxiosAuthToken } from "@/lib/axios";
import { setAccessTokenSetter } from "@/lib/tokenManager";
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
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  currentUser: UserType | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserType | undefined>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, _setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserType>();

  async function fetch() {
    const response = await axiosInstance<UserType>("/auth/me");
    setCurrentUser(response.data);
  }

  useEffect(() => {
    fetch();
  }, [accessToken]);

  const setAccessToken = (token: string | null) => {
    _setAccessToken(token);
    setAxiosAuthToken(token);
  };

  useEffect(() => {
    setAccessTokenSetter(setAccessToken); // Register the setter
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, currentUser, setCurrentUser }}
    >
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
