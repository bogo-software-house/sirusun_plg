import axios from "axios";

export const fetchTransactionData = async () => {
  const response = await axios.get("https://api.sirusun.com/api/transactions");
  return response.data.data || [];
};

export const fetchStatusOptions = async () => {
  const response = await axios.get("https://api.sirusun.com/api/status-form");
  return response.data?.data || [];
};
