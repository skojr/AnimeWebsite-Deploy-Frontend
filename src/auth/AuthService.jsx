import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SPRING_BOOT_API_URL = import.meta.env.VITE_API_URL;

if (!SPRING_BOOT_API_URL) {
  throw new Error("VITE_API_URL is not defined in your environment variables.");
}

/* Utility Functions */
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
  }
  S;
};

export const logout = () => {
  localStorage.clear();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/* Posts Management */
export const createPost = async (postData) => {
  try {
    const response = await axios.post(
      `${SPRING_BOOT_API_URL}/posts/new-post`,
      postData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(`${SPRING_BOOT_API_URL}/posts/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get post:", error);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(
      `${SPRING_BOOT_API_URL}/posts/get-all-posts`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get posts:", error);
  }
};

export const getMyPosts = async () => {
  try {
    const response = await axios.get(
      `${SPRING_BOOT_API_URL}/posts/get-my-posts`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to get posts:", error);
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(
      `${SPRING_BOOT_API_URL}/posts/${id}`,
      postData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update post:", error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${SPRING_BOOT_API_URL}/posts/${id}`, {
      headers: getAuthHeaders(),
      data: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update post:", error);
  }
};
/* User Management */
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
    const response = await axios.post(
      `${SPRING_BOOT_API_URL}/auth/login`,
      user
    );
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

export const getUser = async () => {
  try {
    const response = await axios.get(`${SPRING_BOOT_API_URL}/users/me`, {
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
    const response = await axios.delete(`${SPRING_BOOT_API_URL}/users/me`, {
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
    const response = await axios.put(
      `${SPRING_BOOT_API_URL}/users/me`,
      updatedData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};
