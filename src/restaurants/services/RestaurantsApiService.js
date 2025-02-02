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



export const createRestaurant = async (restaurant) => {
  try {
    const token = localStorage.getItem("my token"); 

    const { data } = await axios.post(
      `${apiUrl}`,
      restaurant,
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
export const reserveRestaurant = async (userId, restaurantId) => {
  try {
    const token = localStorage.getItem("my token"); // ✅ Get JWT token

    if (!token) {
      throw new Error("Authentication Error: Token is missing");
    }

    const response = await axios.post(
      `http://localhost:5000/users/${userId}/reserve`,  // ✅ Correct API path
      { restaurantId },
      {
        headers: {
          "x-auth-token": token, // ✅ Send authentication token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error reserving restaurant:", error.message);
    return Promise.reject(error.message);
  }
};



export const changeLikeStatus = async (restaurantId, userId) => {
  try {
    const token = localStorage.getItem("my token");

    if (!token) throw new Error("Authentication Error: Token is missing");

    console.log("🔵 Sending like request:", { restaurantId, userId });

    const { data } = await axios.patch(
      `http://localhost:5000/restaurant/${restaurantId}/like`,
      { userId }, // ✅ Send userId in request body
      {
        headers: { "x-auth-token": token },
      }
    );

    return data;
  } catch (error) {
    console.error("❌ Error changing like status:", error);
    return Promise.reject(error.message);
  }
};







export const cancelReservation = async (userId, restaurantId) => {
  try {
    const token = localStorage.getItem("my token"); // ✅ Get JWT token

    if (!token) {
      throw new Error("Authentication Error: Token is missing");
    }

    const response = await axios.delete(
      `http://localhost:5000/users/${userId}/reservations/${restaurantId}`,  // ✅ Correct DELETE API call
      {
        headers: {
          "x-auth-token": token, // ✅ Send authentication token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Error canceling reservation:", error.message);
    return Promise.reject(error.message);
  }
};
