import axios from "axios";
const apiUrl = "http://localhost:5000/restaurant";

export const getRestaurants = async () => {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getRestaurant = async (RestaurantId) => {
  try {
    const response = await axios.get(`${apiUrl}/${RestaurantId}`);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getMyRestaurants = async () => {
  const token = axios.defaults.headers.common["x-auth-token"];  
  if (!token) {
    return Promise.reject('No authentication token found');
  }

  try {
    const response = await axios.get(`${apiUrl}/my-Restaurants`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteRestaurant = async (RestaurantId) => {
  try {
    const token = localStorage.getItem("my token");
    const { data } = await axios.delete(`${apiUrl}/${RestaurantId}`, {
      headers: {
        "x-auth-token": token  
      }
    });
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};



export const createRestaurant = async (Restaurant) => {
  try {
    const token = localStorage.getItem("my token"); 

    const { data } = await axios.post(
      `${apiUrl}`,
      Restaurant,
      {
        headers: {
          "x-auth-token": token  
        }
      }
    );
    return data;
  } catch (error) {
    
    console.error("Error creating Restaurant:", error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);  
      console.error("Error response status:", error.response.status); 
      console.error("Error response headers:", error.response.headers);  
    } else if (error.request) {
      console.error("No response received:", error.request);  
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const editRestaurant = async (RestaurantId, normalaizedRestaurant) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${RestaurantId}`, normalaizedRestaurant);
    return data;
  } catch (error) {
    console.error("Error making request:", error.message); 
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {

      console.error("No response received for the request:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error.message);
  }
};

export const changeLikeStatus = async (RestaurantId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/${RestaurantId}`);
    return data;  
  } catch (error) {
    return Promise.reject(error.message);
  }
};
