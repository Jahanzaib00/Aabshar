// src/api.js

const API_URL = 'https://a1d4-58-27-202-36.ngrok-free.app';

export const signup = async (username, email) => {
  try {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email}),
    });

    if (!response.ok) {
      throw new Error('Failed to sign up');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const login = async email => {
  try {
    const response = await fetch(`${API_URL}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });

    if (!response.ok) {
      throw new Error('Failed to sign in');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
