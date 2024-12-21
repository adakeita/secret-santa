import axios from "axios";

const JSONBIN_BASE_URL = import.meta.env.VITE_JSONBIN_BASE_URL;
const BIN_ID = import.meta.env.VITE_BIN_ID;
const API_KEY = import.meta.env.VITE_API_KEY;
console.log("JSONBIN_BASE_URL:", import.meta.env.VITE_JSONBIN_BASE_URL);
console.log("BIN_ID:", import.meta.env.VITE_BIN_ID);
console.log("API_KEY:", import.meta.env.VITE_API_KEY);

// Fetch data (assignments and preferences)
export const fetchData = async () => {
  try {
    const response = await axios.get(`${JSONBIN_BASE_URL}/${BIN_ID}`, {
      headers: { "X-Access-Key": API_KEY },
    });
    return response.data.record;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { assignments: {}, preferences: {} };
  }
};

// Save updated data back
export const saveData = async (data) => {
  try {
    await axios.put(`${JSONBIN_BASE_URL}/${BIN_ID}`, data, {
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": API_KEY,
      },
    });
  } catch (error) {
    console.error("Error saving data:", error);
  }
};
