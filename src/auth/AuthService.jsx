import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// User Login
export const login = async (email, password) => {
  try {
    // Ensure no old token is sent
    const response = await axios.post(baseUrl + "/users/auth/authenticate", {
      email,
      password,
    });
    console.log("Login response:", response.data);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }
    // localStorage.setItem("userId:", response.data.id)
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    await axios.post(baseUrl + "/users/auth/register", { email, password });
    login(email, password);
  } catch (error) {
    console.error("Full error object:", error);
    if (error.response) {
      throw new Error(
        error.response.data.message || `Error: ${error.response.status}`
      );
    } else if (error.request) {
      throw new Error("No response received from server");
    } else {
      throw new Error("Error setting up the request");
    }
  }
};

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const response = await apiClient.get("api/users/auth/check");

    // You can shape this however you want, but let's assume:
    // { loggedIn: true, username, userId, role }
    return response.data;
  } catch (error) {
    console.error("Auth check failed:", error.response?.data || error.message);
    return { loggedIn: false };
  }
};

// User Logout
export const logout = async () => {
  try {
    localStorage.clear();
    // localStorage.removeItem("userId");
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.reload();
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    console.log(jwtDecode(token));
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const deleteUser = async (password) => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  if (!token || !decodedToken) {
    throw new Error("User not authenticated");
  }

  const userId = decodedToken.userId; // Make sure this matches the property name in your token

  try {
    const response = await axios.delete(`${baseUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: { password }, // Send password in the request body
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Delete user error:", error.response || error);
    throw new Error(
      error.response?.data || error.message || "Failed to delete user"
    );
  }
};

export const updateUser = async (updateData) => {
  const decodedToken = getCurrentUser();
  const originalToken = localStorage.getItem("token");

  if (!decodedToken || !originalToken) {
    throw new Error("User not authenticated");
  }

  const userId = decodedToken.userId; // Make sure this matches the property name in your token

  try {
    const response = await axios.put(`${baseUrl}/users/${userId}`, updateData, {
      headers: {
        Authorization: `Bearer ${originalToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      throw new Error(error.response.data.message || "Failed to update user");
    } else if (error.request) {
      console.error("No response received from server:", error.request);
      throw new Error("No response received from server");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error in setting up the request");
    }
  }
};

const map = {
  Short: 12,
  Medium: 13,
  Long: 25,
};

export const fetchSurveyData = async (genreId, lengthCategory) => {
  const response = await axios.get(
    `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity`
  );
  const data = response.data.data;
  // const filteredByLength = response.data.data.filter(anime => {
  //   switch(lengthCategory) {
  //     case 'short':
  //       return anime.episodes > 0 && anime.episodes <= 12;
  //     case 'medium':
  //       return anime.episodes > 12 && anime.episodes <= 24;
  //     case 'long':
  //       return anime.episodes > 24;
  //     default:
  //       return true;
  //   }
  // });

  return data; // Return top 5
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};
