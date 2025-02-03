import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery
} from "@mui/material";
import useRestaurant from "../hooks/useRestaurant";
import { useCurrentUser } from "../../users/providers/UserProvider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";

export default function LastOrders() {
  const { fetchUserReservations, handleCancelReservation, reservations } = useRestaurant();
  const { user } = useCurrentUser();
  const [lastOrders, setLastOrders] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  useEffect(() => {
    if (user?._id) {
      fetchUserReservations(user._id).then((data) => {
        setLastOrders(Array.isArray(data) ? data : []);
      });
    }
  }, [user, fetchUserReservations, reservations]);

  const handleNavigate = (restaurant) => {
    const address = encodeURIComponent(`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`);
    const wazeUrl = `https://waze.com/ul?q=${address}&navigate=yes`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    window.open(isMobileDevice ? wazeUrl : googleMapsUrl, "_blank");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }} variant="h3">
        הזמנות אחרונות
      </Typography>
      {isMobile ? (
        <Grid container spacing={2}>
          {lastOrders.length > 0 ? (
            lastOrders.map((restaurant) => (
              <Grid item xs={12} key={restaurant._id || restaurant.id}>
                <Card sx={{ display: "flex", flexDirection: "column", boxShadow: 3, borderRadius: "10px", padding: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={restaurant.imageUrl}
                    alt={restaurant.name}
                    sx={{ borderRadius: "10px", objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007BFF" }}>
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body2">{`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`}</Typography>
                    <Typography variant="body2" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                      {restaurant.openingHours
                        ? `${restaurant.openingHours.from} - ${restaurant.openingHours.to}`
                        : "שעות פתיחה אינן זמינות"}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: restaurant.status === "סגור" ? "red" : "green" }}>
                      {restaurant.status}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ textTransform: "none", borderRadius: "8px" }}
                        startIcon={<LocationOnIcon />}
                        onClick={() => handleNavigate(restaurant)}
                      >
                        ניווט
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{ textTransform: "none", borderRadius: "8px" }}
                        startIcon={<CancelIcon />}
                        onClick={() => handleCancelReservation(restaurant._id || restaurant.id)}
                      >
                        בטל הזמנה
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h5" sx={{ textAlign: "center", width: "100%", mt: 3, color: "#757575" }}>
              אין הזמנות שמורות.
            </Typography>
          )}
        </Grid>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>תמונה</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>שם המסעדה</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>כתובת</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>שעות פתיחה</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>סטטוס</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>אישור</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastOrders.map((restaurant) => (
                <TableRow
                  key={restaurant._id || restaurant.id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    transition: "background-color 0.2s ease-in-out",
                  }}
                >
                  <TableCell align="center">
                    <CardMedia
                      component="img"
                      height="80"
                      image={restaurant.imageUrl}
                      alt={restaurant.name}
                      sx={{ borderRadius: "8px", width: "90px", objectFit: "cover", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#007BFF" }}>
                      {restaurant.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">{`${restaurant.street}, ${restaurant.city}, ${restaurant.country}`}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                      {restaurant.openingHours
                        ? `${restaurant.openingHours.from} - ${restaurant.openingHours.to}`
                        : "שעות פתיחה אינן זמינות"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: restaurant.status === "סגור" ? "red" : "green" }}>
                      {restaurant.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    {restaurant.isApproved ? <CheckCircleIcon sx={{ color: "green", fontSize: "1.8rem" }} /> : "⏳ ממתינה לאישור"}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="primary" size="small" startIcon={<LocationOnIcon />} onClick={() => handleNavigate(restaurant)}>
                      ניווט
                    </Button>
                    <Button variant="outlined" size="small" color="error" startIcon={<CancelIcon />} onClick={() => handleCancelReservation(restaurant._id || restaurant.id)}>
                      בטל הזמנה
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
