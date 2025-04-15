"use client";

import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../config";

interface AuthContextType {
  user: string | null;
  username: string;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullname: string,
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  // Fetch user from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (!isNaN(expiryTime) && Date.now() < expiryTime) {
        setUser(token);

        const timeout = setTimeout(() => {
          logout();
          toast.error("Session expired. Please login again.");
        }, expiryTime - Date.now());

        return () => clearTimeout(timeout);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        setUser(null);
      }
    }
  }, []);

  // Fetch username using token
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const response = await axios.get(`${BASE_URL}/auth/usernamebytoken`, {
            headers: {
              Authorization: `Bearer ${user}`,
            },
          });

          const usernameFromResponse = response.data?.data?.username;

          if (usernameFromResponse) {
            setUsername(usernameFromResponse);
          } else {
            throw new Error("Username not found in response");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
          toast.error("Failed to fetch user info");
        }
      }
    };

    fetchUsername();
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data?.data?.token;
      if (!token) throw new Error("Token missing in response");

      const expiry = Date.now() + 60 * 60 * 1000;

      localStorage.setItem("token", token);
      localStorage.setItem("expiry", expiry.toString());

      setUser(token);
      toast.success("Login Successful");

      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login Failed");
    }
  };

  const register = async (
    fullname: string,
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        name: fullname,
        email,
        username,
        password,
      });

      const token = response.data?.data?.token;
      if (!token) throw new Error("Token missing in response");

      const expiry = Date.now() + 60 * 60 * 1000;

      localStorage.setItem("token", token);
      localStorage.setItem("expiry", expiry.toString());

      setUser(token);
      toast.success("Registration Successful");

      setTimeout(() => {
        router.push("/dashboard");
      }, 10);
    } catch (error) {
      console.error("Register Error:", error);
      toast.error("Registration Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    setUser(null);
    setUsername("");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
