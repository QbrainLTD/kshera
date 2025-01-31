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
} from "../services/RestaurantsApiService";
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

    // Like/unlike a restaurant
    const toggleLike = useCallback(
        async (id) => {
            setIsLoading(true);
            try {
                const data = await changeLikeStatus(id);

                // Update the restaurants state
                setRestaurants((prev) =>
                    prev.map((restaurant) =>
                        restaurant._id === id ? { ...restaurant, ...data } : restaurant
                    )
                );

                // Update the favoriteRestaurants state
                setFavoriteRestaurants((prev) =>
                    data.isLiked
                        ? [...prev, { ...data }] // Add to favorites
                        : prev.filter((fav) => fav._id !== id) // Remove from favorites
                );

                setSnack("success", `Restaurant ${data.isLiked ? "liked" : "unliked"}!`);
            } catch (err) {
                setError(err.message || "Failed to update like status");
                setSnack("error", err.message || "Failed to update like status");
            } finally {
                setIsLoading(false);
            }
        },
        [setSnack]
    );
    

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
            const response = await axios.get(`/restaurant/${userId}/reservations`);
            return response.data || []; // Ensure it returns an array
        } catch (error) {
            console.error("Error fetching reservations:", error);
            return []; // Return an empty array on error
        }
    }, []);




    const reserveRestaurant = useCallback(async (restaurantId) => {
        if (!user?._id) {
            setSnack("error", "You must be logged in to reserve a table.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`/api/restaurants/${restaurantId}/reserve`);

            // ✅ Update UI
            setReservations([...reservations, response.data.restaurant]);
            setSnack("success", "המסעדה נוספה בהצלחה להזמנות שלך!");
        } catch (err) {
            setError(err.message || "Failed to reserve restaurant");
            setSnack("error", err.message || "Failed to reserve restaurant");
        } finally {
            setIsLoading(false);
        }
    }, [setSnack, user, reservations]);





    return {
        restaurants,
        restaurant,
        filteredRestaurants,
        favoriteRestaurants,
        isLoading,
        error,
        fetchRestaurants,
        fetchMyRestaurants,
        fetchRestaurantById,
        addRestaurant,
        updateRestaurant,
        deleteRestaurantById,
        toggleLike,
        handleFilterTags,
        reserveRestaurant, 
        fetchUserReservations, 
    };
}
