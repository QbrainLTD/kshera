import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import { useCurrentUser } from "../../users/providers/UserProvider";

export default function LastOrders() {
  const { fetchUserReservations } = useRestaurant();
  const { user } = useCurrentUser();
  const [lastOrders, setLastOrders] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetchUserReservations(user._id).then((data) => {
        setLastOrders(Array.isArray(data) ? data : []);
      });
    }
  }, [user, fetchUserReservations]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        הזמנות אחרונות
      </Typography>
      <Grid container spacing={3}>
        {lastOrders.length > 0 ? (
          lastOrders.map((restaurant) => (
            <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={restaurant.imageUrl}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`}
                  </Typography>
                  <Box mt={2}>
                    <Button variant="contained" size="small" sx={{ marginRight: 1 }}>
                      בצע הזמנה חוזרת
                    </Button>
                    <Button variant="outlined" size="small" color="secondary">
                      הצג פרטים
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
            אין הזמנות שמורות.
          </Typography>
        )}
      </Grid>
    </Box>
  );
}
