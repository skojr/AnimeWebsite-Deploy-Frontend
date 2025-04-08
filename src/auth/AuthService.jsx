import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Axios instance with base configuration
export const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Enables sending/receiving cookies
});

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}


// Intercept responses to handle expired sessions globally
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please log in again.");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

// User Login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post(
      "api/users/auth/authenticate",
      { email, password },
      { withCredentials: true } // Important to include cookies in the request
    );

    console.log("Login response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};


export const register = async (email, password) => {
  try {
    const response = await apiClient.post(
      "api/users/auth/register",
      { email, password },
      { withCredentials: true } // Include cookies
    );

    console.log("Registration successful:", response.data);
    console.log("Yayyyy")

    // The user is already authenticated; tokens are in cookies
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    console.log("Nayyy");
    throw new Error(
      error.response?.data?.message || "Failed to register user"
    );
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
    await apiClient.post("api/users/auth/logout", null, {
      withCredentials: true, // To send cookies
    });

    toast.info("Logged out successfully.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  } catch (error) {
    console.error("Logout error:", error.message);
    toast.error("An error occurred during logout.");
  }
};



// Get Current User
export const getUser = async () => {
  try {
    const response = await apiClient.get(`api/users/getUser`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Get user error:", error.response || error.message);
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    throw new Error("Failed to fetch user data");
  }
};

export const updateUser = async (updateData) => {
  try {
    const csrfToken = getCookie("csrfToken");

    const response = await apiClient.put(
      `api/users/updateUser`,
      updateData,
      {
        withCredentials: true,
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Update user error:", error.response || error.message);
    throw new Error("Failed to update user");
  }
};


// Delete User Account
export const deleteUser = async (password) => {
  try {
    const csrfToken = getCookie("csrfToken");

    const response = await apiClient.delete(`api/users/deleteUser`, {
      data: { password },
      withCredentials: true,
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Delete user error:", error.response || error.message);
    throw new Error("Failed to delete user");
  }
};




export const fetchSurveyData = async (genreId) => {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity`);
    const data = response.data.data;
    return data; // Return top 5
  };