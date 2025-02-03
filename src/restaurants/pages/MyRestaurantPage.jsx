import { Container, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../users/providers/UserProvider";
import useRestaurant from "../hooks/useRestaurant";
import KosherRestaurantCard from "../pages/KosherRestaurantCard";
import { useSnack } from "../../providers/SnackbarProvider";

export default function MyRestaurantPage() {
  const {
    isLoading,
    error,
    restaurants,
    fetchMyRestaurants,
    deleteRestaurantById, // ✅ Add delete function from hook
  } = useRestaurant();

  const { user } = useCurrentUser();
  const setSnack = useSnack();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (user?.isBusiness) {
      fetchMyRestaurants();
    } else {
      setAccessDenied(true);
      setSnack("error", "רק משתמשים עסקיים יכולים לבצע פעולות בדף זה");
    }
  }, [fetchMyRestaurants, user, setSnack]);

  // ✅ Handle restaurant deletion and refresh view
  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await deleteRestaurantById(restaurantId);
      await fetchMyRestaurants(); // ✅ Refresh after deletion
      setSnack("success", "המסעדה נמחקה בהצלחה!");
    } catch (error) {
      setSnack("error", "שגיאה בעת מחיקת המסעדה.");
    }
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }} variant="h3">
        המסעדות שלי
      </Typography>

      {isLoading && <Typography>Loading...</Typography>}

      {accessDenied ? (
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="h5" color="error" fontWeight="bold">
            ❌ רק משתמשים עסקיים יכולים לבצע פעולות בדף זה
          </Typography>
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : restaurants.length === 0 ? (
        <Typography>No restaurants found.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center" }}>
          {restaurants.map((restaurant) => (
            <KosherRestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onDelete={() => handleDeleteRestaurant(restaurant._id)} // ✅ Pass delete handler
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
