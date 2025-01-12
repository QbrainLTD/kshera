import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import restaurants from "../pages/RestaurantCard"; // Adjust the import as per your file structure

export default function useRestaurant() {
    const [liked, setLiked] = useState(false);
    const [searchParams] = useSearchParams(); // Get query parameters from the URL
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const handleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        const query = searchParams.get("q")?.toLowerCase() || ""; // Get the "q" parameter from the URL

        // Filter restaurants based on the query
        const filtered = restaurants.filter((restaurant) =>
            restaurant.name?.toLowerCase().includes(query) || // Check name
            restaurant.description?.toLowerCase().includes(query) // Check description
        );

        setFilteredRestaurant(filtered);
    }, [searchParams]);

    return {
        handleLike,
        liked,
        filteredRestaurant,
    };
}
