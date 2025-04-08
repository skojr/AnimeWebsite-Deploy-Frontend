import axios from "axios";

const api = axios.create();

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Implement your token refresh logic here
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/refresh-token', { refreshToken });
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // Redirect to login page
        window.location = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
