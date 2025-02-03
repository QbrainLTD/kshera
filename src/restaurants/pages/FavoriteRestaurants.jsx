import React, { useEffect, useState } from "react";
import { Typography, Box, Card, CardContent, CardMedia, Button } from "@mui/material";
import useRestaurants from "../hooks/useRestaurant";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function FavoriteRestaurants() {
  const { favoriteRestaurants, fetchFavoriteRestaurants, handleLike } = useRestaurants();
  const { user } = useCurrentUser();
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    if (user) {
      fetchFavoriteRestaurants();
    }
  }, [user, fetchFavoriteRestaurants]);

  useEffect(() => {
    setFavorites(favoriteRestaurants);
  }, [favoriteRestaurants]);

  const handleToggleLike = async (restaurant) => {
    if (!restaurant || !restaurant._id) {
      console.error("❌ Error: restaurant or ID is undefined.", restaurant);
      return;
    }
    await handleLike(restaurant._id);
  };



  return (
    <Box sx={{ padding: 2 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }} variant="h3">
        המסעדות האהובות עלי
      </Typography>
      {favorites.length > 0 ? (
        favorites.map((restaurant) => (
          <Card key={restaurant._id || restaurant.id} sx={{ display: "flex", marginBottom: 2 }}>
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
                  color={restaurant.likes.includes(user._id) ? "error" : "primary"}
                  onClick={() => handleToggleLike(restaurant)} 
                >
                  {restaurant.likes.includes(user._id) ? "הסר אהוב" : "הוסף אהוב"}
                </Button>
              </Box>
            </Box>
          </Card>
        ))
      ) : (
        <Typography variant="h5" sx={{ textAlign: "center", width: "100%", mt: 3, color: "#757575" }}>
          אין מסעדות אהובות כרגע.
        </Typography>
      )}

    </Box>
  );
}
