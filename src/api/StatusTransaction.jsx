import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api"; 

export const updateTransactionStatus = async (formCustomId, statusFormCustomId) => {
  try {
    const response = await axios.put(`${API_URL}/transactions/${formCustomId}`, {
      statusForm_custom_id: statusFormCustomId
    });
    return response.data;
  } catch (error) {
    console.error('Error updating transaction status:', error);
    throw error;
  }
};
