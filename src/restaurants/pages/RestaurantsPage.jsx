import React from 'react'
import KosherRestaurantCard from "./KosherRestaurantCard";
import { Box } from "@mui/material";
import restaurants from "./RestaurantCard";
import useRestaurant from '../hooks/useRestaurant';


export default function RestaurantsPage() {
  const { filteredRestaurant } = useRestaurant([]);
  return (
    <>
      
      {/* Container for the Restaurants */}
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
  )
}
