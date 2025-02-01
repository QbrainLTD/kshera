import React, { useState, useEffect } from "react";
import { Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import useRestaurants from "../hooks/useRestaurant";

export default function FavoriteRestaurants() {
  const { favoriteRestaurants, handleLike } = useRestaurants(); // ✅ Access liked restaurants and handleLike function
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoriteRestaurants);
  }, [favoriteRestaurants]);

  const handleToggleLike = async (id) => {
    await handleLike(id);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        המסעדות האהובות עלי
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
                  {restaurant.city}, {restaurant.country}
                </Typography>
              </CardContent>
              <Box sx={{ marginLeft: 2, marginBottom: 1 }}>
                <Button
                  variant="contained"
                  color={restaurant.isLiked ? "error" : "primary"}
                  onClick={() => handleToggleLike(restaurant._id)}
                >
                  {restaurant.isLiked ? "הסר אהוב" : "הוסף אהוב"}
                </Button>
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary">
          אין מסעדות אהובות כרגע.
        </Typography>
      )}
    </Box>
  );
}
