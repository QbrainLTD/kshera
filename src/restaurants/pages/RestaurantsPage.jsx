import React, { useEffect } from "react";
import KosherRestaurantCard from "./KosherRestaurantCard";
import { Box } from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import CheckBoxRest from "../../layout/header/CheckBoxRest";

export default function RestaurantsPage() {
  const {
    filteredRestaurants,
    isLoading,
    error,
    fetchRestaurants,
    handleFilterTags,
  } = useRestaurant();

  useEffect(() => {
    fetchRestaurants(); // Fetch all restaurants on component mount
  }, [fetchRestaurants]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <CheckBoxRest onFilterChange={handleFilterTags} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          padding: 2,
        }}
      >
        {filteredRestaurants.map((restaurant, index) => (
          <KosherRestaurantCard key={index} restaurant={restaurant} />
        ))}
      </Box>
    </>
  );
}
