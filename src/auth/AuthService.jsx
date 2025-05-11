import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SPRING_BOOT_API_URL = import.meta.env.VITE_API_URL;

if (!SPRING_BOOT_API_URL) {
  throw new Error("VITE_API_URL is not defined in your environment variables.");
}

export const register = async (user) => {
  try {
    await axios.post(`${SPRING_BOOT_API_URL}/auth/register`, user);
    return await login(user);
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${SPRING_BOOT_API_URL}/auth/login`, user);
    const data = response.data;
    const token = data.token;
    if (token) {
      localStorage.setItem("token", token);
      console.log("JWT Token stored successfully.");
    } else {
      console.warn("No token received during login.");
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // ✅ Properly propagate error
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp, sub } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }S
};

export const logout = () => {
  localStorage.clear();
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${SPRING_BOOT_API_URL}/me`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
  
};
export const deleteUser = async (password) => {
  try {
    const response = await axios.delete(`${SPRING_BOOT_API_URL}/me`, {
      headers: getAuthHeaders(),
      data: { password },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};


export const updateUser = async (updatedData) => {
  try {
    const response = await axios.put(`${SPRING_BOOT_API_URL}/me`, updatedData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

