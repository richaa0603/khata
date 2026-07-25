import axios from "axios";

const API_URL = "http://localhost:5228/api/shopkeepers";

export const getShopkeepers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};