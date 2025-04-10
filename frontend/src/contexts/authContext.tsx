"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BASE_URL } from "../config";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // ⏳ Check token validity on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);

      if (!isNaN(expiryTime) && Date.now() < expiryTime) {
        setUser(token);

        // Set auto logout
        const timeout = setTimeout(() => {
          logout();
          toast.error("Session expired. Please login again.");
        }, expiryTime - Date.now());

        return () => clearTimeout(timeout);
      } else {
        // Token expired
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");
        setUser(null);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data.data.token;
      const expiry = Date.now() + 60 * 60 * 1000; // 1 hour

      localStorage.setItem("token", token);
      localStorage.setItem("expiry", expiry.toString());

      setUser(token);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login Failed");
      console.error("Error:", error);
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

      const token = response.data.data.token;
      const expiry = Date.now() + 60 * 60 * 1000; // 1 hour

      localStorage.setItem("token", token);
      localStorage.setItem("expiry", expiry.toString());

      setUser(token);
      toast.success("Registration Successful");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Registration Failed");
      console.error("Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
