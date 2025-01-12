import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import restaurants from "../pages/RestaurantCard";

export default function useRestaurant() {
    const [liked, setLiked] = useState(false);
    const [searchParams] = useSearchParams(); // Query parameters for search input
    const [filteredRestaurant, setFilteredRestaurant] = useState(restaurants);
    const [filterTags, setFilterTags] = useState([]); // State for selected tags

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleFilterTags = (tags) => {
        setFilterTags(tags); // Update selected tags
    };

    useEffect(() => {
        const query = searchParams.get("q")?.toLowerCase() || ""; // Get search query

        // Filter based on query and tags
        const filtered = restaurants.filter((restaurant) => {
            const matchesQuery =
                restaurant.name.toLowerCase().includes(query) ||
                restaurant.description.toLowerCase().includes(query);

            const matchesTags =
                filterTags.length === 0 || // No tags selected
                restaurant.tags.some((tag) => filterTags.includes(tag));

            return matchesQuery && matchesTags; // Must match both query and tags
        });

        setFilteredRestaurant(filtered);
    }, [searchParams, filterTags]); // Re-run filtering when searchParams or tags change

    return {
        handleLike,
        liked,
        filteredRestaurant,
        handleFilterTags, // Expose tag filter handler
    };
}
