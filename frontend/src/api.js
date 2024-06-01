// src/api.js
import axios from 'axios';

const API_URL = 'https://a1d4-58-27-202-36.ngrok-free.app';

export const signup = async (username, email) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      username,
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const login = async email => {
  try {
    const response = await axios.post(`${API_URL}/user/signin`, {email});
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getWaterIntake = async userId => {
  const response = await axios.get(`${API_URL}/intake/getIntake`, {
    params: {
      user_id: userId,
    },
  });
  console.log('getWaterIntake', response.data);
  return response.data;
};

export const logWaterIntake = async (userId, amount) => {
  const response = await axios.post(`${API_URL}/intake/logIntake`, {
    user_id: userId,
    amount: amount,
  });
  console.log('logWaterIntake', response.data);
  return response.data;
};

export const getGoal = async userId => {
  const response = await axios.get(`${API_URL}/goal/getGoal`, {
    params: {
      user_id: userId,
    },
  });
  console.log(response.data);
  return response.data;
};

export const setGoalApi = async (userId, goal) => {
  const response = await axios.post(`${API_URL}/goal/setGoal`, {
    userId: userId,
    goal: goal,
  });
  return response.data;
};

export const getTodaysLogs = async userId => {
  const response = await axios.get(`${API_URL}/intake/getLogs`, {
    params: {user_id: userId},
  });
  return response.data;
};

export const deleteLog = async logId => {
  console.log(logId);
  const response = await axios.delete(`${API_URL}/intake/deleteLog`, {
    params: {logId: logId},
  });
  return response.data;
};

export const updateLog = async (logId, newAmount) => {
  try {
    const response = await axios.put(`${API_URL}/intake/updateLog`, {
      logId,
      newAmount,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};

export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/intake/getIntakeHistory`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
};
