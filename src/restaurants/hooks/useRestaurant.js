import ROUTES from "../../routes/routesModel";
import normalizeRestaurant from "../helpers/normalization/normalizeRestaurant"; 
import { useCurrentUser } from "../../users/providers/UserProvider";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import { useState, useCallback, useEffect } from "react";
import {
    getRestaurants,
    getRestaurant,
    getMyRestaurants,
    deleteRestaurant,
    createRestaurant,
    editRestaurant,
    changeLikeStatus,
    reserveRestaurant as reserveApiCall,
    cancelReservation  
   
} from "../services/RestaurantsApiService";
import { reserveRestaurant } from "../../users/services/usersApiService"
import axios from "axios";

export default function useRestaurant() {
    const [restaurants, setRestaurants] = useState([]); 
    const [restaurant, setRestaurant] = useState(); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); 
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]); 
    const [searchParams] = useSearchParams(); 
    const [reservations, setReservations] = useState([]);
    const { user, setUser } = useCurrentUser(); 
    const setSnack = useSnack(); 
    const navigate = useNavigate();
    useAxios();

    
    const fetchRestaurants = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getRestaurants();
            setRestaurants(data);
            setFilteredRestaurants(data); 
            setSnack("success", "Restaurants loaded successfully!");
        } catch (err) {
            setError(err.message || "Failed to fetch restaurants");
            setSnack("error", err.message || "Failed to load restaurants");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    
    const fetchMyRestaurants = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getMyRestaurants();
            setRestaurants(data);
            setFilteredRestaurants(data); 
            setSnack("success", "Your restaurants loaded successfully!");
        } catch (err) {
            setError(err.message || "Failed to fetch your restaurants");
            setSnack("error", err.message || "Failed to load your restaurants");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    
    const fetchRestaurantById = useCallback(async (id) => {
        setIsLoading(true);
        try {
            const data = await getRestaurant(id);
            setRestaurant(data);
            setSnack("success", `Restaurant ${data.name} loaded successfully!`);
        } catch (err) {
            setError(err.message || `Failed to fetch restaurant with ID ${id}`);
            setSnack("error", err.message || "Failed to load restaurant");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    
    const addRestaurant = useCallback(async (newRestaurant) => {
        setIsLoading(true);
        try {
            const normalizedRestaurant = normalizeRestaurant(newRestaurant);
            const data = await createRestaurant(normalizedRestaurant);
            setRestaurants((prev) => [...prev, data]);
            setSnack("success", "New restaurant created successfully!");
            navigate(ROUTES.ROOT); 
        } catch (err) {
            setError(err.message || "Failed to create restaurant");
            setSnack("error", err.message || "Failed to create restaurant");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack, navigate]);

    // Update a restaurant
    const updateRestaurant = useCallback(async (id, updatedData) => {
        setIsLoading(true);
        try {
            const normalizedRestaurant = normalizeRestaurant(updatedData);
            const data = await editRestaurant(id, normalizedRestaurant);
            setRestaurants((prev) =>
                prev.map((restaurant) =>
                    restaurant._id === id ? { ...restaurant, ...data } : restaurant
                )
            );
            setSnack("success", "Restaurant updated successfully!");
        } catch (err) {
            setError(err.message || "Failed to update restaurant");
            setSnack("error", err.message || "Failed to update restaurant");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    // Delete a restaurant
    const deleteRestaurantById = useCallback(async (id) => {
        setIsLoading(true);
        try {
            await deleteRestaurant(id);
            setRestaurants((prev) => prev.filter((restaurant) => restaurant._id !== id));
            setSnack("success", "Restaurant deleted successfully!");
        } catch (err) {
            setError(err.message || "Failed to delete restaurant");
            setSnack("error", err.message || "Failed to delete restaurant");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    const handleLike = useCallback(async (restaurantId) => {
        try {
            const updatedRestaurant = await changeLikeStatus(restaurantId, user._id); 

            setRestaurants((prev) =>
                prev.map((r) => (r._id === restaurantId ? updatedRestaurant : r))
            );

            
            setFavoriteRestaurants((prev) => {
                const isLiked = updatedRestaurant.likes.includes(user._id); 
                if (isLiked) {
                    return [...prev, updatedRestaurant]; 
                } else {
                    return prev.filter((r) => r._id !== restaurantId); 
                }
            });

            setSnack("success", "עודכנה אהבתך למסעדה!");
        } catch (error) {
            console.error("❌ Error updating like status:", error);
            setSnack("error", "שגיאה בעת עדכון אהבתך למסעדה.");
        }
    }, [setRestaurants, setFavoriteRestaurants, setSnack, user]);


    const handleFavRestaurants = useCallback(async () => {
        try {
            setIsLoading(true);
            const allRestaurants = await getRestaurants();
             

            if (user && user._id) {
                const favData = allRestaurants
                    .filter((restaurant) => restaurant.likes.includes(user._id))
                    .map((restaurant) => ({
                        ...restaurant,
                        _id: restaurant._id || restaurant.id || null, 
                    }));

                

                setFavoriteRestaurants(favData);
            } else {
                throw new Error("User not authenticated");
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            console.error("Error fetching favorite restaurants:", error);
        } finally {
            setIsLoading(false);
        }
    }, [getRestaurants, user, setFavoriteRestaurants]);




    const fetchFavoriteRestaurants = useCallback(async () => {
        try {
            if (!user || !user._id) {
                setSnack("error", "עליך להתחבר כדי להציג מסעדות אהובות.");
                return;
            }

            const response = await axios.get(`https://kshera-server.onrender.com/users/${user._id}/favorites`);
            const favRestaurants = response.data;

            setFavoriteRestaurants(favRestaurants);
        } catch (error) {
            
            setSnack("error", "שגיאה בעת טעינת המסעדות האהובות.");
        }
    }, [user, setSnack, setFavoriteRestaurants]);


    useEffect(() => {
        const query = searchParams.get("q")?.toLowerCase() || "";

        const filtered = restaurants.filter((restaurant) => {
            const matchesQuery =
                restaurant.name.toLowerCase().includes(query) ||
                restaurant.description.toLowerCase().includes(query);

            return matchesQuery;
        });

        setFilteredRestaurants(filtered);
    }, [searchParams, restaurants]);

    const handleFilterTags = (tags) => {
        setFilteredRestaurants(
            restaurants.filter((restaurant) =>
                tags.length === 0
                    ? true 
                    : restaurant.tags.some((tag) => tags.includes(tag))
            )
        );
    };

    const fetchUserReservations = useCallback(async (userId) => {
        try {
            setSnack("info", `🔵 reservations for user: ${userId}`);

            const response = await axios.get(`https://kshera-server.onrender.com/users/${userId}/reservations`);

            if (!response.data || response.data.length === 0) {
                setSnack("warning", "⚠️ No reservations found.");
            } else {
                setSnack("success", `✅ ${response.data.length} reservations successfully!`);
            }

            return response.data || [];
        } catch (error) {
            setSnack("error", "❌ Error fetching reservations. Please try again.");
            return [];
        }
    }, [setSnack]);



    const reserveRestaurant = useCallback(async (restaurantId) => {
        if (!user?._id) {
            setSnack("error", "אתה חייב להתחבר כדי לבצע הזמנה.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`https://kshera-server.onrender.com/users/${user._id}/reserve`, { restaurantId });

            if (!response.data || !response.data.user) {
                throw new Error("Invalid server response. User data missing.");
            }

            const updatedUser = response.data.user;

            
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setReservations([...reservations, restaurantId]);

            setSnack("success", "המסעדה נוספה בהצלחה להזמנות שלך!");
        } catch (err) {
            let errorMessage = "שגיאה בעת שמירת הזמנה. נסה שוב.";

            if (err.response) {
                errorMessage = `שגיאה: ${err.response.data?.message || "אירעה שגיאה"}`;
            }

            setSnack("error", errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [setSnack, user, reservations, setUser]);



    const handleCancelReservation = useCallback(async (restaurantId) => {
        if (!restaurantId || !user?._id) {
            setSnack("error", "שגיאה: פרטי הזמנה חסרים.");
            return;
        }

        try {
            await cancelReservation(user._id, restaurantId);

            const updatedReservations = await fetchUserReservations(user._id);
            setReservations(updatedReservations);

            setSnack("success", "הזמנה בוטלה בהצלחה!");
        } catch (error) {
            let errorMessage = "שגיאה בעת ביטול ההזמנה. נסה שוב.";

            if (error.response) {
                errorMessage = `שגיאה: ${error.response.data?.message || "אירעה שגיאה"}`;
            }

            setSnack("error", errorMessage);
        }
    }, [user, setSnack, fetchUserReservations]);







    return {
        restaurants,
        restaurant,
        filteredRestaurants,
        favoriteRestaurants,
        isLoading,
        error,
        reservations,
        fetchRestaurants,
        fetchMyRestaurants,
        fetchRestaurantById,
        addRestaurant,
        updateRestaurant,
        deleteRestaurantById,
        handleLike,
        handleFilterTags,
        reserveRestaurant, 
        fetchUserReservations,
        handleFavRestaurants,
        handleCancelReservation,
        fetchFavoriteRestaurants
    };
}
