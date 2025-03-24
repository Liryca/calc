import { API_BASE_URL } from "../constants/endpoints";

export const fetchData = async (nameData) => {
  try {
    const response = await fetch(`${API_BASE_URL}${nameData}.json`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error loading data:", error);
  }
};
