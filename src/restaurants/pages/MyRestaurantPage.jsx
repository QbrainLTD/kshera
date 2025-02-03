import React, { useEffect } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import KosherRestaurantCard from "../pages/KosherRestaurantCard";
import useRestaurant from "../hooks/useRestaurant";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function MyRestaurantPage() {
  const {
    isLoading,
    error,
    restaurants,
    fetchMyRestaurants,
    deleteRestaurantById,
  } = useRestaurant();
  const { user } = useCurrentUser();

  useEffect(() => {
    fetchMyRestaurants();
  }, [fetchMyRestaurants]);

  return (
    <Container sx={{ mt: 2 }}>
      <PageHeader
        title="My Restaurants"
        subtitle="On this page, you can manage and view all the restaurants you created."
      />

      {/* Loading State */}
      {isLoading && (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Typography color="error" align="center" mt={2}>
          {error}
        </Typography>
      )}

      {/* No Restaurants */}
      {!isLoading && !error && restaurants.length === 0 && (
        <Typography align="center" mt={2}>
          You haven't added any restaurants yet.
        </Typography>
      )}

      {/* Render Restaurants */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mt: 3,
        }}
      >
        {restaurants.map((restaurant) => (
          <KosherRestaurantCard
            key={restaurant._id}
            restaurant={restaurant}
            showDelete={restaurant.user_id === user?._id} // ✅ Show delete button only if user is the creator
            onDelete={() => deleteRestaurantById(restaurant._id)} // ✅ Handle delete action
          />
        ))}
      </Box>
    </Container>
  );
}
