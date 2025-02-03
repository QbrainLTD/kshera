import axios from "axios";


const apiUrl = "http://localhost:8181/users";

export const login = async (userLogin) => {
  try {
    const response = await axios.post(apiUrl + "/login", userLogin);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(apiUrl, normalizedUser);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getUserData = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/user`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const reserveRestaurant = async (userId, restaurantId) => {
  try {
    const token = localStorage.getItem("my token"); 
    const response = await axios.post(
      `${apiUrl}/${userId}/reserve`,  
      { restaurantId },
      {
        headers: {
          "x-auth-token": token,  
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error reserving restaurant:", error);
    throw error;
  }
};
