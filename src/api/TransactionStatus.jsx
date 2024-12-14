import axios from "axios";

export const fetchTransactionData = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/transactions");
  return response.data.data || [];
};

export const fetchStatusOptions = async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/status-form");
  return response.data?.data || [];
};
