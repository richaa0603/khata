import axios from "axios";
const API_URL =
  `${import.meta.env.VITE_API_URL}/invoices`;
export const saveInvoice = async (
  invoice
) => {
  const response = await axios.post(
    API_URL,
    invoice
  );

  return response.data;
};

export const getInvoices = async () => {
  const response = await axios.get(
    API_URL
  );

  return response.data;
};

export const getBuyerInvoices =
  async (buyerId) => {

    const response =
      await axios.get(
        `${API_URL}/buyer/${buyerId}`
      );

    return response.data;
};

export const getShopkeeperInvoices =
  async (shopkeeperId) => {

    const response =
      await axios.get(
        `${API_URL}/shopkeeper/${shopkeeperId}`
      );

    return response.data;
};

export const downloadInvoicePdf =
  async (invoiceId) => {

    const response =
      await axios.get(
        `${API_URL}/${invoiceId}/pdf`,
        {
          responseType: "blob",
        }
      );

    return response.data;
};