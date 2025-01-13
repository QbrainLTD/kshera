import React from 'react';
import KosherRestaurantCard from "./KosherRestaurantCard";
import { Box } from "@mui/material";
import useRestaurant from '../hooks/useRestaurant';
import CheckBoxRest from "../../layout/header/CheckBoxRest";
import LocationSearch from "../../layout/header/LocationSearch"

export default function RestaurantsPage() {
  const { filteredRestaurant, handleFilterTags } = useRestaurant();

  return (
    <>
      <CheckBoxRest onFilterChange={handleFilterTags} />
      <Box
        sx={{
          display: "flex", // Flexbox container
          flexDirection: "column", // Stack Restaurants vertically
          gap: 2, // Adds space between Restaurants (3 = 24px)
          alignItems: "center", // Center Restaurants horizontally
          padding: 2, // Padding around the container
        }}
      >
        {filteredRestaurant.map((restaurant, index) => (
          <KosherRestaurantCard key={index} restaurant={restaurant} />
        ))}
      </Box>
    </>
  );
}
