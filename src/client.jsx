import axios from "axios";

export const getTopAnime = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/top-anime/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch top anime:", error);
    return null;
  }
};
