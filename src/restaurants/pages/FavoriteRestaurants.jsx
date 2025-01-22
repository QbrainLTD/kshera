import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import useRestaurants  from "../hooks/useRestaurant";

export default function FavoriteRestaurants() {
  const { restaurants, toggleLike } = useRestaurants(); // Access restaurants and toggleLike function
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Filter only liked restaurants and update the favorites state
    const likedRestaurants = restaurants.filter((restaurant) => restaurant.isLiked);
    setFavorites(likedRestaurants);
  }, [restaurants]);

  const handleToggleLike = async (id) => {
    // Call the toggleLike function, which will update the restaurants and favorites
    await toggleLike(id);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Restaurants
      </Typography>
      {favorites.length > 0 ? (
        favorites.map((restaurant) => (
          <Card key={restaurant._id} sx={{ display: "flex", marginBottom: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={restaurant.imageUrl}
              alt={restaurant.name}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {restaurant.address}
                </Typography>
              </CardContent>
              <Box sx={{ marginLeft: 2, marginBottom: 1 }}>
                <Button
                  variant="contained"
                  color={restaurant.isLiked ? "error" : "primary"}
                  onClick={() => handleToggleLike(restaurant._id)}
                >
                  {restaurant.isLiked ? "Unlike" : "Like"}
                </Button>
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          No favorite restaurants added yet.
        </Typography>
      )}
    </Box>
  );
}
