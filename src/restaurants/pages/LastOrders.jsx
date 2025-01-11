import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from "@mui/material";

const lastOrders = [
  {
    id: 1,
    name: "La Marina",
    address: "1st Avenue, New York",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/nJ7id8rj0Z6PbiWNWuLBPw/348s.jpg", // Replace with actual image URLs
    orderDate: "2024-12-31",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Meat & Wine",
    address: "12 Street, London",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/nJ7id8rj0Z6PbiWNWuLBPw/348s.jpg",
    orderDate: "2024-12-29",
    rating: 4.8,
  },
  {
    id: 3,
    name: "The Vegan Bistro",
    address: "Main St, San Francisco",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/nJ7id8rj0Z6PbiWNWuLBPw/348s.jpg",
    orderDate: "2024-12-28",
    rating: 4.2,
  },
];

export default function LastOrders() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Last Orders
      </Typography>
      <Grid container spacing={3}>
        {lastOrders.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <Card>
              <CardMedia
                component="img"
                height="150"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent>
                <Typography variant="h6">{restaurant.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ordered on: {restaurant.orderDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {restaurant.rating} ⭐
                </Typography>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Reorder
                  </Button>
                  <Button variant="outlined" size="small" color="secondary">
                    View Details
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
