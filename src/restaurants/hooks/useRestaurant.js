import ROUTES from "../../routes/routesModel";
import normalizeRestaurant from "../helpers/normalization/normalizeRestaurant"; // Replace with your normalization helper
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
    const [restaurants, setRestaurants] = useState([]); // All restaurants
    const [restaurant, setRestaurant] = useState(); // Single restaurant details
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [filteredRestaurants, setFilteredRestaurants] = useState([]); // Filtered restaurants
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]); // Favorite restaurants
    const [searchParams] = useSearchParams(); // For search query
    const [reservations, setReservations] = useState([]);
    const { user, setUser } = useCurrentUser(); // Current user context
    const setSnack = useSnack(); // Snackbar for notifications
    const navigate = useNavigate();
    useAxios();

    // Fetch all restaurants
    const fetchRestaurants = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getRestaurants();
            setRestaurants(data);
            setFilteredRestaurants(data); // Initialize filtered state
            setSnack("success", "Restaurants loaded successfully!");
        } catch (err) {
            setError(err.message || "Failed to fetch restaurants");
            setSnack("error", err.message || "Failed to load restaurants");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    // Fetch my restaurants
    const fetchMyRestaurants = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getMyRestaurants();
            setRestaurants(data);
            setFilteredRestaurants(data); // Update filtered state
            setSnack("success", "Your restaurants loaded successfully!");
        } catch (err) {
            setError(err.message || "Failed to fetch your restaurants");
            setSnack("error", err.message || "Failed to load your restaurants");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack]);

    // Fetch single restaurant by ID
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

    // Add a new restaurant
    const addRestaurant = useCallback(async (newRestaurant) => {
        setIsLoading(true);
        try {
            const normalizedRestaurant = normalizeRestaurant(newRestaurant);
            const data = await createRestaurant(normalizedRestaurant);
            setRestaurants((prev) => [...prev, data]);
            setSnack("success", "New restaurant created successfully!");
            navigate(ROUTES.ROOT); // Redirect after success
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
            const updatedRestaurant = await changeLikeStatus(restaurantId);

            // ✅ Update restaurants list
            setRestaurants((prev) =>
                prev.map((r) => (r._id === restaurantId ? updatedRestaurant : r))
            );

            // ✅ Update favorite restaurants
            setFavoriteRestaurants((prev) => {
                if (updatedRestaurant.isLiked) {
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
    }, [setRestaurants, setFavoriteRestaurants, setSnack]);



    const handleFavRestaurants = useCallback(async () => {
        try {
            setIsLoading(true);
            const allRestaurants = await getRestaurants(); // ✅ Fetch all restaurants
            console.log("All Restaurants:", allRestaurants);

            if (user && user._id) {
                const favData = allRestaurants.filter(restaurant => restaurant.isLiked);
                console.log("Favorite Restaurants:", favData);

                setFavoriteRestaurants(favData); // ✅ Update state
            } else {
                throw new Error('User not authenticated');
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            console.error("Error fetching favorite restaurants:", error);
        } finally {
            setIsLoading(false);
        }
    }, [getRestaurants, user, setFavoriteRestaurants]); // ✅ Removed `restaurants` from dependencies to avoid stale data




    // Filter restaurants based on query
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
                    ? true // Show all restaurants if no tags are selected
                    : restaurant.tags.some((tag) => tags.includes(tag))
            )
        );
    };

    const fetchUserReservations = useCallback(async (userId) => {
        try {
            console.log(`🔵 Fetching reservations for user: ${userId}`);
            const response = await axios.get(`/users/${userId}/reservations`);

            if (!response.data || response.data.length === 0) {
                console.warn("⚠️ No reservations found.");
            } else {
                console.log("✅ Reservations fetched:", response.data);
            }

            return response.data || [];  // Ensure it always returns an array
        } catch (error) {
            console.error("❌ Error fetching reservations:", error);
            return [];
        }
    }, []);


    const reserveRestaurant = useCallback(async (restaurantId) => {
        if (!user?._id) {
            setSnack("error", "אתה חייב להתחבר כדי לבצע הזמנה.");
            return;
        }

        setIsLoading(true);
        console.log(`📌 Sending reservation request for restaurant: ${restaurantId}`);

        try {
            const response = await axios.post(`/users/${user._id}/reserve`, { restaurantId });

            console.log("✅ Reservation Successful:", response.data);

            setUser(response.data);
            setReservations([...reservations, response.data.newReservation]);
            setSnack("success", "המסעדה נוספה בהצלחה להזמנות שלך!");
        } catch (err) {
            console.error("❌ Error reserving restaurant:", err);

            if (err.response) {
                console.error("🔴 Error Response Data:", err.response.data);
                console.error("🔴 Error Response Status:", err.response.status);
                console.error("🔴 Error Response Headers:", err.response.headers);
            } else if (err.request) {
                console.error("🔴 No response received:", err.request);
            } else {
                console.error("🔴 Error setting up request:", err.message);
            }

            setSnack("error", "שגיאה בעת שמירת הזמנה. נסה שוב.");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack, user, reservations, setUser]);


    const handleCancelReservation = useCallback(async (restaurantId) => {
        if (!restaurantId || !user?._id) {
            console.error("❌ Error: Missing restaurant ID or user ID.");
            return;
        }

        console.log(`🛑 Canceling reservation for restaurant ID: ${restaurantId}`);

        try {
            await cancelReservation(user._id, restaurantId);

            // ✅ Re-fetch user reservations after cancellation
            const updatedReservations = await fetchUserReservations(user._id);
            setReservations(updatedReservations);

            setSnack("success", "הזמנה בוטלה בהצלחה!");
        } catch (error) {
            console.error("❌ Error canceling reservation:", error);
            setSnack("error", "שגיאה בעת ביטול הזמנה. נסה שוב.");
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
        handleCancelReservation
    };
}
