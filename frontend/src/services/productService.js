import axios from "axios";
const API_URL =
  `${import.meta.env.VITE_API_URL}/products`;

export const getProducts = async () => {
  const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/pricing/buyer/${buyerId}/all-products`
);
  return response.data;
};