// src/services/transactionService.js

import axios from "axios";

const API_URL = "http://yourapiurl.com/api"; // آدرس API خود را وارد کنید

const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(
      `${API_URL}/transactions`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

const updateTransaction = async (id, transactionData) => {
  try {
    const response = await axios.put(
      `${API_URL}/transactions/${id}`,
      transactionData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/transactions/${id}`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

export {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
