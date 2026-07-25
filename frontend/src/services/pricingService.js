import axios from "axios";

const API_URL = "http://localhost:5228/api/pricing";

export const getBuyerPricing = async (
  buyerId
) => {
  const response = await axios.get(
    `${API_URL}/buyer/${buyerId}/all-products`
  );

  return response.data;
};

export const savePricing = async (
  buyerId,
  productId,
  price
) => {
  return axios.post(API_URL, {
    buyerId,
    productId,
    price,
  });
};